'use client';
import React from 'react';
import { tw } from './tw';

export default function Features() {
  const features = [
    {
      title: 'Isolated Components',
      desc: 'No legacy imports. Clean, maintainable units of UI.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={tw('h-6 w-6 text-[--token-primary]')}
        >
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M3 6h18M3 12h18M3 18h18"
          />
        </svg>
      ),
    },
    {
      title: 'Design Tokens',
      desc: 'Powered by CSS variables for consistent theming.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={tw('h-6 w-6 text-[--token-primary]')}
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      title: 'Tailwind Utilities',
      desc: 'Fast, expressive styling with utility classes.',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={tw('h-6 w-6 text-[--token-primary]')}
        >
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M4 7h16M4 12h10M4 17h7"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className={tw('bg-[--token-bg] py-20')}>
      <div className={tw('mx-auto max-w-7xl px-6 lg:px-8')}>
        <div className={tw('mx-auto max-w-2xl text-center')}>
          <h2
            className={tw(
              'text-[--token-font-2xl] font-semibold text-[--token-fg]'
            )}
          >
            Features
          </h2>
          <p
            className={tw(
              'mt-2 text-[--token-font-md] text-[--token-fg-muted]'
            )}
          >
            Everything you need to build a modern homepage.
          </p>
        </div>
        <div
          className={tw(
            'mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 sm:mt-16 sm:gap-10 lg:mx-0 lg:max-w-none lg:grid-cols-3'
          )}
        >
          {features.map((f) => (
            <div
              key={f.title}
              className={tw(
                'rounded-xl border border-[--token-border] bg-[--token-bg-elev] p-6 shadow-sm'
              )}
            >
              <div className={tw('flex items-center gap-3')}>
                {f.icon}
                <h3
                  className={tw(
                    'text-[--token-font-lg] font-medium text-[--token-fg]'
                  )}
                >
                  {f.title}
                </h3>
              </div>
              <p
                className={tw(
                  'mt-3 text-[--token-font-sm] text-[--token-fg-muted]'
                )}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
