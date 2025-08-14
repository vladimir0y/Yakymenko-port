"use client";

import React from 'react';

export default function ProjectPlayer({
  src,
  title,
  openUrl,
}: {
  src: string;
  title: string;
  openUrl?: string;
}) {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          Embedded preview
        </div>
        {openUrl && (
          <a
            href={openUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-2.5 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            Open in new tab
          </a>
        )}
      </div>
      <div className="w-full aspect-[16/10] md:aspect-[16/9] border border-zinc-200/70 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900">
        <iframe
          src={src}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}

