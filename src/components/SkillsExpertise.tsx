'use client';

import type React from 'react';
import { skillsAndExpertise } from '@/data/content';
import { AcademicCapIcon, ServerStackIcon, PuzzlePieceIcon, CpuChipIcon, PaintBrushIcon, UserGroupIcon } from '@heroicons/react/24/outline';

// Icon components for different skill areas
const SkillIcons = {
  'academic-cap': (
    <AcademicCapIcon className="h-8 w-8" aria-hidden="true" />
  ),
  'server-stack': (
    <ServerStackIcon className="h-8 w-8" aria-hidden="true" />
  ),
  'sparkles': (
    <PuzzlePieceIcon className="h-8 w-8" aria-hidden="true" />
  ),
  'ai-chip': (
    <CpuChipIcon className="h-8 w-8" aria-hidden="true" />
  ),
  'chart-bar': (
    <PaintBrushIcon className="h-8 w-8" aria-hidden="true" />
  ),
  'user-group': (
    <UserGroupIcon className="h-8 w-8" aria-hidden="true" />
  ),
};

// Function to render tool names as tag-style components
const renderToolsWithAccent = (toolsText: string) => {
  // Define tool names to highlight as tags
  const toolNames = [
    'Articulate Storyline', 'Articulate Rise', 'iSpring Suite', 'Adobe Captivate', 'Courselab',
    'Moodle', 'TalentLMS', 'ScormCloud', 'Opigno LMS', 'Collaborator', 'Analytics',
    'Synthesia', 'Heygen', 'Generative AI', 'Gamification', 'Game Based Learning',
    'Team Leadership', 'Stakeholder Management',
    'Figma', 'Photoshop', 'Illustrator'
  ];

  // Check if this contains tools
  const hasTools = toolNames.some(tool => toolsText.includes(tool));
  
  if (!hasTools) {
    return <span>{toolsText}</span>;
  }

  // Extract prefix (like "Tools: ")
  const prefixMatch = toolsText.match(/^([^:]+:\s*)/);
  const prefix = prefixMatch ? prefixMatch[1] : '';
  const content = prefixMatch ? toolsText.substring(prefix.length) : toolsText;

  // Find all tool names in the content
  const foundTools = toolNames.filter(tool => content.includes(tool));
  
  return (
    <div className="flex flex-wrap items-center gap-2">
      {prefix && (
        <span className="text-muted-foreground/80 text-sm">{prefix}</span>
      )}
      {foundTools.map((tool, index) => (
        <span
          key={index}
          className="px-3 py-1 rounded-full text-white text-[12px] md:text-[13px] font-semibold animated-gradient-anime shadow-sm ring-1 ring-black/5 dark:ring-white/10"
        >
          {tool}
        </span>
      ))}
      {/* Add any remaining text that doesn't contain tool names */}
      {(() => {
        let remainingText = content;
        foundTools.forEach(tool => {
          remainingText = remainingText.replace(new RegExp(tool, 'g'), '').replace(/[,.]\s*/g, ' ');
        });
        remainingText = remainingText.trim().replace(/\s+/g, ' ');
        if (remainingText && remainingText !== prefix) {
          return (
            <span className="text-muted-foreground/80 text-sm">
              {remainingText}
            </span>
          );
        }
        return null;
      })()} 
    </div>
  );
};

export default function SkillsExpertise() {
  const categories = Object.entries(skillsAndExpertise);

  return (
    <section
      id="skills-expertise"
      aria-labelledby="skills-heading"
      className="py-20 md:py-28 bg-white dark:bg-gray-950"
    >
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            id="skills-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight"
          >
            <span className="animated-gradient-anime-text">
              Skills & expertise
            </span>
          </h2>
        </div>

        {/* Skills - Responsive Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8">
            {categories.map(([category, data], categoryIndex) => (
              <div
                key={category}
                className={`group relative bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-accent-500/30 hover:-translate-y-1 flex flex-col ${
                  categories.length === 5 && categoryIndex === 4 ? 'md:col-span-2 lg:col-span-1 xl:col-span-2 max-w-2xl mx-auto' : ''
                }`}
                style={{
                  animationDelay: `${categoryIndex * 0.1}s`,
                }}
              >
                {/* Subtle gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/10 via-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent-500/20 via-primary-500/20 to-accent-600/20 text-accent-600 dark:text-accent-400 group-hover:scale-110 transition-transform duration-300">
                    {SkillIcons[data.icon as keyof typeof SkillIcons]}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {category}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {data.description}
                </p>
                {data.tools && (
                  <div className="text-sm text-muted-foreground/80 font-medium">
                    {renderToolsWithAccent(data.tools)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
