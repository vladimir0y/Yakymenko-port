'use client';
import React from 'react';
import { tw } from './tw';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Alex',
      role: 'Founder',
      quote:
        'These isolated components made it effortless to launch our new homepage.',
    },
    {
      name: 'Jordan',
      role: 'Engineer',
      quote:
        'The token-driven styling keeps everything consistent across the site.',
    },
    {
      name: 'Sam',
      role: 'Designer',
      quote: 'Tailwind utilities with tokens is the best of both worlds.',
    },
  ];

  return (
    <section className={tw('bg-[--token-bg] py-20')}>
      <div className={tw('mx-auto max-w-7xl px-6 lg:px-8')}>
        <div className={tw('mx-auto max-w-2xl text-center')}>
          <h2
            className={tw(
              'text-[--token-font-2xl] font-semibold text-[--token-fg]'
            )}
          >
            What people say
          </h2>
          <p
            className={tw(
              'mt-2 text-[--token-font-md] text-[--token-fg-muted]'
            )}
          >
            Real feedback from teams shipping faster.
          </p>
        </div>
        <div
          className={tw(
            'mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'
          )}
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className={tw(
                'rounded-xl border border-[--token-border] bg-[--token-bg-elev] p-6 shadow-sm'
              )}
            >
              <blockquote
                className={tw('text-[--token-font-md] text-[--token-fg]')}
              >
                “{t.quote}”
              </blockquote>
              <figcaption
                className={tw(
                  'mt-4 text-[--token-font-sm] text-[--token-fg-muted]'
                )}
              >
                — {t.name}, {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
