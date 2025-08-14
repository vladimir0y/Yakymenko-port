import React from 'react';

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Prose({ className = '', ...props }: ProseProps) {
  // Lightweight prose styles without relying on the typography plugin
  return <div className={`prose-custom ${className}`} {...props} />;
}
