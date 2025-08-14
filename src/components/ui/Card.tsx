import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
}

const base =
  'rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden';

// Layered shadow for depth
const shadow = 'shadow-sm shadow-black/5 dark:shadow-black/20';
const shadowLift =
  'transition-transform motion-safe:transition-transform motion-safe:duration-200 hover:scale-105 hover:shadow-lg';

const glassy =
  'backdrop-blur supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:dark:bg-slate-900/40 supports-[backdrop-filter]:border-white/20';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = true, hover = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          base,
          shadow,
          hover ? shadowLift : '',
          glass ? glassy : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export default Card;
