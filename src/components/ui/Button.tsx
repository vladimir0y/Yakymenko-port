import * as React from 'react';
import { LazyMotion, domAnimation, m, type MotionProps } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    MotionProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200';

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-600',
  secondary:
    'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-600',
  ghost:
    'bg-transparent text-foreground hover:bg-muted/60 border border-transparent hover:border-border focus-visible:ring-accent-500',
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={['animate-spin', className ?? ''].filter(Boolean).join(' ')}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'ghost',
      size = 'md',
      loading = false,
      startIcon,
      endIcon,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
      <LazyMotion features={domAnimation} strict>
        <m.button
          ref={ref}
          className={[
            baseClasses,
            sizeClasses[size],
            variantClasses[variant],
            loading ? 'relative' : '',
            className ?? '',
          ]
            .filter(Boolean)
            .join(' ')}
          disabled={isDisabled}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          {...props}
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Spinner className="h-4 w-4" />
              <span className="opacity-90">Loading...</span>
            </span>
          ) : (
            <>
              {startIcon ? (
                <span className="inline-flex items-center">{startIcon}</span>
              ) : null}
              <span>{children}</span>
              {endIcon ? (
                <span className="inline-flex items-center">{endIcon}</span>
              ) : null}
            </>
          )}
        </m.button>
      </LazyMotion>
    );
  }
);
Button.displayName = 'Button';

export default Button;
