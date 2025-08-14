import React, {
  ElementType,
  ComponentPropsWithoutRef,
  forwardRef,
} from 'react';

// Small className utility that avoids bringing extra deps
function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ');
}

// Polymorphic types
type AsProp<C extends ElementType> = { as?: C };

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicComponentProps<
  C extends ElementType,
  Props = {},
> = Props &
  AsProp<C> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

// Variants shared between components
type Variant = 'default' | 'accent' | 'subtle';

function variantClasses(variant: Variant) {
  switch (variant) {
    case 'accent':
      return 'text-blue-600 dark:text-blue-400';
    case 'subtle':
      return 'text-zinc-600 dark:text-zinc-400';
    default:
      return '';
  }
}

// Headings factory
interface HeadingOwnProps {
  variant?: Variant;
  className?: string;
}

function createHeading<C extends ElementType>(
  defaultAs: C,
  sizeClasses: string
) {
  type Props = PolymorphicComponentProps<C, HeadingOwnProps>;

  const Heading = forwardRef<PolymorphicRef<C>, Props>(function Heading(
    { as, className, variant = 'default', ...rest }: Props,
    ref
  ) {
    const Component = (as ?? defaultAs) as ElementType;
    return (
      <Component
        ref={ref as any}
        className={cn(
          // Tight leading for headings and slightly tighter tracking
          'font-semibold tracking-tight leading-tight', // base
          sizeClasses,
          variantClasses(variant),
          className
        )}
        {...(rest as any)}
      />
    );
  });

  return Heading;
}

// Fluid sizes using clamp()
// You can tune these to match your system scale
export const H1 = createHeading(
  'h1',
  'text-[clamp(2.25rem,2.5vw+1rem,3.5rem)]'
);
export const H2 = createHeading(
  'h2',
  'text-[clamp(1.875rem,2vw+0.75rem,2.75rem)]'
);
export const H3 = createHeading(
  'h3',
  'text-[clamp(1.5rem,1.5vw+0.5rem,2.25rem)]'
);
export const H4 = createHeading(
  'h4',
  'text-[clamp(1.25rem,1vw+0.5rem,1.875rem)]'
);
export const H5 = createHeading(
  'h5',
  'text-[clamp(1.125rem,0.75vw+0.5rem,1.5rem)]'
);
export const H6 = createHeading(
  'h6',
  'text-[clamp(1rem,0.5vw+0.5rem,1.25rem)]'
);

// Body Text
interface TextOwnProps {
  variant?: Variant;
  className?: string;
}

export const Text = forwardRef<
  PolymorphicRef<'p'>,
  PolymorphicComponentProps<'p', TextOwnProps>
>(function Text({ as, className, variant = 'default', ...rest }, ref) {
  const Component = (as ?? 'p') as ElementType;
  return (
    <Component
      ref={ref as any}
      className={cn(
        // Comfortable reading length
        'leading-[1.7] text-[clamp(1rem,0.3vw+0.9rem,1.125rem)]',
        variantClasses(variant),
        className
      )}
      {...(rest as any)}
    />
  );
});

// Prose wrapper
interface ProseOwnProps {
  className?: string;
  size?: 'sm' | 'base' | 'lg';
}

export const Prose = forwardRef<
  PolymorphicRef<'div'>,
  PolymorphicComponentProps<'div', ProseOwnProps>
>(function Prose({ as, className, size = 'base', ...rest }, ref) {
  const Component = (as ?? 'div') as ElementType;
  const sizeClass =
    size === 'sm' ? 'prose-sm' : size === 'lg' ? 'prose-lg' : '';

  return (
    <Component
      ref={ref as any}
      className={cn(
        // Base prose styles with dark mode tweaks
        'prose prose-zinc dark:prose-invert',
        // Make links readable in both modes
        'prose-a:text-blue-600 dark:prose-a:text-blue-400',
        // Tighter headings inside prose
        'prose-headings:tracking-tight prose-headings:leading-tight',
        // Images and tables niceties
        'prose-img:rounded-md prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800',
        // Code blocks
        "prose-code:before:content-[''] prose-code:after:content-['']",
        sizeClass,
        className
      )}
      {...(rest as any)}
    />
  );
});
