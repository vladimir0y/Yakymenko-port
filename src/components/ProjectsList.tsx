'use client';

import React, { useEffect, useRef } from 'react';
import { useProjects } from '@/lib/useProjects';
import { ProjectsResponse } from '@/types';
import ProjectsGrid from './ProjectsGrid';
import { ScrollAnimations } from '@/lib/scroll-animations';

interface ProjectsListProps {
  fallbackData?: ProjectsResponse;
}

export default function ProjectsList({ fallbackData }: ProjectsListProps) {
  const { projects, isLoading, isError, error } =
    useProjects(fallbackData);
  const headerRef = useRef<HTMLDivElement>(null);
  const emptyStateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollAnimations.setup(
      () => {
        // Animate section header
        if (headerRef.current) {
          ScrollAnimations.slideIn(headerRef.current, 'left', {
            trigger: headerRef.current,
            start: 'top 80%',
            once: true,
          });
        }

        // Animate empty state if visible
        if (emptyStateRef.current && projects.length === 0) {
          ScrollAnimations.fadeIn(emptyStateRef.current, {
            trigger: emptyStateRef.current,
            start: 'top 80%',
            once: true,
          });
        }
      },
      () => {
        // Fallback for reduced motion
        if (headerRef.current) {
          headerRef.current.style.opacity = '1';
          headerRef.current.style.transform = 'none';
        }
        if (emptyStateRef.current) {
          emptyStateRef.current.style.opacity = '1';
          emptyStateRef.current.style.transform = 'none';
        }
      }
    );
  }, [projects.length]);

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800">
          Error Loading Projects
        </h3>
        <p className="text-red-600">
          {error?.message || 'Failed to load projects'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Section header - Hero/Services style */}
      <div className="text-center mb-16 md:mb-20">
        <div
          ref={headerRef}
          className="opacity-0"
          style={{ transform: 'translateX(-30px)' }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            <span className="animated-gradient-anime-text">
              Featured work
            </span>
          </h2>
        </div>
        {isLoading && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
            <div className="w-4 h-4 border-2 border-border border-t-primary-500 rounded-full animate-spin"></div>
            <span>Loading latest data...</span>
          </div>
        )}
      </div>

      <ProjectsGrid projects={projects} className="max-w-none mx-auto" />

      {projects.length === 0 && !isLoading && (
        <div
          ref={emptyStateRef}
          className="text-center py-16 opacity-0 max-w-md mx-auto"
          style={{ transform: 'translateY(30px)' }}
        >
          <div className="w-24 h-24 mx-auto mb-6 opacity-60">
            <div className="w-full h-full bg-gradient-to-br from-primary-500/20 via-accent-500/20 to-primary-600/20 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3">
            No projects available
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Projects are being curated and will be added soon. Check back for exciting learning solutions and case studies.
          </p>
        </div>
      )}
    </div>
  );
}
