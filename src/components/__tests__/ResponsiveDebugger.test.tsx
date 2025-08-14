import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResponsiveDebugger from '../ResponsiveDebugger';

function setViewport(width: number, height: number) {
  // jsdom only: simulate resize by overriding innerWidth/innerHeight
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
}

describe('ResponsiveDebugger', () => {
  it('does not render in production by default', () => {
    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    const { container } = render(<ResponsiveDebugger />);
    expect(container.firstChild).toBeNull();
    process.env.NODE_ENV = original;
  });

  it('renders at different breakpoints in dev', () => {
    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    setViewport(500, 800); // XS
    const { rerender } = render(
      <ResponsiveDebugger showInProduction detailed />
    );
    expect(screen.getByRole('status')).toBeInTheDocument();

    setViewport(1024, 800); // LG
    rerender(<ResponsiveDebugger detailed />);
    expect(screen.getByRole('status')).toBeInTheDocument();

    process.env.NODE_ENV = original;
  });
});
