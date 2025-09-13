'use client';

import type React from 'react';
import { testimonial } from '@/data/content';

export default function Testimonial() {
  return (
    <section
      id="testimonial"
      aria-labelledby="testimonial-heading"
      className="py-20 md:py-28 bg-white dark:bg-gray-950"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            id="testimonial-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
          >
            <span className="animated-gradient-anime-text">
              What clients say
            </span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="max-w-4xl mx-auto">
          <figure className="relative">
            {/* Quote card */}
            <div className="group relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl hover:border-accent-500/30 transition-all duration-300 hover:-translate-y-1">
              {/* Subtle gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/10 via-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              {/* Decorative quote icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 animated-gradient-anime rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              {/* Quote text */}
              <blockquote className="text-lg md:text-xl text-muted-foreground leading-relaxed italic mb-8 pt-6 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author info */}
              <figcaption className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                {/* Author avatar placeholder - you can add actual image later */}
                <div className="flex-shrink-0 w-16 h-16 animated-gradient-anime rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {testimonial.author.name.split(' ').map(n => n[0]).join('')}
                </div>

                {/* Author details */}
                <div className="text-center sm:text-left">
                  <div className="font-bold text-foreground text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {testimonial.author.name}
                  </div>
                  <div className="text-muted-foreground font-medium mb-3">
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
<svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                      <path d="M20 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zM8.339 18.339H5.661V9.661h2.678v8.678zm-1.339-9.905a1.552 1.552 0 110-3.104 1.552 1.552 0 010 3.104zM18.339 18.339h-2.678v-4.205c0-1.004-.018-2.293-1.398-2.293-1.399 0-1.613 1.094-1.613 2.223v4.275h-2.678V9.661h2.571v1.185h.035c.358-.68 1.228-1.398 2.527-1.398 2.704 0 3.206 1.779 3.206 4.092v4.8z" />
                    </svg>
                    See the testimonial on LinkedIn
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
