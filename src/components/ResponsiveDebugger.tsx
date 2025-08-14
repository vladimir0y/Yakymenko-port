'use client';

import { useEffect, useState } from 'react';

interface BreakpointInfo {
  name: string;
  minWidth: number;
  maxWidth?: number;
  active: boolean;
}

const breakpoints: BreakpointInfo[] = [
  { name: 'XS', minWidth: 0, maxWidth: 639, active: false },
  { name: 'SM', minWidth: 640, maxWidth: 767, active: false },
  { name: 'MD', minWidth: 768, maxWidth: 1023, active: false },
  { name: 'LG', minWidth: 1024, maxWidth: 1279, active: false },
  { name: 'XL', minWidth: 1280, maxWidth: 1535, active: false },
  { name: '2XL', minWidth: 1536, active: false },
];

export interface ResponsiveDebuggerProps {
  showInProduction?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  detailed?: boolean;
}

export default function ResponsiveDebugger({
  showInProduction = false,
  position = 'top-left',
  detailed = false,
}: ResponsiveDebuggerProps) {
  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<BreakpointInfo | null>(null);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development unless explicitly enabled for production
    if (process.env.NODE_ENV === 'production' && !showInProduction) {
      return;
    }

    setIsVisible(true);

    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({ width, height });

      const activeBreakpoint = breakpoints.find((bp) => {
        if (bp.maxWidth) {
          return width >= bp.minWidth && width <= bp.maxWidth;
        } else {
          return width >= bp.minWidth;
        }
      });

      setCurrentBreakpoint(activeBreakpoint || null);
    };

    // Initial check
    updateBreakpoint();

    // Listen for resize
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, [showInProduction]);

  if (!isVisible || !currentBreakpoint) {
    return null;
  }

  const positionClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
  };

  const getBreakpointColor = (name: string) => {
    switch (name) {
      case 'XS':
        return 'bg-red-500';
      case 'SM':
        return 'bg-orange-500';
      case 'MD':
        return 'bg-yellow-500';
      case 'LG':
        return 'bg-green-500';
      case 'XL':
        return 'bg-blue-500';
      case '2XL':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      className={`
        fixed z-[9999] ${positionClasses[position]}
        ${getBreakpointColor(currentBreakpoint.name)} 
        text-white text-xs font-mono rounded px-2 py-1
        pointer-events-none select-none
        shadow-lg border border-white/20
        ${detailed ? 'space-y-1' : ''}
      `}
      role="status"
      aria-live="polite"
      aria-label={`Current breakpoint: ${currentBreakpoint.name}`}
    >
      <div className="flex items-center space-x-2">
        <span className="font-bold">{currentBreakpoint.name}</span>
        {detailed && (
          <span className="opacity-80">
            {screenSize.width} × {screenSize.height}
          </span>
        )}
      </div>

      {detailed && (
        <div className="text-[10px] opacity-70 space-y-0.5">
          <div>Min: {currentBreakpoint.minWidth}px</div>
          {currentBreakpoint.maxWidth && (
            <div>Max: {currentBreakpoint.maxWidth}px</div>
          )}
        </div>
      )}
    </div>
  );
}

// Utility hook for responsive logic
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<string>('');
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({ width, height });

      let currentBp = 'xs';
      if (width >= 1536) currentBp = '2xl';
      else if (width >= 1280) currentBp = 'xl';
      else if (width >= 1024) currentBp = 'lg';
      else if (width >= 768) currentBp = 'md';
      else if (width >= 640) currentBp = 'sm';

      setBreakpoint(currentBp);
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint,
    screenSize,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2xl: breakpoint === '2xl',
    isMobile: ['xs', 'sm'].includes(breakpoint),
    isTablet: breakpoint === 'md',
    isDesktop: ['lg', 'xl', '2xl'].includes(breakpoint),
  };
}

// Test component for different breakpoints
export function ResponsiveTestGrid() {
  const { breakpoint } = useBreakpoint();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Responsive Test Grid</h2>
      <p className="text-muted-foreground">
        Current breakpoint:{' '}
        <span className="font-mono font-bold">{breakpoint}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="bg-primary-100 dark:bg-primary-900/20 p-4 rounded-lg border border-primary-200 dark:border-primary-800"
          >
            <div className="font-mono text-sm">Item {i + 1}</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="block sm:hidden">XS</span>
              <span className="hidden sm:block md:hidden">SM</span>
              <span className="hidden md:block lg:hidden">MD</span>
              <span className="hidden lg:block xl:hidden">LG</span>
              <span className="hidden xl:block 2xl:hidden">XL</span>
              <span className="hidden 2xl:block">2XL</span>
            </div>
          </div>
        ))}
      </div>

      {/* Typography scaling test */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Typography Scaling Test</h3>
        <div className="space-y-2">
          <h1 className="text-fluid-6xl font-bold">Fluid H1 Title</h1>
          <h2 className="text-fluid-5xl font-bold">Fluid H2 Title</h2>
          <h3 className="text-fluid-4xl font-bold">Fluid H3 Title</h3>
          <h4 className="text-fluid-3xl font-bold">Fluid H4 Title</h4>
          <p className="text-fluid-base">
            This is fluid base text that scales smoothly across breakpoints.
          </p>
          <p className="text-fluid-sm text-muted-foreground">
            This is fluid small text for captions and secondary information.
          </p>
        </div>
      </div>

      {/* Spacing test */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Spacing Test</h3>
        <div className="space-y-fluid-sm">
          <div className="bg-accent-100 dark:bg-accent-900/20 p-fluid-xs rounded">
            Fluid XS padding
          </div>
          <div className="bg-accent-100 dark:bg-accent-900/20 p-fluid-sm rounded">
            Fluid SM padding
          </div>
          <div className="bg-accent-100 dark:bg-accent-900/20 p-fluid-md rounded">
            Fluid MD padding
          </div>
          <div className="bg-accent-100 dark:bg-accent-900/20 p-fluid-lg rounded">
            Fluid LG padding
          </div>
        </div>
      </div>
    </div>
  );
}
