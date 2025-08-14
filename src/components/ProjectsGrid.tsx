'use client';

import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Project } from '@/types';
import { ScrollAnimations } from '@/lib/scroll-animations';

interface ProjectsGridProps {
  projects: Project[];
  className?: string;
}

export default function ProjectsGrid({
  projects,
  className = '',
}: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Setup GSAP ScrollTrigger animations
    ScrollAnimations.setup(
      () => {
        // Batch animate project cards as they enter viewport
        ScrollAnimations.batch(
          '.project-card',
          {
            from: {
              opacity: 0,
              y: 60,
              scale: 0.9,
            },
            to: {
              opacity: 1,
              y: 0,
              scale: 1,
            },
            duration: 0.8,
            ease: 'power2.out',
          },
          {
            trigger: gridRef.current!,
            start: 'top 85%',
            once: true,
            interval: 0.1,
          }
        );
      },
      () => {
        // Fallback for reduced motion - show cards immediately
        if (cardsRef.current.length > 0) {
          cardsRef.current.forEach((card) => {
            if (card) {
              card.style.opacity = '1';
              card.style.transform = 'none';
            }
          });
        }
      }
    );

    return () => {
      ScrollAnimations.killAll();
    };
  }, [projects]);

  // Update card refs when projects change
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, projects.length);
  }, [projects]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay to allow animation to complete before clearing project
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };
  return (
    <div
      ref={gridRef}
      className={`
        grid gap-4 sm:gap-6
        [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]
        auto-rows-max
        w-full
        ${className}
      `}
    >
      {projects.map((project, index) => {
        return (
          <div
            key={project.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className={`project-card opacity-0`}
            style={{
              transform: 'translateY(60px) scale(0.9)',
            }}
          >
            <ProjectCard
              project={project}
              className="h-full focus-ring"
              onClick={handleProjectClick}
            />
          </div>
        );
      })}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
