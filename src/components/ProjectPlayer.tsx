"use client";

import React, { useRef, useState } from 'react';

export default function ProjectPlayer({
  src,
  title,
  openUrl,
  fallbackSrc,
  fallbackSrcs,
}: {
  src: string;
  title: string;
  openUrl?: string;
  fallbackSrc?: string; // deprecated in favor of fallbackSrcs
  fallbackSrcs?: string[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Try primary src, then fallbacks until one responds OK (same-origin static files)
  React.useEffect(() => {
    let cancelled = false;

    const candidates: string[] = [
      src,
      ...(fallbackSrc ? [fallbackSrc] : []),
      ...(fallbackSrcs || []),
    ].filter(Boolean) as string[];

    async function chooseSrc() {
      // Default to first candidate immediately to avoid blank iframe
      setCurrentSrc(candidates[0]);

      // Only attempt HEAD checks for relative URLs (same-origin)
      const isAbsolute = (url: string) => /^(https?:)?\/\//i.test(url);
      const tryHead = async (url: string) => {
        try {
          const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        	  return res.ok;
        } catch {
          return false;
        }
      };

      for (const url of candidates) {
        if (cancelled) return;
        if (isAbsolute(url)) {
          // Can't HEAD cross-origin reliably without CORS; just pick first absolute and stop.
          setCurrentSrc(url);
          return;
        }
        const ok = await tryHead(url);
        if (ok) {
          if (!cancelled) setCurrentSrc(url);
          return;
        }
      }
      // If none worked, keep the first; the onload error will just reflect 404
    }

    chooseSrc();
    return () => {
      cancelled = true;
    };
  }, [src, fallbackSrc, JSON.stringify(fallbackSrcs || [])]);

  const toggleFullscreen = () => {
    const el = (iframeRef.current as any) || (containerRef.current as any);
    if (!document.fullscreenElement) {
      if (el && typeof el.requestFullscreen === 'function') {
        el
          .requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(() => {
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

