'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

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
  const [isHover, setIsHover] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Motion values for subtle parallax on the image
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 120, damping: 12, mass: 0.5 });
  const springY = useSpring(mvY, { stiffness: 120, damping: 12, mass: 0.5 });
  const imgTranslate = useTransform(
    [springX, springY],
    ([x, y]) => `translate3d(${x}px, ${y}px, 0)`
  );

  // Generate a placeholder image URL based on project ID
  const getPlaceholderImage = (projectId: string) => {
    const colors = [
      'f43f5e,ec4899',
      '3b82f6,8b5cf6',
      '10b981,06d6a0',
      'f59e0b,f97316',
      '8b5cf6,d946ef',
      '06d6a0,0ea5e9',
    ];
    const colorIndex =
      projectId.charCodeAt(projectId.length - 1) % colors.length;
    const [color1] = colors[colorIndex].split(',');

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(project.projectData?.title || project.name)}&size=400&background=${color1}&color=ffffff&format=png&rounded=true&bold=true&font-size=0.4`;
  };

  const handleClick = () => {
    onClick?.(project);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(project);
    }
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (prefersReducedMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    // Scale movement to be subtle
    mvX.set((relX / rect.width) * 12);
    mvY.set((relY / rect.height) * 12);
  };

  const resetParallax = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        ref={cardRef}
        className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer will-change-transform focus:outline-none ${className}`}
        style={style}
        role="button"
        tabIndex={0}
        aria-label={`Open project ${project.projectData?.title || project.name}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => {
          setIsHover(false);
          resetParallax();
        }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Cover Image with subtle parallax translate */}
        <div className="relative aspect-video overflow-hidden">
          <m.div
            style={{
              transform: prefersReducedMotion ? undefined : imgTranslate,
            }}
            animate={prefersReducedMotion ? {} : { scale: isHover ? 1.05 : 1 }}
            transition={{
              type: 'spring',
              stiffness: 140,
              damping: 14,
              mass: 0.5,
            }}
            className="w-full h-full"
          >
            <Image
              src={getPlaceholderImage(project.id)}
              alt={project.projectData?.title || project.name}
              fill
              className="object-cover will-change-transform"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              loading="lazy"
            />
          </m.div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <m.div
          className="p-6 space-y-3"
          animate={prefersReducedMotion ? {} : { y: isHover ? -6 : 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 16 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
            {project.projectData?.title || project.name}
          </h3>

          {/* Tags only (as requested) */}
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
        </m.div>

        {/* Arrow icon indicator */}
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
      </m.div>
    </LazyMotion>
  );
}
