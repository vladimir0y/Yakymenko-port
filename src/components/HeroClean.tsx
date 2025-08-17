'use client';

import Image from 'next/image';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
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

      <div className="container mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="animated-gradient-chaos bg-gradient-purple-deep bg-clip-text text-transparent">Volodymyr Yakymenko</span>
              <span className="animated-gradient-chaos block mt-3 bg-gradient-purple-deep bg-clip-text text-transparent">Product & Learning Experience Innovator</span>
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-1.5 w-12 rounded-full animated-gradient-chaos bg-gradient-purple-deep" aria-hidden />
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
                  <circle cx="8" cy="9" r="1.25" fill="currentColor" />
                  <rect x="7.25" y="11" width="1.5" height="6" rx="0.25" fill="currentColor" />
                  <path d="M11.25 17v-4.5h1.5v.85a2.4 2.4 0 0 1 4.25 1.55V17h-1.5v-2.6c0-.66-.54-1.2-1.2-1.2s-1.2.54-1.2 1.2V17h-1.85z" fill="currentColor" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
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
            <p className="mt-1 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-xs sm:text-sm text-foreground/90">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 dark:text-primary-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                <path d="M12 8h.01M11 11h2v5h-2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="animated-gradient-chaos bg-gradient-purple-deep bg-clip-text text-transparent font-medium">
                This website was created from scratch by me using AI.
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <div className="pointer-events-auto flex flex-col items-center gap-2">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#projects');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
className="inline-flex h-14 w-14 items-center justify-center rounded-full animated-gradient-chaos bg-gradient-purple-deep text-white shadow-lg transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600"
            aria-label="View my work"
          >
<svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
<span className="text-xs md:text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">View my work</span>
        </div>
      </div>
    </section>
  );
}

