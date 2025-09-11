'use client';

import type React from 'react';
import { achievements } from '@/data/content';

export default function Achievements() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="relative py-20 md:py-28 bg-gradient-to-b from-secondary-950/20 via-secondary-900/10 to-background overflow-hidden"
    >
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary-600/15 via-accent-500/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            id="achievements-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
          >
            <span className="bg-gradient-to-br from-foreground via-secondary-700 to-accent-700 bg-clip-text text-transparent">
              Selected achievements
            </span>
          </h2>
        </div>

        {/* Achievements grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.metric}
              className="group relative text-center"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Achievement card */}
              <div className="relative bg-gradient-to-br from-secondary-950/40 via-secondary-900/30 to-background/80 backdrop-blur-sm border border-secondary-800/30 rounded-2xl p-8 hover:border-accent-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/10 via-secondary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Metric */}
                <div className="relative z-10 mb-4">
                  <div className="text-5xl sm:text-6xl font-mono font-extrabold bg-gradient-to-br from-accent-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent">
                    {achievement.metric}
                  </div>
                </div>

                {/* Label */}
                <div className="relative z-10">
                  <h3 className="text-sm sm:text-base font-semibold text-foreground/90 leading-tight">
                    {achievement.label}
                  </h3>
                </div>

                {/* Decorative border accent */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-accent-600 via-secondary-600 to-accent-600 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Expanded description on hover - hidden on mobile */}
              <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 max-w-sm bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-20">
                <p className="text-sm text-muted-foreground text-center">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile descriptions - visible only on smaller screens */}
        <div className="lg:hidden mt-12 space-y-6 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <div
              key={`mobile-${achievement.metric}`}
              className="text-center p-4 bg-background/60 rounded-lg border border-border"
              style={{
                animationDelay: `${(index * 0.1) + 0.4}s`,
              }}
            >
              <div className="font-mono font-bold text-accent-600 dark:text-accent-400 mb-2">
                {achievement.metric}
              </div>
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
