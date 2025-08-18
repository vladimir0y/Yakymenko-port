'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface AnimatedAvatarProps {
  className?: string;
  width: number;
  height: number;
  alt: string;
}

export default function AnimatedAvatar({ width, height, alt }: AnimatedAvatarProps) {
  // Just the 2 available avatars
  const avatars = [
    '/avatar/Avatar1.gif',
    '/avatar/Avatar2.gif'
  ];

  // Start with the first avatar
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cycle between the 2 avatars every 5 seconds
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % avatars.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [avatars.length]);

  return (
    <div className="relative w-full h-full">
      <Image
        src={avatars[currentIndex]}
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
