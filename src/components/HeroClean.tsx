'use client';

import { EnvelopeIcon } from '@heroicons/react/24/outline';
import AnimatedAvatar from './AnimatedAvatar';

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
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="animated-gradient-anime-text font-black">Volodymyr Yakymenko</span>
              <span className="animated-gradient-anime-text block mt-3 font-black">Product & Learning Experience Expert</span>
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-1.5 w-12 rounded-full animated-gradient-anime" aria-hidden />
              <h2 className="text-xl sm:text-2xl font-semibold text-primary-600 dark:text-primary-400">
                {/* Mobile: Two lines without divider, Desktop: One line with divider */}
                <span className="block sm:inline">Head of E-learning</span>
                <span aria-hidden className="hidden sm:inline mx-3 text-primary-600/60">|</span>
                <span className="block sm:inline">E-Learning Developer</span>
              </h2>
            </div>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-prose">
              I design and ship high‑impact digital learning products that blend product strategy, instructional design, and modern web tech. I use AI to personalize content, automate workflows, and scale delivery without sacrificing accessibility or performance.
            </p>

            <div className="mt-10 flex flex-row gap-3">
              <div className="relative overflow-hidden rounded-full">
                <div className="animated-gradient-anime-blur absolute inset-0 rounded-full"></div>
                <a
                  href="mailto:vladimiryakimenko99@gmail.com"
                  className="relative inline-flex items-center justify-center gap-2 rounded-full animated-gradient-anime px-6 py-3 text-white font-semibold hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 transition"
                  aria-label="Contact me via email"
                >
                  <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
                  Contact me
                </a>
              </div>
              <div className="relative overflow-hidden rounded-full">
                <div className="animated-gradient-anime-blur absolute inset-0 rounded-full"></div>
                <a
                  href="https://www.linkedin.com/in/volodymyr-yakymenko"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center gap-2 rounded-full animated-gradient-anime px-6 py-3 text-white font-semibold hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 transition"
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
          </div>

          <div className="order-1 md:order-2 flex flex-col items-center md:items-end gap-3">
            <div className="relative w-[20.3rem] h-[20.3rem] sm:w-[17rem] sm:h-[17rem] md:w-[18.5rem] md:h-[18.5rem] lg:w-[22rem] lg:h-[22rem] xl:w-[26rem] xl:h-[26rem]">
              <AnimatedAvatar
                alt="AI-generated avatar of Volodymyr Yakymenko"
                width={1024}
                height={1024}
              />
            </div>
            <p className="mt-1 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-xs sm:text-sm text-foreground/90 max-w-fit">
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 dark:text-primary-400 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                <path d="M12 8h.01M11 11h2v5h-2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="animated-gradient-anime-text font-bold whitespace-nowrap">
                This website was created from scratch by me using AI.
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center mt-16 sm:mt-20 md:mt-24">
        <div className="flex flex-col items-center gap-2">
          <div className="relative overflow-hidden rounded-full">
            {/* Blurred background for glow effect */}
            <div className="animated-gradient-anime-blur absolute inset-0 rounded-full"></div>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector('#projects');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative inline-flex h-14 w-14 items-center justify-center rounded-full animated-gradient-anime text-white shadow-lg transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600"
              aria-label="View my work"
            >
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
          <span className="text-xs md:text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">View my work</span>
        </div>
      </div>
    </section>
  );
}

