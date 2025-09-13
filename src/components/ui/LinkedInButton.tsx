"use client";

import React from "react";

type Variant = "brand" | "outline" | "neutral";
type Size = "sm" | "md" | "lg";

interface LinkedInButtonProps {
  href: string;
  label?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

function LinkedInOutlineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zM8.339 18.339H5.661V9.661h2.678v8.678zm-1.339-9.905a1.552 1.552 0 110-3.104 1.552 1.552 0 010 3.104zM18.339 18.339h-2.678v-4.205c0-1.004-.018-2.293-1.398-2.293-1.399 0-1.613 1.094-1.613 2.223v4.275h-2.678V9.661h2.571v1.185h.035c.358-.68 1.228-1.398 2.527-1.398 2.704 0 3.206 1.779 3.206 4.092v4.8z" />
    </svg>
  );
}

export default function LinkedInButton({
  href,
  label = "LinkedIn",
  variant = "brand",
  size = "md",
  className = "",
  ariaLabel,
  target = "_blank",
  rel = "noopener noreferrer",
}: LinkedInButtonProps) {
  const sizes: Record<Size, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-7 py-3.5 text-base",
  };

  const base = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const brand = "bg-[#0A66C2] text-white hover:bg-[#0956a8] focus-visible:ring-[#0A66C2] border border-transparent";
  const outline = "text-[#0A66C2] border border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 focus-visible:ring-[#0A66C2]";
  const neutral = "border border-border text-foreground hover:bg-muted/40 focus-visible:ring-primary-600";

  const variantClass = variant === "brand" ? brand : variant === "outline" ? outline : neutral;

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel || `Open ${label}`}
      className={`${base} ${sizes[size]} ${variantClass} ${className}`}
    >
      <LinkedInOutlineIcon className={iconSize} />
      <span>{label}</span>
    </a>
  );
}