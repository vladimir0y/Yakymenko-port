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
import useSWR from 'swr';
import { Project, MediaType } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

// Local file API types (matching the new API structure)
interface LocalProjectFile {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'code' | 'other';
  path: string;
  size: number;
  lastModified: string;
}

interface LocalProjectFilesResponse {
  projectId: string;
  files: LocalProjectFile[];
  total: number;
}

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Helper function to determine media type for local files
function getMediaType(file: LocalProjectFile): MediaType {
  const { name, type } = file;
  const lowerName = name.toLowerCase();

  // Check for HTML files
  if (lowerName.includes('index.html') || lowerName.endsWith('.html')) {
    return 'html';
  }

  // Use the type from the API first
  if (type === 'video') {
    return 'video';
  }

  if (type === 'image') {
    return 'image';
  }

  // Check for YouTube/Vimeo links (if stored as text files with URLs)
  if (lowerName.includes('youtube') || lowerName.includes('vimeo')) {
    return lowerName.includes('youtube') ? 'youtube' : 'vimeo';
  }

  return 'unknown';
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
      return (
        <div ref={containerRef} className="w-full h-full">
          <iframe
            src={mediaItem.file.path}
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

  // Fetch project files
  const { data: filesData, error } = useSWR<LocalProjectFilesResponse>(
    project ? `/api/projects/${project.id}` : null,
    fetcher
  );

  // Process media items
  const mediaItems: LocalMediaItem[] = React.useMemo(() => {
    if (!filesData?.files) return [];

    return filesData.files
      .map((file): LocalMediaItem => {
        const type = getMediaType(file);
        let embedUrl: string | undefined;

        // For YouTube/Vimeo, we'd need to read the file content to get the URL
        // This is a simplified version - in practice, you might store URLs in project.json
        if (type === 'youtube' || type === 'vimeo') {
          embedUrl = file.path; // Use the file path for now
        }

        return { file, type, embedUrl };
      })
      .filter((item) => item.type !== 'unknown'); // Only show supported media types
  }, [filesData]);

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
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
                    {project.projectData?.title || project.name}
                  </Dialog.Title>
                  {project.projectData?.description && (
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {project.projectData.description}
                    </p>
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
                {error && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-red-600 dark:text-red-400">
                      <p className="text-lg mb-2">
                        Failed to load project files
                      </p>
                      <p className="text-sm">
                        {error.message || 'Unknown error occurred'}
                      </p>
                    </div>
                  </div>
                )}

                {!filesData && !error && (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                )}

                {filesData && mediaItems.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <p className="text-lg mb-2">No media files found</p>
                      <p className="text-sm">
                        This project doesn&apos;t contain any viewable media.
                      </p>
                    </div>
                  </div>
                )}

                {currentMedia && (
                  <div className="h-full">
                    <MediaPlayer
                      mediaItem={currentMedia}
                      isFullscreen={isFullscreen}
                    />
                  </div>
                )}
              </div>

              {/* Media navigation */}
              {mediaItems.length > 1 && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">
                      {currentMediaIndex + 1} of {mediaItems.length}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentMediaIndex(Math.max(0, currentMediaIndex - 1))
                      }
                      disabled={currentMediaIndex === 0}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Previous
                    </button>

                    <button
                      onClick={() =>
                        setCurrentMediaIndex(
                          Math.min(mediaItems.length - 1, currentMediaIndex + 1)
                        )
                      }
                      disabled={currentMediaIndex === mediaItems.length - 1}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                    >
                      Next
                    </button>
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
