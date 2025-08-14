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
      className={`group relative rounded-2xl overflow-hidden cursor-pointer will-change-transform border border-zinc-200/60 dark:border-white/10 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl shadow-sm hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 ${className}`}
      style={{ perspective: '1000px', ...style }}
      onClick={handleClick}
    >
      {/* Cover Image */}
      <div ref={imageRef} className="relative aspect-video overflow-hidden rounded-b-none">
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

        {/* Subtle top gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent dark:from-white/5" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="p-6 space-y-3">
        <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-zinc-900 dark:text-zinc-50 line-clamp-2">
          {project.projectData?.title || project.name}
        </h3>

        {project.projectData?.description && (
          <p className="text-zinc-600 dark:text-zinc-300 text-sm/6 leading-relaxed line-clamp-3">
            {project.projectData.description}
          </p>
        )}

        {/* Tags */}
        {project.projectData?.tags && project.projectData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.projectData.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 text-[11px] rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
            {project.projectData.tags.length > 4 && (
              <span className="px-2 py-1 bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 text-[11px] rounded-full font-medium">
                +{project.projectData.tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Date */}
        {project.projectData?.date && (
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-3 border-t border-zinc-100/80 dark:border-white/10">
            {new Date(project.projectData.date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </div>
        )}
      </div>

      {/* Hover indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
          <svg
            className="w-4 h-4 text-zinc-600 dark:text-zinc-300"
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
