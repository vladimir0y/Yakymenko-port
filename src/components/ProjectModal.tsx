'use client';

import React, {
  useRef,
  useEffect,
  useState,
  Fragment,
  useCallback,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { gsap } from 'gsap';
import {
  XMarkIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Project, MediaType } from '@/types';
import Prose from './Prose';
import { Button } from './ui/Button';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

// Local file API types (simplified for static export)
interface LocalProjectFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'code' | 'other';
  path: string;
  size: number;
  lastModified: string;
}

// Helper function to get YouTube embed URL
// function getYouTubeEmbedUrl(url: string): string {
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//   const match = url.match(regExp);
//   const videoId = match && match[2].length === 11 ? match[2] : null;
//   return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
// }

// Helper function to get Vimeo embed URL
// function getVimeoEmbedUrl(url: string): string {
//   const regExp = /^.*(vimeo\.com\/)([0-9]+).*$/;
//   const match = url.match(regExp);
//   const videoId = match ? match[2] : null;
//   return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1` : url;
// }

// Updated MediaItem type for local files
interface LocalMediaItem {
  file: LocalProjectFile;
  type: MediaType;
  embedUrl?: string;
}

// Media player component
function MediaPlayer({
  mediaItem,
  isFullscreen,
}: {
  mediaItem: LocalMediaItem;
  isFullscreen: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  switch (mediaItem.type) {
    case 'html':
      // Use the live URL directly (GitHub Pages)
      const htmlSrc = mediaItem.embedUrl || mediaItem.file.path;
      return (
        <div ref={containerRef} className="w-full h-full">
          <iframe
            src={htmlSrc}
            className="w-full h-full border-0 rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={mediaItem.file.name}
          />
        </div>
      );

    case 'video':
      return (
        <div
          ref={containerRef}
          className="w-full h-full flex items-center justify-center"
        >
          <video
            src={mediaItem.file.path}
            className="max-w-full max-h-full rounded-lg"
            controls
            autoPlay={isFullscreen}
            title={mediaItem.file.name}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );

    case 'youtube':
    case 'vimeo':
      return (
        <div ref={containerRef} className="w-full h-full">
          <iframe
            src={mediaItem.embedUrl}
            className="w-full h-full border-0 rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={mediaItem.file.name}
          />
        </div>
      );

    case 'image':
      return (
        <div
          ref={containerRef}
          className="w-full h-full flex items-center justify-center"
        >
          <Image
            src={mediaItem.file.path}
            alt={mediaItem.file.name}
            width={800}
            height={600}
            className="max-w-full max-h-full object-contain rounded-lg"
            unoptimized={true}
            loading="lazy"
          />
        </div>
      );

    default:
      return (
        <div
          ref={containerRef}
          className="w-full h-full flex items-center justify-center"
        >
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">Preview not available</p>
            <p className="text-sm">{mediaItem.file.name}</p>
            <a
              href={mediaItem.file.path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View File
            </a>
          </div>
        </div>
      );
  }
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Process media items - simplified for static export
  const mediaItems: LocalMediaItem[] = React.useMemo(() => {
    // If project has a live URL, show it as the primary media
    if (project?.live) {
      return [
        {
          file: {
            id: 'live-demo',
            name: 'Live Demo',
            type: 'code',
            path: project.live,
            size: 0,
            lastModified: new Date().toISOString(),
          },
          type: 'html' as MediaType,
          embedUrl: project.live,
        },
      ];
    }

    return [];
  }, [project?.live]);

  // Handle close with animation
  const handleClose = useCallback(() => {
    if (!overlayRef.current || !contentRef.current) {
      onClose();
      return;
    }

    const overlay = overlayRef.current;
    const content = contentRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        onClose();
        setCurrentMediaIndex(0);
        setIsFullscreen(false);
      },
    });

    tl.to(content, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: 'power2.in',
    }).to(
      overlay,
      {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      },
      0.1
    );
  }, [onClose]);

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // GSAP animations
  useEffect(() => {
    if (
      !isOpen ||
      !modalRef.current ||
      !overlayRef.current ||
      !contentRef.current
    )
      return;

    const overlay = overlayRef.current;
    const content = contentRef.current;

    // Create timeline
    const tl = gsap.timeline();

    if (isOpen) {
      // Opening animation
      gsap.set(overlay, { opacity: 0 });
      gsap.set(content, { scale: 0.8, opacity: 0, y: 50 });

      tl.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }).to(
        content,
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
        },
        0.1
      );
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!project) return null;

  const currentMedia = mediaItems[currentMediaIndex];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        {/* Overlay */}
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Full-screen container */}
        <div ref={modalRef} className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Modal content */}
            <Dialog.Panel
              ref={contentRef}
              className={`
                relative w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 
                rounded-xl shadow-2xl overflow-hidden
                ${isFullscreen ? 'max-w-full h-full' : 'max-h-[90vh]'}
              `}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-3xl">
                  <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
                    {project.projectData?.title || project.name}
                  </Dialog.Title>
                  {project.projectData?.description && (
                    <Prose className="mt-2 text-gray-700 dark:text-gray-300">
                      <p>{project.projectData.description}</p>
                      {/* Callout box */}
                      <div className="mt-4 border-l-4 border-accent-500 pl-4 py-2 bg-muted/40 rounded-r">
                        <p className="text-sm">
                          Tip: Try the fullscreen mode for a more immersive demo
                          experience.
                        </p>
                      </div>
                    </Prose>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {/* Fullscreen toggle */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    aria-label={
                      isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'
                    }
                  >
                    {isFullscreen ? (
                      <ArrowsPointingInIcon className="h-6 w-6" />
                    ) : (
                      <ArrowsPointingOutIcon className="h-6 w-6" />
                    )}
                  </button>

                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    aria-label="Close modal"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div
                className={`${isFullscreen ? 'h-full' : 'h-96 md:h-[500px] lg:h-[600px]'} p-6`}
              >
                {mediaItems.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <p className="text-lg mb-2">No live demo available</p>
                      <p className="text-sm">
                        Check the project repository for more details.
                      </p>
                      {project?.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          View Repository
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {currentMedia && (
                  <div className="h-full -mx-6">
                    {/* Full-bleed media with soft shadow */}
                    <div className="h-full shadow-soft">
                      <MediaPlayer
                        mediaItem={currentMedia}
                        isFullscreen={isFullscreen}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Media navigation */}
              {mediaItems.length > 1 && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                      {currentMediaIndex + 1} of {mediaItems.length}
                    </span>

                    <Button
                      variant="ghost"
                      onClick={() =>
                        setCurrentMediaIndex(Math.max(0, currentMediaIndex - 1))
                      }
                      disabled={currentMediaIndex === 0}
                      className="min-w-24"
                    >
                      Previous
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() =>
                        setCurrentMediaIndex(
                          Math.min(mediaItems.length - 1, currentMediaIndex + 1)
                        )
                      }
                      disabled={currentMediaIndex === mediaItems.length - 1}
                      className="min-w-24"
                    >
                      Next
                    </Button>
                  </div>

                  {/* Media thumbnails */}
                  <div className="mt-4 flex justify-center space-x-2 overflow-x-auto">
                    {mediaItems.map((item, index) => (
                      <button
                        key={item.file.id}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={`
                          flex-shrink-0 w-16 h-12 rounded border-2 transition-all
                          ${
                            index === currentMediaIndex
                              ? 'border-blue-600 ring-2 ring-blue-600/30'
                              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                          }
                        `}
                      >
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-xs text-gray-600 dark:text-gray-400">
                          {item.type === 'html'
                            ? 'HTML'
                            : item.type === 'video'
                              ? 'VID'
                              : item.type === 'youtube'
                                ? 'YT'
                                : item.type === 'vimeo'
                                  ? 'VM'
                                  : item.type === 'image'
                                    ? 'IMG'
                                    : '?'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
