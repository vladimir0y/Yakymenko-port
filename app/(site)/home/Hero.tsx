'use client';
import React from 'react';
import { tw } from './tw';

export default function Hero() {
  return (
    <section className={tw('relative isolate overflow-hidden bg-[--token-bg]')}>
      <div className={tw('mx-auto max-w-7xl px-6 py-24 lg:px-8')}>
        <div className={tw('mx-auto max-w-2xl text-center')}>
          <h1
            className={tw(
              'text-balance text-[--token-font-3xl] font-semibold tracking-tight text-[--token-fg]'
            )}
          >
            Build better, faster
          </h1>
          <p
            className={tw(
              'mt-6 text-[--token-font-md] leading-7 text-[--token-fg-muted]'
            )}
          >
            A clean, modern starter for your new homepage. Built with isolated
            components and design tokens.
          </p>
          <div className={tw('mt-10 flex items-center justify-center gap-x-6')}>
            <a
              href="#features"
              className={tw(
                'rounded-md bg-[--token-primary] px-4 py-2 text-[--token-on-primary] shadow-sm hover:bg-[--token-primary-hover] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--token-primary]'
              )}
            >
              Explore features
            </a>
            <a
              href="#cta"
              className={tw(
                'text-[--token-primary] hover:text-[--token-primary-hover]'
              )}
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
