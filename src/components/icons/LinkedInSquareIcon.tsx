"use client";

import React from "react";

export default function LinkedInSquareIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 27 27"
      className={className}
      aria-hidden="true"
    >
      {/* Outer rounded-square border as thin stroke for better small-size rendering */}
      <rect
        x="1.2"
        y="1.2"
        width="24.6"
        height="24.6"
        rx="3.6"
        ry="3.6"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        shapeRendering="geometricPrecision"
      />
      {/* IN glyph */}
      <path d="M19.3641 21.5156H21.5156V14.7234C21.5156 13.8797 21.4734 13.2047 21.3469 12.7406C21.2625 12.3188 21.0516 11.9391 20.7984 11.6016C20.5453 11.2641 20.1656 11.0109 19.6594 10.8C19.1531 10.5891 18.5625 10.4625 17.9297 10.4625C16.4953 10.4625 15.3141 11.0531 14.3859 12.2766C14.2594 12.4031 14.0906 12.4875 13.9219 12.4031C13.7531 12.3609 13.6266 12.1922 13.6266 12.0234V10.7156H11.475V21.5156H14.2594V16.7906C14.2594 15.4406 14.3438 14.5547 14.5125 14.0484C14.6813 13.5 15.0188 13.0359 15.4828 12.6984C15.9469 12.3609 16.4953 12.1922 17.0859 12.1922C17.55 12.1922 17.9719 12.3187 18.3516 12.5719C18.6891 12.825 18.9422 13.1625 19.1109 13.6266C19.1953 13.8797 19.3219 14.4281 19.3219 16.1578V21.5156H19.3641Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.48438 21.5156H7.63594V10.7156H5.48438V21.5156Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6.58125" cy="6.49687" r="1.0125" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  );
}
