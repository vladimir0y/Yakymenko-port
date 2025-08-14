'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (project: Project) => void;
}

export default function ProjectCard({
  project,
  className = '',
  style,
  onClick,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!card || !image || !content) return;

    // Set initial state
    gsap.set(card, { transformOrigin: 'center' });

    const handleMouseEnter = () => {
      const tl = gsap.timeline();

      tl.to(card, {
        scale: 1.05,
        rotationY: 2,
        rotationX: -1,
        duration: 0.4,
        ease: 'power2.out',
      })
        .to(
          image,
          {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out',
          },
          0
        )
        .to(
          content,
          {
            y: -8,
            duration: 0.4,
            ease: 'power2.out',
          },
          0
        );
    };

    const handleMouseLeave = () => {
      const tl = gsap.timeline();

      tl.to(card, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: 'power2.out',
      })
        .to(
          image,
          {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          0
        )
        .to(
          content,
          {
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          0
        );
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Generate a placeholder image URL based on project ID
  const getPlaceholderImage = (projectId: string) => {
    const colors = [
      'f43f5e,ec4899', // rose to pink
      '3b82f6,8b5cf6', // blue to violet
      '10b981,06d6a0', // emerald to teal
      'f59e0b,f97316', // amber to orange
      '8b5cf6,d946ef', // violet to fuchsia
      '06d6a0,0ea5e9', // teal to sky
    ];
    const colorIndex =
      projectId.charCodeAt(projectId.length - 1) % colors.length;
    const [color1] = colors[colorIndex].split(',');

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(project.projectData?.title || project.name)}&size=400&background=${color1}&color=ffffff&format=png&rounded=true&bold=true&font-size=0.4`;
  };

  const handleClick = () => {
    if (onClick) {
      onClick(project);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer will-change-transform ${className}`}
      style={{ perspective: '1000px', ...style }}
      onClick={handleClick}
    >
      {/* Cover Image */}
      <div ref={imageRef} className="relative aspect-video overflow-hidden">
        <Image
          src={getPlaceholderImage(project.id)}
          alt={project.projectData?.title || project.name}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          priority={false}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="p-6 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
          {project.projectData?.title || project.name}
        </h3>

        {project.projectData?.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
            {project.projectData.description}
          </p>
        )}

        {/* Tags */}
        {project.projectData?.tags && project.projectData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.projectData.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
            {project.projectData.tags.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full font-medium">
                +{project.projectData.tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Date */}
        {project.projectData?.date && (
          <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
            {new Date(project.projectData.date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </div>
        )}
      </div>

      {/* Hover indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
