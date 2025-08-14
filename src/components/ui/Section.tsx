import * as React from 'react';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string; // for skip links
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: keyof JSX.IntrinsicElements; // allow semantic tag override
  noContainer?: boolean; // allow opting out of container
  top?: boolean; // remove top padding when true
  bottom?: boolean; // remove bottom padding when true
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      containerSize = 'xl',
      as = 'section',
      noContainer = false,
      className,
      children,
      top,
      bottom,
      ...props
    },
    ref
  ) => {
    const Tag = as as any;
    const paddingY = [
      top ? '' : 'pt-12 sm:pt-16',
      bottom ? '' : 'pb-12 sm:pb-16',
    ]
      .filter(Boolean)
      .join(' ');

    const content = noContainer ? (
      children
    ) : (
      <Container size={containerSize}>{children}</Container>
    );

    return (
      <Tag
        id={id}
        ref={ref as any}
        className={[paddingY, className ?? ''].filter(Boolean).join(' ')}
        {...props}
      >
        {content}
      </Tag>
    );
  }
);
Section.displayName = 'Section';

export default Section;
