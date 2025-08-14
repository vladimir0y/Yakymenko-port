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
  const { projects, total, isLoading, isError, error } =
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
    <div className="space-y-8">
      <div
        ref={headerRef}
        className="flex items-center justify-between opacity-0"
        style={{ transform: 'translateX(-30px)' }}
      >
        <h2 className="text-fluid-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Projects
          <span className="text-fluid-lg text-gray-600 dark:text-gray-400 font-normal ml-2">
            ({total})
          </span>
        </h2>
        {isLoading && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin"></div>
            <span>Loading latest data...</span>
          </div>
        )}
      </div>

      <ProjectsGrid projects={projects} />

      {projects.length === 0 && !isLoading && (
        <div
          ref={emptyStateRef}
          className="text-center py-16 opacity-0"
          style={{ transform: 'translateY(30px)' }}
        >
          <div className="w-24 h-24 mx-auto mb-6 opacity-50">
            <svg
              className="w-full h-full text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No projects found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Check back later for new projects.
          </p>
        </div>
      )}
    </div>
  );
}
