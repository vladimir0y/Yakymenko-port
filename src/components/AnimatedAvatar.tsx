'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

interface AnimatedAvatarProps {
  className?: string;
  width: number;
  height: number;
  alt: string;
}

export default function AnimatedAvatar({ width, height, alt }: AnimatedAvatarProps) {
  // The 2 avatar files we have locally and synced to GitHub
  const avatars = useMemo(() => [
    '/avatar/Avatar1.gif',
    '/avatar/Avatar2.gif'
  ] as const, []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Preload all avatars
  useEffect(() => {
    const preloadImages = async () => {
      const promises = avatars.map(src => {
        return new Promise<string>((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => resolve(src);
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        const loaded = await Promise.all(promises);
        setLoadedImages(new Set(loaded));
        setIsLoading(false);
      } catch (error) {
        console.warn('Some avatars failed to load:', error);
        // Still show content even if some images fail
        setIsLoading(false);
      }
    };

    preloadImages();
  }, [avatars]);

  // Start animation cycle once images are loaded
  useEffect(() => {
    const displayAvatars = avatars.filter(src => loadedImages.has(src));
    if (!isLoading && displayAvatars.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % displayAvatars.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isLoading, loadedImages, avatars]);

  if (isLoading) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src="/avatar/preloader.png"
          alt="Loading avatar..."
          width={width}
          height={height}
          className="w-full h-full"
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={(Array.from(loadedImages).length ? Array.from(loadedImages) : avatars)[currentIndex % (Array.from(loadedImages).length || avatars.length)]}
        alt={alt}
        width={width}
        height={height}
        priority
        unoptimized={true} // Important for animated GIFs
        className="w-full h-full transition-all duration-700 ease-in-out"
        style={{
          objectFit: 'contain',
          objectPosition: 'center',
        }}
      />
    </div>
  );
}
