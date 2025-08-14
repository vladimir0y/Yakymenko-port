import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section } from '../ui/Section';

describe('Section', () => {
  it('renders with default container and padding', () => {
    render(
      <Section>
        <div>Content</div>
      </Section>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('supports semantic element override and noContainer', () => {
    const { container } = render(
      <Section as="article" noContainer className="custom">
        <div>Inner</div>
      </Section>
    );

    const article = container.querySelector('article');
    expect(article).toBeTruthy();
    expect(screen.getByText('Inner')).toBeInTheDocument();
  });
});
