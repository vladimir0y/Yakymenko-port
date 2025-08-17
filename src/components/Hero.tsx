'use client';

import Image from 'next/image';

// Accessible, lightweight Hero component per spec
// - H1: "Volodymyr Yakymenko — Product & Learning Experience Innovator"
// - H2 role line
// - Next Image avatar from public/avatar.png (1024x1024)
// - About blurb
// - CTA buttons: View my work (#projects), Contact (mailto:), LinkedIn (new tab)

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Text */}
          <div>
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
            >
              Volodymyr Yakymenko — Product & Learning Experience Innovator
            </h1>
            <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-primary-600 dark:text-primary-400">
              Head of E-learning, E-Learning Manager
            </h2>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-prose">
              I design and ship high‑impact digital learning products that blend
              product strategy, instructional design, and modern web tech. I use
              AI to personalize content, automate workflows, and scale delivery
              without sacrificing accessibility or performance.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-md bg-primary-600 px-5 py-3 text-white shadow hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 transition-colors"
                aria-label="View my work in the Projects section"
              >
                View my work
              </a>
              <a
                href="mailto:vladimiryakimenko99@gmail.com"
                className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-foreground hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 transition-colors"
                aria-label="Contact me via email"
              >
                Contact me
              </a>
              <a
                href="https://www.linkedin.com/in/vladimir-yakimenko/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-foreground hover:bg-muted/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-600 transition-colors"
                aria-label="Open my LinkedIn profile in a new tab"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right: Avatar */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80">
              <Image
                src="/avatar.png"
                alt="AI-generated avatar of Volodymyr Yakymenko"
                width={1024}
                height={1024}
                priority
                className="rounded-full object-cover shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
