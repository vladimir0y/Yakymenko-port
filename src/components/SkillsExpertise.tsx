'use client';

import type React from 'react';
import { skillsAndExpertise } from '@/data/content';

export default function SkillsExpertise() {
  const categories = Object.keys(skillsAndExpertise);

  return (
    <section
      id="skills-expertise"
      aria-labelledby="skills-heading"
      className="relative py-20 md:py-28 bg-muted/20"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            id="skills-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6"
          >
            <span className="bg-gradient-to-br from-foreground via-primary-700 to-accent-700 bg-clip-text text-transparent">
              Skills & expertise
            </span>
          </h2>
        </div>

        {/* Skills categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <div
              key={category}
              className="space-y-4"
              style={{
                animationDelay: `${categoryIndex * 0.1}s`,
              }}
            >
              {/* Category title */}
              <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-6 flex items-center gap-3">
                <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-primary-600 to-accent-600" aria-hidden />
                {category}
              </h3>

              {/* Skills list */}
              <div className="space-y-3" role="list" aria-label={`${category} skills`}>
                {skillsAndExpertise[category as keyof typeof skillsAndExpertise].map((skill, skillIndex) => (
                  <div
                    key={skill}
                    role="listitem"
                    className="group relative bg-background/60 backdrop-blur-sm border border-border rounded-lg px-4 py-3 text-sm font-medium text-foreground/90 hover:bg-background/80 hover:border-accent-500/30 transition-all duration-200 hover:scale-105"
                    style={{
                      animationDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s`,
                    }}
                  >
                    {/* Subtle hover gradient */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-500/5 via-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="relative z-10">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional note */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground italic max-w-2xl mx-auto">
            This combination of technical expertise and leadership experience enables me to deliver comprehensive learning solutions from concept to implementation.
          </p>
        </div>
      </div>
    </section>
  );
}
