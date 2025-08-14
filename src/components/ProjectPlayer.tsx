"use client";

import React, { useRef, useState } from 'react';

export default function ProjectPlayer({
  src,
  title,
  openUrl,
  fallbackSrc,
}: {
  src: string;
  title: string;
  openUrl?: string;
  fallbackSrc?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Try primary src, then fallback if primary 404s (same-origin static files)
  React.useEffect(() => {
    let cancelled = false;
    async function chooseSrc() {
      setCurrentSrc(src);
      // Only attempt HEAD checks for relative URLs (same-origin)
      const isAbsolute = /^(https?:)?\/\//i.test(src);
      const tryHead = async (url: string) => {
        try {
          const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
          return res.ok;
        } catch {
          return false;
        }
      };
      if (!isAbsolute) {
        const ok = await tryHead(src);
        if (!ok && fallbackSrc) {
          const okAlt = await tryHead(fallbackSrc);
          if (okAlt && !cancelled) setCurrentSrc(fallbackSrc);
        }
      }
    }
    chooseSrc();
    return () => {
      cancelled = true;
    };
  }, [src, fallbackSrc]);

  const toggleFullscreen = () => {
    const el = (iframeRef.current as any) || (containerRef.current as any);
    if (!document.fullscreenElement) {
      if (el && typeof el.requestFullscreen === 'function') {
        el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {
          containerRef.current?.requestFullscreen?.();
          setIsFullscreen(true);
        });
      } else if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          Embedded preview
        </div>
        <div className="flex items-center gap-2">
          {openUrl && (
            <a
              href={openUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-2.5 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              aria-label="Open in new tab"
            >
              Open in new tab
            </a>
          )}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="text-xs px-2.5 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="w-full aspect-[16/10] md:aspect-[16/9] border border-zinc-200/70 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900"
      >
        <iframe
          ref={iframeRef}
          src={currentSrc}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}

