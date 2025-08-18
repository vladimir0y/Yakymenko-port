'use client';

import Image from 'next/image';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import type React from 'react';

// Accessible, lightweight Hero with enhanced accents and icons
export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      {/* Decorative background: soft radial and grid overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-600/15 via-accent-500/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-40">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-200 dark:text-zinc-800" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-20 pb-36 md:pt-28 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Text */}
          <div className="order-last md:order-none">
            {/* Name and title (removed dash before the title) */}
            <h1 id="hero-heading" className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
              <span className="bg-gradient-to-br from-foreground via-primary-700 to-accent-700 bg-clip-text text-transparent">Volodymyr Yakymenko</span>
              <span className="block mt-3 bg-gradient-to-br from-primary-700 via-accent-700 to-foreground bg-clip-text text-transparent">Product & Learning Experience Innovator</span>
            </h1>

            {/* Additional accent bar and role line */}
            <div className="mt-5 flex items-center gap-3">
              <span className="h-1.5 w-12 rounded-full bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600" aria-hidden />
            <h2 className="text-xl sm:text-2xl font-semibold text-primary-600 dark:text-primary-400">
                <span>Head of E-learning</span>
                <span aria-hidden className="mx-3 text-primary-600/60">|</span>
                <span>E-Learning Manager</span>
              </h2>
            </div>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-prose">
              I design and ship high‑impact digital learning products that blend product strategy, instructional design, and modern web tech. I use AI to personalize content, automate workflows, and scale delivery without sacrificing accessibility or performance.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:vladimiryakimenko99@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-foreground hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 transition"
                aria-label="Contact me via email"
              >
                <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
                Contact me
              </a>
              <a
                href="https://www.linkedin.com/in/vladimir-yakimenko/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-foreground hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 transition"
                aria-label="Open my LinkedIn profile in a new tab"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M7.75 10.5h1.5v6h-1.5zM7.75 7.5h1.5v1.5h-1.5zM11.5 10.5h1.5v.85a2.4 2.4 0 0 1 4.25 1.55v3.1h-1.5v-2.6c0-.66-.54-1.2-1.2-1.2s-1.2.54-1.2 1.2v2.6H11.5v-6z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                LinkedIn
              </a>
            </div>

            
          </div>

          {/* Right: Avatar (no extra styles) */}
          <div className="flex flex-col items-center md:items-end gap-3 order-first md:order-none">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80">
              <Image
                src="/avatar.png"
                alt="AI-generated avatar of Volodymyr Yakymenko"
                width={1024}
                height={1024}
                priority
                className="rounded-full object-cover"
              />
            </div>
            {/* Attribution note with icon and accent moved under avatar */}
            <p className="mt-1 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-xs sm:text-sm text-foreground/90">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 dark:text-primary-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                <path
                  d="M12 8h.01M11 11h2v5h-2z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent font-medium">
                This website and its design were created entirely from scratch by me using AI.
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Bottom-center arrow to Projects */}
      <div className="pointer-events-none flex justify-center mt-16 sm:mt-20 md:absolute md:inset-x-0 md:bottom-6 md:mt-0">
        <div className="pointer-events-auto flex flex-col items-center gap-2">
          <a
            href="#projects"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              const el = document.querySelector('#projects');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/70 shadow-sm backdrop-blur transition hover:bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
            aria-label="View my work"
          >
            <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <span className="text-xs font-medium text-muted-foreground">View my work</span>
        </div>
      </div>
    </section>
  );
}
