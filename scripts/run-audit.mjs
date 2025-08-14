#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync, spawn } from 'child_process';
import net from 'net';
import puppeteer from 'puppeteer';
import AxeBuilder from '@axe-core/puppeteer';

const SITE = process.env.AUDIT_URL || 'http://localhost:3000/';
const PAGES = (process.env.AUDIT_PAGES || '/')
  .split(',')
  .map((p) => p.trim())
  .filter(Boolean);
// Requested breakpoints for this QA step
const VIEWPORTS = (process.env.AUDIT_VIEWPORTS || '360,768,1024,1440,1920')
  .split(',')
  .map((v) => parseInt(v.trim(), 10))
  .filter(Boolean);

const rootDir = path.resolve(process.cwd());
const docsDir = path.join(rootDir, 'docs');
const assetsDir = path.join(docsDir, 'audit-assets');
const reportPath = path.join(docsDir, 'audit-2025-08-14.md');

function ensureDirs() {
  fs.mkdirSync(docsDir, { recursive: true });
  fs.mkdirSync(assetsDir, { recursive: true });
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function run(cmd, options = {}) {
  return execSync(cmd, { stdio: 'pipe', encoding: 'utf-8', ...options });
}

async function waitForPort(port, host = '127.0.0.1', timeoutMs = 120000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tryConnect = () => {
      const socket = net.createConnection({ port, host });
      socket.setTimeout(2000);
      socket
        .once('connect', () => {
          socket.destroy();
          resolve(true);
        })
        .once('timeout', () => {
          socket.destroy();
          retry();
        })
        .once('error', () => {
          socket.destroy();
          retry();
        });
    };
    const retry = () => {
      if (Date.now() - start > timeoutMs)
        return reject(new Error('Timeout waiting for port'));
      setTimeout(tryConnect, 500);
    };
    tryConnect();
  });
}

function startServerIfNeeded() {
  const useProvided = !!process.env.AUDIT_URL;
  if (useProvided) return { proc: null, url: process.env.AUDIT_URL };

  // If a static export exists, serve it; otherwise run dev
  const hasOut = fs.existsSync(path.join(rootDir, 'out'));
  const cmd = hasOut ? 'npx --yes serve@latest -l 3000 out' : 'npm run dev';
  const proc = spawn(cmd, {
    shell: true,
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env, PORT: '3000' },
  });
  return { proc, url: SITE };
}

async function runScreenshotsA11yAndKeyboard(pageUrl, label) {
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();

    // Navigate once at a large viewport to warm up
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(pageUrl, { waitUntil: 'networkidle0', timeout: 120000 });

    // Axe scan (after page has settled)
    const axeResults = await new AxeBuilder(page).analyze();
    const axeOut = path.join(assetsDir, `axe-${label}.json`);
    writeJSON(axeOut, axeResults);

    // Light, heuristic checks for common a11y errors
    const simpleA11y = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const missingAlt = imgs
        .filter(
          (img) => !img.hasAttribute('alt') || img.getAttribute('alt') === ''
        )
        .map((img) => img.src || img.outerHTML);
      const buttons = Array.from(
        document.querySelectorAll('button, [role="button"], a[role="button"]')
      );
      const unlabeledButtons = buttons
        .filter((b) => {
          const label =
            b.getAttribute('aria-label') ||
            b.textContent?.trim() ||
            b.getAttribute('aria-labelledby');
          return !label;
        })
        .map((b) => b.outerHTML);
      const inputs = Array.from(
        document.querySelectorAll('input, textarea, select')
      );
      const unlabeledInputs = inputs
        .filter((el) => {
          const id = el.getAttribute('id');
          const hasLabel = !!(
            id && document.querySelector(`label[for="${id}"]`)
          );
          const aria =
            el.getAttribute('aria-label') || el.getAttribute('aria-labelledby');
          return !(hasLabel || aria);
        })
        .map((el) => el.outerHTML);
      return { missingAlt, unlabeledButtons, unlabeledInputs };
    });
    writeJSON(path.join(assetsDir, `simple-a11y-${label}.json`), simpleA11y);

    // Screenshots at specified viewports
    for (const width of VIEWPORTS) {
      await page.setViewport({ width, height: 1000 });
      await new Promise((r) => setTimeout(r, 250));
      const shotPath = path.join(assetsDir, `screenshot-${label}-${width}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });
    }

    // Keyboard navigation walkthrough (Tab order capture)
    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    const focusSteps = [];
    for (let i = 0; i < 40; i++) {
      await page.keyboard.press('Tab');
      await new Promise((r) => setTimeout(r, 60));
      const info = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        const role = el.getAttribute('role');
        const name = (
          el.getAttribute('aria-label') ||
          el.textContent ||
          ''
        ).trim();
        const id = el.id || null;
        const tag = el.tagName.toLowerCase();
        const aria = Array.from(el.attributes)
          .filter((a) => a.name.startsWith('aria-'))
          .reduce((acc, a) => ({ ...acc, [a.name]: a.value }), {});
        return {
          tag,
          id,
          role,
          name,
          aria,
          rect: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
          },
        };
      });
      if (info) focusSteps.push(info);
    }
    writeJSON(
      path.join(assetsDir, `keyboard-walkthrough-${label}.json`),
      focusSteps
    );

    return { axeResultsPath: axeOut };
  } finally {
    await browser.close();
  }
}

function runLighthouse(pageUrl, label) {
  // Use Puppeteer's Chromium if Chrome isn't installed
  const chromePath = puppeteer.executablePath?.() || '';

  const baseOut = path.join(assetsDir, `lighthouse-${label}`);

  const chromeFlag = chromePath ? `--chrome-path=\"${chromePath}\"` : '';
  const commonFlags = `--output json --output html --output-path ${baseOut}-mobile ${chromeFlag} --quiet --no-enable-error-reporting --throttling-method=provided --screenEmulation.mobile=true`;
  const desktopFlags = `--output json --output html --output-path ${baseOut}-desktop ${chromeFlag} --quiet --no-enable-error-reporting --preset=desktop`;

  // Mobile (default) run
  try {
    run(`npx --yes lighthouse ${pageUrl} ${commonFlags}`);
  } catch (e) {
    console.warn('Lighthouse mobile run failed:', e.message);
  }
  // Desktop run
  try {
    run(`npx --yes lighthouse ${pageUrl} ${desktopFlags}`);
  } catch (e) {
    console.warn('Lighthouse desktop run failed:', e.message);
  }

  let mobileJson = {};
  let desktopJson = {};
  try {
    mobileJson = JSON.parse(
      fs.readFileSync(`${baseOut}-mobile.report.json`, 'utf-8')
    );
  } catch {}
  try {
    desktopJson = JSON.parse(
      fs.readFileSync(`${baseOut}-desktop.report.json`, 'utf-8')
    );
  } catch {}

  function pickScores(lhJson) {
    const cats = lhJson.categories || {};
    return {
      performance: cats.performance?.score ?? null,
      accessibility: cats.accessibility?.score ?? null,
      bestPractices:
        cats['best-practices']?.score ?? cats.bestPractices?.score ?? null,
      seo: cats.seo?.score ?? null,
    };
  }

  return {
    mobile: pickScores(mobileJson),
    desktop: pickScores(desktopJson),
    baseOut,
  };
}

function formatScore(score) {
  if (score == null) return 'N/A';
  return `${Math.round(score * 100)}`;
}

function renderReport({ entries }) {
  const lines = [];
  lines.push('# Audit Report - 2025-08-14');
  lines.push('');
  lines.push('Scope: Local dev audit of the application.');
  lines.push(`Target URL base: ${SITE}`);
  lines.push('');
  for (const e of entries) {
    lines.push(`## ${e.label}`);
    lines.push('');
    lines.push('### Lighthouse Scores');
    lines.push('');
    lines.push(
      `- Mobile: Performance ${formatScore(e.lighthouse.mobile.performance)}, Accessibility ${formatScore(e.lighthouse.mobile.accessibility)}, Best Practices ${formatScore(e.lighthouse.mobile.bestPractices)}, SEO ${formatScore(e.lighthouse.mobile.seo)}`
    );
    lines.push(
      `- Desktop: Performance ${formatScore(e.lighthouse.desktop.performance)}, Accessibility ${formatScore(e.lighthouse.desktop.accessibility)}, Best Practices ${formatScore(e.lighthouse.desktop.bestPractices)}, SEO ${formatScore(e.lighthouse.desktop.seo)}`
    );
    lines.push('');
    lines.push('Artifacts:');
    lines.push(
      `- Lighthouse (mobile): docs/audit-assets/lighthouse-${e.label}-mobile.report.html`
    );
    lines.push(
      `- Lighthouse (desktop): docs/audit-assets/lighthouse-${e.label}-desktop.report.html`
    );
    lines.push(`- axe-core results: docs/audit-assets/axe-${e.label}.json`);
    lines.push(
      `- keyboard walkthrough: docs/audit-assets/keyboard-walkthrough-${e.label}.json`
    );
    lines.push(
      `- simple a11y checks: docs/audit-assets/simple-a11y-${e.label}.json`
    );
    lines.push('');
    lines.push('### Screenshots');
    lines.push('');
    for (const width of VIEWPORTS) {
      lines.push(
        `- ${width}px: docs/audit-assets/screenshot-${e.label}-${width}.png`
      );
    }
    lines.push('');
  }
  lines.push('---');
  lines.push(
    'Notes: Scores are from automated tools and may vary between runs.'
  );
  lines.push(
    'Keyboard walkthrough simulates 40 Tab presses to capture focus order.'
  );

  fs.writeFileSync(reportPath, lines.join('\n'), 'utf-8');
}

(async () => {
  ensureDirs();

  // Start local server if AUDIT_URL not provided
  const { proc } = startServerIfNeeded();
  try {
    // Wait for localhost:3000 if we started a server
    if (proc) {
      await waitForPort(3000);
    }

    const pages = PAGES.length ? PAGES : ['/'];
    const results = [];

    for (const route of pages) {
      const url = new URL(route, SITE).toString();
      const label = route.replace(/\//g, '').replace(/^$/, 'home');

      // Screenshots + a11y + keyboard navigation
      const { axeResultsPath } = await runScreenshotsA11yAndKeyboard(
        url,
        label
      );

      // Lighthouse (mobile + desktop)
      const lighthouse = runLighthouse(url, label);

      results.push({ label, url, axeResultsPath, lighthouse });
    }

    renderReport({ entries: results });
    console.log(
      `Audit complete. Report: ${path.relative(rootDir, reportPath)}`
    );
  } finally {
    if (proc) {
      proc.kill('SIGINT');
    }
  }
})();
