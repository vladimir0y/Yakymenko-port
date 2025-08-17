'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
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

  // Build a direct HTML URL for this project (same logic as detail page)
  const directHtmlUrl = useMemo(() => {
    const withBasePath = (p: string) => {
      if (!p) return p as any;
      if (/^https?:\/\//i.test(p)) return p;
      const base = 'https://vladimir0y.github.io/Yakymenko-port';
      return `${base}${p.startsWith('/') ? p : '/' + p}`;
    };
    const m = project.image?.match(/^\/?Projects\/([^/]+)\//);
    const result: string[] = [];
    if (m?.[1]) {
      const folderRaw = m[1];
      const folderEnc = encodeURIComponent(folderRaw);
      const folderSlug = folderRaw
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const files = ['story.html', 'content/index.html', 'html5/index.html', 'index.html'];
      const folders = [folderEnc, folderRaw, folderSlug];
      for (const f of folders) {
        for (const file of files) {
          result.push(withBasePath(`/Projects/${f}/${file}`));
        }
      }
    }
    if (project.live) result.push(project.live);
    return result[0];
  }, [project.image, project.live]);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!card || !image || !content) return;

    gsap.set([card, image, content], { willChange: 'transform' });

    const handleMouseEnter = () => {
      const tl = gsap.timeline();

      tl.to(card, {
        scale: 1.02,
        y: -2,
        duration: 0.35,
        ease: 'power3.out',
      })
        .to(
          image,
          {
            scale: 1.03,
            duration: 0.35,
            ease: 'power3.out',
          },
          0
        )
        .to(
          content,
          {
            y: -4,
            duration: 0.35,
            ease: 'power3.out',
          },
          0
        );
    };

    const handleMouseLeave = () => {
      const tl = gsap.timeline();

      tl.to(card, {
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
      })
        .to(
          image,
          {
            scale: 1,
            duration: 0.45,
            ease: 'power3.out',
          },
          0
        )
        .to(
          content,
          {
            y: 0,
            duration: 0.45,
            ease: 'power3.out',
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

  // Determine if the provided image is just a placeholder
  const isPlaceholder = (src?: string) => !!src && src.startsWith('/api/placeholder');

  // Derive the project folder name under public/Projects from known data
  const folderName = useMemo(() => {
    // 1) If project.image already points into /Projects/<folder>/..., extract it
    if (project.image && !isPlaceholder(project.image)) {
      const m = project.image.match(/^\/?Projects\/([^/]+)/);
      if (m) return m[1];
    }

    // 2) Try to parse from the live URL after /Yakymenko-port/
    if (project.live) {
      try {
        const url = new URL(project.live);
        const parts = url.pathname.split('/').filter(Boolean);
        // Find the segment after 'Yakymenko-port'
        const yakIndex = parts.findIndex((p) => p === 'Yakymenko-port');
        if (yakIndex !== -1 && parts[yakIndex + 1]) {
          return parts[yakIndex + 1];
        }
        // If not found, try using the first path segment as a fallback
        if (parts[0]) return parts[0];
      } catch {
        // ignore URL parse errors
      }
    }

    // 3) Fall back to a sanitized project name or id
    const fromName = project.name
      ?.trim()
      .replace(/\s+/g, '_')
      .replace(/[^A-Za-z0-9_\-]/g, '');
    if (fromName) return fromName;

    return project.id;
  }, [project]);

  // Client-side cover selection: try common extensions until one loads
  const coverBasePath = useMemo(() => `/Projects/${folderName}/cover`, [folderName]);
  const candidateExts = useMemo(() => ['webp', 'png', 'jpg', 'jpeg'], []);

  const placeholderSrc = useMemo(() => {
    // Fallback placeholder (same as previous behavior)
    const colors = [
      'f43f5e,ec4899', // rose to pink
      '3b82f6,8b5cf6', // blue to violet
      '10b981,06d6a0', // emerald to teal
      'f59e0b,f97316', // amber to orange
      '8b5cf6,d946ef', // violet to fuchsia
      '06d6a0,0ea5e9', // teal to sky
    ];
    const id = project.id || 'x';
    const colorIndex = id.charCodeAt(id.length - 1) % colors.length;
    const [color1] = colors[colorIndex].split(',');
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      project.projectData?.title || project.name
    )}&size=400&background=${color1}&color=ffffff&format=png&rounded=true&bold=true&font-size=0.4`;
  }, [project]);

  const initialSrc = useMemo(() => {
    if (project.image && !isPlaceholder(project.image)) return project.image;
    // Start with webp
    return `${coverBasePath}.webp`;
  }, [project.image, coverBasePath]);

  const [imgSrc, setImgSrc] = useState<string>(initialSrc);
  const [attemptIndex, setAttemptIndex] = useState<number>(0);
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    // Reset attempts when project changes
    setAttemptIndex(0);
    setFailed(false);
    setImgSrc(initialSrc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSrc, folderName]);

  const handleImageError = () => {
    // If we were given a non-placeholder project.image and it failed, try cover chain next
    if (attemptIndex === 0 && project.image && !isPlaceholder(project.image)) {
      setAttemptIndex(1);
      setImgSrc(`${coverBasePath}.${candidateExts[0]}`); // start webp after explicit image fails
      return;
    }

    const nextAttempt = attemptIndex + 1;
    // Figure out which ext we should try based on attemptIndex
    // attemptIndex mapping (when starting from cover chain): 0->webp,1->png,2->jpg,3->jpeg
    if (nextAttempt <= candidateExts.length - 1) {
      setAttemptIndex(nextAttempt);
      setImgSrc(`${coverBasePath}.${candidateExts[nextAttempt]}`);
    } else {
      // All attempts failed -> use placeholder
      setFailed(true);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick(project);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group relative h-full flex flex-col rounded-3xl overflow-hidden cursor-pointer border border-zinc-200/70 dark:border-zinc-800 bg-gradient-to-b from-white to-white/95 dark:from-zinc-900 dark:to-zinc-900/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.35)] transition-all duration-300 ${className}`}
      style={{ ...style }}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Cover Image */}
      <div ref={imageRef} className="relative aspect-[16/10] overflow-hidden rounded-2xl m-3 border border-zinc-200/70 dark:border-zinc-800">
        <Image
          src={failed ? placeholderSrc : imgSrc}
          alt={project.projectData?.title || project.name}
          fill
          className="object-cover transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          onError={handleImageError}
          priority={false}
        />

        {/* Subtle overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/5 dark:from-white/0 dark:via-white/0 dark:to-white/5" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="px-6 pb-6 pt-2 space-y-3 flex-1 flex flex-col">
        <h3 className="text-[16px] md:text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 line-clamp-2">
          {project.projectData?.title || project.name}
        </h3>

        {project.projectData?.description && (
          <p className="text-zinc-600 dark:text-zinc-300 text-[13px] md:text-[14px] leading-relaxed line-clamp-3">
            {project.projectData.description}
          </p>
        )}

        {/* Tags */}
{project.projectData?.tags && project.projectData.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.projectData.tags.slice(0, 4).map((tag) => {
              const isArticulate = /Articulate/i.test(tag);
              return (
                <span
                  key={tag}
                  className={
                    isArticulate
                      ? "px-3 py-1 rounded-full text-white text-[12px] md:text-[13px] font-semibold animated-gradient-chaos bg-gradient-purple-deep shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                      : "px-2 py-0.5 bg-zinc-100/90 dark:bg-white/10 text-zinc-700 dark:text-zinc-200 text-[11px] rounded-full font-medium"
                  }
                >
                  {tag}
                </span>
              );
            })}
            {project.projectData.tags.length > 4 && (
              <span className="px-2 py-0.5 bg-zinc-100/90 dark:bg-white/10 text-zinc-600 dark:text-zinc-300 text-[11px] rounded-full font-medium">
                +{project.projectData.tags.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Date */}
        {project.projectData?.date && (
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-3 border-t border-zinc-100/80 dark:border-white/10/10">
            {new Date(project.projectData.date).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </div>
        )}
      </div>

      {/* Hover actions */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
        {/* Open direct HTML in new tab */}
        {directHtmlUrl && (
          <a
            href={directHtmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm ring-1 ring-black/5 dark:ring-white/5 hover:scale-105 transition"
            title="Open live"
            aria-label="Open live"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4 text-zinc-700 dark:text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14" />
            </svg>
          </a>
        )}
        {/* Old icon kept for visual balance */}
        <div className="w-7 h-7 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm ring-1 ring-black/5 dark:ring-white/5">
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
