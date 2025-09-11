'use client';

import type React from 'react';
import { contactInfo } from '@/data/content';

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-20 md:py-28 bg-gradient-to-b from-secondary-950/10 via-background to-secondary-950/20"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
          >
            <span className="bg-gradient-to-br from-foreground via-primary-700 to-accent-700 bg-clip-text text-transparent">
            Let&apos;s work together
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your learning initiatives? Let&apos;s discuss how we can create impactful solutions together.
          </p>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Direct contact */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground mb-8">Get in touch</h3>
            
            {/* Email */}
            <div className="group">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-4 p-6 bg-background/60 backdrop-blur-sm border border-border rounded-xl hover:bg-background/80 hover:border-accent-500/30 transition-all duration-300 hover:scale-105"
                aria-label="Send me an email"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-accent-500/20 via-primary-500/20 to-accent-600/20 text-accent-600 dark:text-accent-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M21.5 9V17C21.5 18.1046 20.6046 19 19.5 19H4.5C3.39543 19 2.5 18.1046 2.5 17V9" />
                    <path d="M22 7H2L12 13L22 7Z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Email me directly
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {contactInfo.email}
                  </div>
                </div>
              </a>
            </div>

            {/* LinkedIn */}
            <div className="group">
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-background/60 backdrop-blur-sm border border-border rounded-xl hover:bg-background/80 hover:border-accent-500/30 transition-all duration-300 hover:scale-105"
                aria-label="Connect with me on LinkedIn"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-500/20 via-accent-500/20 to-primary-600/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Connect on LinkedIn
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Professional networking & updates
                  </div>
                </div>
              </a>
            </div>

            {/* Schedule call placeholder */}
            <div className="group">
              <a
                href={contactInfo.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-background/60 backdrop-blur-sm border border-border rounded-xl hover:bg-background/80 hover:border-accent-500/30 transition-all duration-300 hover:scale-105"
                aria-label="Schedule a consultation call"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-secondary-500/20 via-accent-500/20 to-secondary-600/20 text-secondary-600 dark:text-secondary-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Schedule a call
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Book a consultation session
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Contact form CTA */}
          <div className="bg-gradient-to-br from-muted/80 via-muted/60 to-background/80 backdrop-blur-sm border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Start a project</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Have a specific project in mind? Let me know about your learning objectives, timeline, and requirements. I&apos;ll get back to you with a tailored approach.
            </p>
            
            {/* Simple CTA button - can be replaced with actual form later */}
            <a
              href={`mailto:${contactInfo.email}?subject=Project Inquiry&body=Hi Volodymyr,%0D%0A%0D%0AI'd like to discuss a potential project with you.%0D%0A%0D%0AProject details:%0D%0A- %0D%0A- %0D%0A- %0D%0A%0D%0ABest regards`}
              className="inline-flex items-center justify-center gap-3 w-full rounded-full bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 px-8 py-4 text-white font-semibold hover:from-primary-700 hover:via-accent-700 hover:to-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              aria-label="Send project inquiry email"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Send project inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
