import * as React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string; // for skip links
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const maxWidthBySize = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
} as const;

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ id, size = 'xl', className, children, ...props }, ref) => {
    return (
      <div
        id={id}
        ref={ref}
        className={[
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          maxWidthBySize[size],
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
Container.displayName = 'Container';

export default Container;
