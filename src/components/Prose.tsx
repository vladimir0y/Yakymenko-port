import React from 'react';

type ProseProps = React.HTMLAttributes<HTMLDivElement>;

export default function Prose({ className = '', ...props }: ProseProps) {
  // Lightweight prose styles without relying on the typography plugin
  return <div className={`prose-custom ${className}`} {...props} />;
}
