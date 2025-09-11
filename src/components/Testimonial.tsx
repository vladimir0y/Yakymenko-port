'use client';

import type React from 'react';
import { testimonial } from '@/data/content';

export default function Testimonial() {
  return (
    <section
      id="testimonial"
      aria-labelledby="testimonial-heading"
      className="relative py-20 md:py-28 bg-muted/30"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2
            id="testimonial-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6"
          >
            <span className="bg-gradient-to-br from-foreground via-primary-700 to-accent-700 bg-clip-text text-transparent">
              What clients say
            </span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="max-w-4xl mx-auto">
          <figure className="relative">
            {/* Quote card */}
            <div className="relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Decorative quote icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-primary-600 via-accent-600 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              {/* Quote text */}
              <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed italic mb-8 pt-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author info */}
              <figcaption className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Author avatar placeholder - you can add actual image later */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-600 via-accent-600 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {testimonial.author.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Author details */}
                <div className="text-center sm:text-left">
                  <div className="font-semibold text-foreground text-lg">
                    {testimonial.author.name}
                  </div>
                  <div className="text-muted-foreground mb-3">
                    {testimonial.author.role} at {testimonial.author.company}
                  </div>
                  
                  {/* LinkedIn link */}
                  <a
                    href={testimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm font-medium"
                    aria-label="View full testimonial on LinkedIn"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    See the full testimonial on LinkedIn
                  </a>
                </div>
              </figcaption>
            </div>

            {/* Decorative background elements */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/5 via-accent-500/5 to-primary-500/5 rounded-3xl blur-xl" />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
