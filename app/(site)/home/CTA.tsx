'use client';
import React from 'react';
import { tw } from './tw';

export default function CTA() {
  return (
    <section id="cta" className={tw('bg-[--token-bg] py-20')}>
      <div className={tw('mx-auto max-w-7xl px-6 lg:px-8')}>
        <div
          className={tw(
            'relative isolate overflow-hidden rounded-2xl bg-[--token-primary] px-6 py-16 shadow-sm sm:px-16'
          )}
        >
          <h3
            className={tw(
              'text-[--token-font-xl] font-semibold text-[--token-on-primary]'
            )}
          >
            Ready to build your new homepage?
          </h3>
          <p
            className={tw(
              'mt-2 max-w-xl text-[--token-font-sm] text-[--token-on-primary-muted]'
            )}
          >
            Start with clean, isolated components powered by design tokens and
            Tailwind utilities.
          </p>
          <div className={tw('mt-8 flex gap-4')}>
            <a
              href="#"
              className={tw(
                'rounded-md bg-[--token-bg] px-4 py-2 text-[--token-fg] shadow hover:bg-[--token-bg-elev]'
              )}
            >
              Get started
            </a>
            <a
              href="#features"
              className={tw(
                'rounded-md bg-transparent px-4 py-2 text-[--token-on-primary] underline underline-offset-4 hover:text-[--token-on-primary]'
              )}
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
