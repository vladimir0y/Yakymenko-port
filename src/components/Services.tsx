'use client';

import type React from 'react';
import { services } from '@/data/content';

// Icon components for services
const ServiceIcons = {
  blueprint: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h1v1H9zM14 9h1v1h-1zM9 14h1v1H9zM14 14h1v1h-1z" />
    </svg>
  ),
  development: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M16 18L22 12L16 6M8 6L2 12L8 18" />
    </svg>
  ),
  gamification: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M6 12h12M12 6v12" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  ai: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  integration: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  design: (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" />
    </svg>
  ),
};

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-20 md:py-28 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden"
    >
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-500/10 via-primary-500/5 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
          >
            <span className="bg-gradient-to-br from-foreground via-primary-700 to-accent-700 bg-clip-text text-transparent">
              What I provide to clients
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            I help organizations turn business goals into learning solutions that actually work
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:border-accent-500/30 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Subtle gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/10 via-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent-500/20 via-primary-500/20 to-accent-600/20 text-accent-600 dark:text-accent-400 group-hover:scale-110 transition-transform duration-300">
                  {ServiceIcons[service.icon as keyof typeof ServiceIcons]}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <a
            href="mailto:vladimiryakimenko99@gmail.com"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 px-8 py-4 text-white font-semibold hover:from-primary-700 hover:via-accent-700 hover:to-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Contact me via email to discuss possibilities"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M21.5 9V17C21.5 18.1046 20.6046 19 19.5 19H4.5C3.39543 19 2.5 18.1046 2.5 17V9" />
              <path d="M22 7H2L12 13L22 7Z" />
            </svg>
            Contact me to discuss possibilities
          </a>
        </div>
      </div>
    </section>
  );
}
