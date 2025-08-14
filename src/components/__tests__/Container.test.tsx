import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from '../ui/Container';

describe('Container', () => {
  it('applies size classes and renders children', () => {
    const { container } = render(
      <Container size="lg" className="custom">
        <div>Child</div>
      </Container>
    );

    expect(screen.getByText('Child')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('max-w-screen-lg');
  });
});
