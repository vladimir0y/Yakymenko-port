'use client';
import React from 'react';
import { tw } from './tw';

export default function Footer() {
  return (
    <footer className={tw('bg-[--token-bg] border-t border-[--token-border]')}>
      <div
        className={tw(
          'mx-auto max-w-7xl px-6 py-10 lg:px-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-between'
        )}
      >
        <p className={tw('text-[--token-font-sm] text-[--token-fg-muted]')}>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <nav className={tw('flex items-center gap-5')}>
          <a
            href="#"
            className={tw(
              'text-[--token-font-sm] text-[--token-fg-muted] hover:text-[--token-fg]'
            )}
          >
            Privacy
          </a>
          <a
            href="#"
            className={tw(
              'text-[--token-font-sm] text-[--token-fg-muted] hover:text-[--token-fg]'
            )}
          >
            Terms
          </a>
          <a
            href="#"
            className={tw(
              'text-[--token-font-sm] text-[--token-fg-muted] hover:text-[--token-fg]'
            )}
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
