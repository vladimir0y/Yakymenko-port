'use client';

import type React from 'react';
import { EnvelopeIcon, BookOpenIcon, PuzzlePieceIcon, CpuChipIcon, ServerStackIcon, PaintBrushIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { services, contactInfo } from '@/data/content';
import LinkedInSquareIcon from './icons/LinkedInSquareIcon';

// Icon components for services
const ServiceIcons = {
  blueprint: (
    <ClipboardDocumentListIcon className="h-8 w-8" aria-hidden="true" />
  ),
  development: (
    <BookOpenIcon className="h-8 w-8" aria-hidden="true" />
  ),
  gamification: (
    <PuzzlePieceIcon className="h-8 w-8" aria-hidden="true" />
  ),
  ai: (
    <CpuChipIcon className="h-8 w-8" aria-hidden="true" />
  ),
  integration: (
    <ServerStackIcon className="h-8 w-8" aria-hidden="true" />
  ),
  design: (
    <PaintBrushIcon className="h-8 w-8" aria-hidden="true" />
  ),
};

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 md:py-28 bg-white dark:bg-gray-950"
    >

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
          >
            <span className="animated-gradient-anime-text">
              Let&apos;s work together
            </span>
          </h2>
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


        {/* Contact Section - Card Style */}
        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="group relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:border-accent-500/30 hover:-translate-y-1">
              {/* Subtle gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/10 via-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              <h3 className="text-2xl font-bold text-foreground mb-6 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Start a project</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Have a specific project in mind? Let me know about your learning objectives, timeline, and requirements. I&apos;ll get back to you with a tailored approach.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`mailto:${contactInfo.email}?subject=Project Discussion&body=Hi Volodymyr,%0D%0A%0D%0AI'd like to discuss a potential project with you.%0D%0A%0D%0AProject details:%0D%0A- %0D%0A- %0D%0A- %0D%0A%0D%0ABest regards`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-foreground hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 transition w-full sm:w-44"
                  aria-label="Send project inquiry email"
                >
                  <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
                  Contact me
                </a>
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-foreground hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 transition w-full sm:w-44"
                  aria-label="Connect on LinkedIn"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                    <path d="M20 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zM8.339 18.339H5.661V9.661h2.678v8.678zm-1.339-9.905a1.552 1.552 0 110-3.104 1.552 1.552 0 010 3.104zM18.339 18.339h-2.678v-4.205c0-1.004-.018-2.293-1.398-2.293-1.399 0-1.613 1.094-1.613 2.223v4.275h-2.678V9.661h2.571v1.185h.035c.358-.68 1.228-1.398 2.527-1.398 2.704 0 3.206 1.779 3.206 4.092v4.8z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
