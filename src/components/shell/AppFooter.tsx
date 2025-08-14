'use client';

import * as React from 'react';
import { ThemeToggle } from '@/components/theme';

function IconGithub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.522 2 12.055c0 4.45 2.865 8.223 6.839 9.56.5.093.683-.218.683-.486 0-.24-.01-1.04-.015-1.886-2.782.608-3.37-1.19-3.37-1.19-.455-1.166-1.11-1.477-1.11-1.477-.908-.622.07-.61.07-.61 1.004.07 1.532 1.04 1.532 1.04.893 1.555 2.343 1.106 2.914.846.092-.655.35-1.106.636-1.36-2.22-.255-4.555-1.113-4.555-4.953 0-1.093.39-1.987 1.03-2.687-.105-.255-.45-1.285.098-2.68 0 0 .84-.27 2.75 1.026A9.52 9.52 0 0112 6.84c.85.004 1.705.116 2.504.34 1.91-1.296 2.748-1.026 2.748-1.026.55 1.395.205 2.425.1 2.68.64.7 1.03 1.594 1.03 2.688 0 3.85-2.34 4.695-4.566 4.945.36.312.68.927.68 1.87 0 1.35-.012 2.435-.012 2.765 0 .27.18.584.69.484A10 10 0 0022 12.055C22 6.522 17.523 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5A2.5 2.5 0 014.983 3.5zM.272 8.727H4.73V24H.272V8.727zM8.364 8.727H12.6v2.088h.06c.59-1.118 2.036-2.299 4.192-2.299 4.48 0 5.307 2.948 5.307 6.78V24h-4.457v-6.77c0-1.615-.028-3.69-2.25-3.69-2.251 0-2.595 1.76-2.595 3.573V24H8.364V8.727z" />
    </svg>
  );
}

export function AppFooter() {
  const year = new Date().getFullYear();
  return (
<footer className="mt-12 border-t border-white/10 bg-white/40 dark:bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:dark:bg-black/40">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 text-xs text-slate-600 dark:text-slate-300">
          <p className="leading-none">
            © {year} Your Name. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 dark:hover:text-white"
              aria-label="GitHub"
            >
              <IconGithub className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-900 dark:hover:text-white"
              aria-label="LinkedIn"
            >
              <IconLinkedIn className="h-5 w-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
