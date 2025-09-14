'use client';

import type React from 'react';
import { achievements } from '@/data/content';

export default function Achievements() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="py-20 md:py-28 bg-white dark:bg-gray-950"
    >

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            id="achievements-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight"
          >
            <span className="animated-gradient-anime-text">
              Impact
            </span>
          </h2>
        </div>

        {/* Achievements grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.metric}
              className="group relative text-center flex flex-col h-full"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Achievement card */}
              <div className="group relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:border-accent-500/30 hover:-translate-y-1 text-center flex flex-col h-full">
                {/* Subtle gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/10 via-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent-500/20 via-primary-500/20 to-accent-600/20 text-accent-600 dark:text-accent-400 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-3xl font-mono font-extrabold animated-gradient-anime-text">
                      {achievement.metric}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {achievement.label}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow flex items-center justify-center">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
