import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Prose from '../Prose';

describe('Prose', () => {
  it('renders children and applies custom classes', () => {
    const { container } = render(
      <Prose className="custom-class">
        <p>Hello</p>
      </Prose>
    );

    expect(container.firstChild).toHaveClass('prose-custom');
    expect(container.firstChild).toHaveClass('custom-class');
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
