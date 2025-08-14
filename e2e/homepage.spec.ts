import { test, expect } from '@playwright/test';

// This e2e test ensures the homepage renders across multiple viewports and key content is visible
// Assumes the Next.js dev server is running on baseURL (see playwright.config.ts)

test.describe('Homepage rendering across viewports', () => {
  test('loads homepage and renders hero + projects landmark', async ({
    page,
    browserName,
  }) => {
    await page.goto('/');

    // Wait for main content
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Hero presence: look for the banner landmark and at least one heading
    const banner = page.locator('role=banner');
    await expect(banner).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Projects section presence via anchor and sr-only heading text
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();

    // Ensure no client-side errors in console
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    // Quick interaction: ensure theme toggle is present and clickable
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();
    await themeToggle.click();

    expect(errors, `Console errors encountered on ${browserName}`).toEqual([]);
  });
});
