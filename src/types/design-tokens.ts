// Design token types for better TypeScript support

export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
};

export type ColorPalette = {
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
};

export type BaseColors = {
  background: string;
  foreground: string;
  muted: {
    DEFAULT: string;
    foreground: string;
  };
  border: string;
  input: string;
  ring: string;
};

export type FluidSize =
  | 'fluid-xs'
  | 'fluid-sm'
  | 'fluid-md'
  | 'fluid-lg'
  | 'fluid-xl'
  | 'fluid-2xl';

export type FluidFontSize =
  | 'fluid-xs'
  | 'fluid-sm'
  | 'fluid-base'
  | 'fluid-lg'
  | 'fluid-xl'
  | 'fluid-2xl'
  | 'fluid-3xl'
  | 'fluid-4xl'
  | 'fluid-5xl'
  | 'fluid-6xl';

export type FontFamily = 'sans' | 'mono' | 'display';

export type GradientType =
  | 'gradient-radial'
  | 'gradient-conic'
  | 'gradient-primary'
  | 'gradient-secondary'
  | 'gradient-accent'
  | 'gradient-hero';

export type AnimationType =
  | 'animate-fade-in'
  | 'animate-slide-up'
  | 'animate-slide-in-left'
  | 'animate-slide-in-right';

// Theme configuration interface
export interface ThemeConfig {
  colors: ColorPalette & BaseColors;
  fontSizes: Record<FluidFontSize, string>;
  spacing: Record<FluidSize, string>;
  fontFamily: Record<FontFamily, string[]>;
  backgroundImage: Record<GradientType, string>;
}

// CSS Custom Properties interface
export interface CSSCustomProperties {
  // Color properties
  '--color-primary-50': string;
  '--color-primary-100': string;
  '--color-primary-200': string;
  '--color-primary-300': string;
  '--color-primary-400': string;
  '--color-primary-500': string;
  '--color-primary-600': string;
  '--color-primary-700': string;
  '--color-primary-800': string;
  '--color-primary-900': string;
  '--color-primary-950': string;

  '--color-secondary-50': string;
  '--color-secondary-100': string;
  '--color-secondary-200': string;
  '--color-secondary-300': string;
  '--color-secondary-400': string;
  '--color-secondary-500': string;
  '--color-secondary-600': string;
  '--color-secondary-700': string;
  '--color-secondary-800': string;
  '--color-secondary-900': string;
  '--color-secondary-950': string;

  '--color-accent-50': string;
  '--color-accent-100': string;
  '--color-accent-200': string;
  '--color-accent-300': string;
  '--color-accent-400': string;
  '--color-accent-500': string;
  '--color-accent-600': string;
  '--color-accent-700': string;
  '--color-accent-800': string;
  '--color-accent-900': string;
  '--color-accent-950': string;

  '--color-background': string;
  '--color-foreground': string;
  '--color-muted': string;
  '--color-muted-foreground': string;
  '--color-border': string;
  '--color-input': string;
  '--color-ring': string;

  // Font properties
  '--font-sans': string;
  '--font-mono': string;
  '--font-display': string;
}

// Utility type for Tailwind CSS classes with our custom design tokens
export type TailwindClassNames =
  | `text-${keyof ColorScale}`
  | `bg-${keyof ColorScale}`
  | `border-${keyof ColorScale}`
  | `text-${FluidFontSize}`
  | `p-${FluidSize}`
  | `m-${FluidSize}`
  | `gap-${FluidSize}`
  | `font-${FontFamily}`
  | `bg-${GradientType}`
  | AnimationType;

// Theme mode type
export type ThemeMode = 'light' | 'dark' | 'system';

// Component variant types for consistent design
export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl';
export type ComponentVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'outline';

export interface ComponentProps {
  size?: ComponentSize;
  variant?: ComponentVariant;
  className?: string;
}

// Responsive breakpoint types
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Spacing scale type
export type SpacingScale =
  | '0'
  | 'px'
  | '0.5'
  | '1'
  | '1.5'
  | '2'
  | '2.5'
  | '3'
  | '3.5'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '14'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '36'
  | '40'
  | '44'
  | '48'
  | '52'
  | '56'
  | '60'
  | '64'
  | '72'
  | '80'
  | '96'
  | FluidSize;
