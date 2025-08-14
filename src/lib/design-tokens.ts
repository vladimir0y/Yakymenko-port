import { clsx, type ClassValue } from 'clsx';
import type {
  ThemeMode,
  ComponentSize,
  ComponentVariant,
  FluidFontSize,
  FluidSize,
  GradientType,
} from '../types/design-tokens';

/**
 * Utility function to combine class names
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Get CSS custom property value
 */
export function getCSSCustomProperty(property: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(property);
}

/**
 * Set CSS custom property value
 */
export function setCSSCustomProperty(property: string, value: string): void {
  if (typeof window === 'undefined') return;
  document.documentElement.style.setProperty(property, value);
}

/**
 * Theme management utilities
 */
export const themeUtils = {
  /**
   * Get current theme mode
   */
  getCurrentTheme(): ThemeMode {
    if (typeof window === 'undefined') return 'light';

    const stored = localStorage.getItem('theme') as ThemeMode;
    if (stored) return stored;

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  },

  /**
   * Set theme mode
   */
  setTheme(mode: ThemeMode): void {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    if (mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
      localStorage.removeItem('theme');
    } else {
      root.classList.toggle('dark', mode === 'dark');
      localStorage.setItem('theme', mode);
    }
  },

  /**
   * Toggle between light and dark modes
   */
  toggleTheme(): void {
    const current = this.getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  },

  /**
   * Initialize theme on app load
   */
  initializeTheme(): void {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('theme') as ThemeMode;

    if (
      stored === 'dark' ||
      (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    }
  },
};

/**
 * Component variant utilities
 */
export const variantUtils = {
  /**
   * Get button variant classes
   */
  getButtonVariant(
    variant: ComponentVariant = 'default',
    size: ComponentSize = 'md'
  ): string {
    const baseClasses =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const sizeClasses = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8',
      xl: 'h-12 px-10',
    };

    const variantClasses = {
      default: 'bg-primary-500 text-white hover:bg-primary-600',
      primary: 'bg-primary-500 text-white hover:bg-primary-600',
      secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
      accent: 'bg-accent-500 text-white hover:bg-accent-600',
      ghost: 'bg-transparent hover:bg-muted text-foreground',
      outline:
        'bg-transparent border border-border hover:bg-muted text-foreground',
    };

    return cn(baseClasses, sizeClasses[size], variantClasses[variant]);
  },

  /**
   * Get input variant classes
   */
  getInputVariant(
    variant: 'default' | 'error' | 'success' = 'default'
  ): string {
    const baseClasses =
      'flex h-10 w-full rounded-md border bg-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const variantClasses = {
      default: 'border-border',
      error: 'border-red-500 focus:ring-red-500',
      success: 'border-green-500 focus:ring-green-500',
    };

    return cn(baseClasses, variantClasses[variant]);
  },
};

/**
 * Responsive utilities
 */
export const responsiveUtils = {
  /**
   * Get responsive text size classes
   */
  getResponsiveText(size: FluidFontSize): string {
    return `text-${size}`;
  },

  /**
   * Get responsive spacing classes
   */
  getResponsiveSpacing(
    size: FluidSize,
    property:
      | 'p'
      | 'm'
      | 'px'
      | 'py'
      | 'pt'
      | 'pb'
      | 'pl'
      | 'pr'
      | 'mx'
      | 'my'
      | 'mt'
      | 'mb'
      | 'ml'
      | 'mr' = 'p'
  ): string {
    return `${property}-${size}`;
  },

  /**
   * Generate responsive breakpoint classes
   */
  getBreakpointClasses(classes: Record<string, string>): string {
    return Object.entries(classes)
      .map(([breakpoint, className]) => {
        if (breakpoint === 'base') return className;
        return `${breakpoint}:${className}`;
      })
      .join(' ');
  },
};

/**
 * Animation utilities
 */
export const animationUtils = {
  /**
   * Create staggered animation delays
   */
  getStaggerDelay(index: number, baseDelay: number = 100): string {
    return `style="animation-delay: ${index * baseDelay}ms"`;
  },

  /**
   * Get animation class with custom duration
   */
  getAnimationWithDuration(animation: string, duration: number): string {
    return `${animation} duration-${duration}`;
  },
};

/**
 * Color utilities
 */
export const colorUtils = {
  /**
   * Convert RGB values to CSS rgb() function
   */
  rgbToCss(r: number, g: number, b: number, alpha?: number): string {
    if (alpha !== undefined) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  },

  /**
   * Get color with opacity
   */
  getColorWithOpacity(colorVar: string, opacity: number): string {
    return `rgb(var(${colorVar}) / ${opacity})`;
  },

  /**
   * Generate gradient background
   */
  getGradient(type: GradientType): string {
    return `bg-${type}`;
  },
};

/**
 * Layout utilities
 */
export const layoutUtils = {
  /**
   * Get container classes with fluid padding
   */
  getContainer(
    maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' = 'xl'
  ): string {
    const maxWidthClasses = {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      '2xl': 'max-w-8xl',
      full: 'max-w-full',
    };

    return cn(
      'w-full mx-auto px-fluid-sm sm:px-fluid-md lg:px-fluid-lg',
      maxWidthClasses[maxWidth]
    );
  },

  /**
   * Get section padding classes
   */
  getSectionPadding(size: 'sm' | 'md' | 'lg' = 'md'): string {
    const sizeClasses = {
      sm: 'py-fluid-lg',
      md: 'py-fluid-xl lg:py-fluid-2xl',
      lg: 'py-fluid-2xl lg:py-32',
    };

    return sizeClasses[size];
  },
};

/**
 * Typography utilities
 */
export const typographyUtils = {
  /**
   * Get heading classes
   */
  getHeading(level: 1 | 2 | 3 | 4 | 5 | 6, className?: string): string {
    const levelClasses = {
      1: 'text-fluid-5xl font-display font-bold tracking-tight',
      2: 'text-fluid-4xl font-display font-semibold tracking-tight',
      3: 'text-fluid-3xl font-display font-semibold tracking-tight',
      4: 'text-fluid-2xl font-display font-semibold',
      5: 'text-fluid-xl font-display font-medium',
      6: 'text-fluid-lg font-display font-medium',
    };

    return cn(levelClasses[level], className);
  },

  /**
   * Get body text classes
   */
  getBodyText(size: 'sm' | 'base' | 'lg' = 'base', className?: string): string {
    const sizeClasses = {
      sm: 'text-fluid-sm',
      base: 'text-fluid-base',
      lg: 'text-fluid-lg',
    };

    return cn(sizeClasses[size], 'leading-relaxed', className);
  },

  /**
   * Get text gradient classes
   */
  getTextGradient(
    from: string = 'primary-600',
    to: string = 'secondary-600'
  ): string {
    return `bg-gradient-to-r from-${from} to-${to} bg-clip-text text-transparent`;
  },
};

// Export all utilities as a single object for easier importing
export const designTokens = {
  theme: themeUtils,
  variant: variantUtils,
  responsive: responsiveUtils,
  animation: animationUtils,
  color: colorUtils,
  layout: layoutUtils,
  typography: typographyUtils,
  cn,
};
