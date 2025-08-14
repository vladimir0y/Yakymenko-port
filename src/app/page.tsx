'use client';

import { Hero, ProjectsList } from '@/components';
import { ThemeToggle } from '@/components/theme';
import ResponsiveDebugger from '@/components/ResponsiveDebugger';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Home() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const fadeIn = prefersReducedMotion
    ? undefined
    : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 } };

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: 'easeOut' };

  // Note: The global <main id="main-content"> wrapper is provided by src/app/layout.tsx.
  // Here we render only the page sections to preserve global providers and structure.
  return (
    <div className="relative">
      {/* Responsive Debugger - only shows in development */}
      <ResponsiveDebugger position="bottom-left" detailed />

      {/* Theme Toggle Button */}
      <LazyMotion features={domAnimation} strict>
        <m.div
          className="fixed top-6 right-6 z-50"
          {...(fadeIn as any)}
          viewport={{ once: true, amount: 0.3 }}
          transition={transition}
        >
          <ThemeToggle />
        </m.div>

        {/* Hero Section */}
        <Hero />

        {/* Projects section */}
        <m.section
          id="projects"
          aria-labelledby="projects-heading"
          className="min-h-screen py-20 bg-muted/20"
          {...(fadeIn as any)}
          viewport={{ once: true, amount: 0.2 }}
          transition={transition}
        >
          <div className="container mx-auto px-6">
            {/* Visible heading for semantics and anchor target */}
            <h2 id="projects-heading" className="sr-only">
              Projects
            </h2>
            <ProjectsList />
          </div>
        </m.section>

        <m.section
          id="contact"
          aria-labelledby="contact-heading"
          className="min-h-screen flex items-center justify-center"
          {...(fadeIn as any)}
          viewport={{ once: true, amount: 0.2 }}
          transition={transition}
        >
          <div className="text-center max-w-2xl px-6">
            <h2 id="contact-heading" className="text-4xl font-bold mb-4">
              Contact Section
            </h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </m.section>
      </LazyMotion>
    </div>
  );
}
