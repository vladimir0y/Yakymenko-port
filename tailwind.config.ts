import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: 'clamp(1rem, 3vw, 2rem)',
        sm: 'clamp(1rem, 3.5vw, 2.25rem)',
        md: 'clamp(1.25rem, 4vw, 2.5rem)',
        lg: 'clamp(1.5rem, 4.5vw, 3rem)',
        xl: 'clamp(2rem, 5vw, 4rem)',
      },
    },
    extend: {
      screens: {
        xs: '360px',
      },
      colors: {
        // Neutral gray scale 50 -> 950
        neutral: {
          50: colors.gray[50],
          100: colors.gray[100],
          200: colors.gray[200],
          300: colors.gray[300],
          400: colors.gray[400],
          500: colors.gray[500],
          600: colors.gray[600],
          700: colors.gray[700],
          800: colors.gray[800],
          900: colors.gray[900],
          950: colors.gray[950],
        },
        // Warm accent palette (amber/copper)
        accentWarm: {
          50: colors.amber[50],
          100: colors.amber[100],
          200: colors.amber[200],
          300: colors.amber[300],
          400: colors.amber[400],
          500: colors.amber[500],
          600: colors.amber[600],
          700: colors.amber[700],
          800: colors.amber[800],
          900: colors.amber[900],
          950: colors.amber[950],
        },
        // Existing CSS-variable-driven palettes
        primary: {
          50: 'rgb(var(--color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--color-primary-900) / <alpha-value>)',
          950: 'rgb(var(--color-primary-950) / <alpha-value>)',
        },
        secondary: {
          50: 'rgb(var(--color-secondary-50) / <alpha-value>)',
          100: 'rgb(var(--color-secondary-100) / <alpha-value>)',
          200: 'rgb(var(--color-secondary-200) / <alpha-value>)',
          300: 'rgb(var(--color-secondary-300) / <alpha-value>)',
          400: 'rgb(var(--color-secondary-400) / <alpha-value>)',
          500: 'rgb(var(--color-secondary-500) / <alpha-value>)',
          600: 'rgb(var(--color-secondary-600) / <alpha-value>)',
          700: 'rgb(var(--color-secondary-700) / <alpha-value>)',
          800: 'rgb(var(--color-secondary-800) / <alpha-value>)',
          900: 'rgb(var(--color-secondary-900) / <alpha-value>)',
          950: 'rgb(var(--color-secondary-950) / <alpha-value>)',
        },
        accent: {
          50: 'rgb(var(--color-accent-50) / <alpha-value>)',
          100: 'rgb(var(--color-accent-100) / <alpha-value>)',
          200: 'rgb(var(--color-accent-200) / <alpha-value>)',
          300: 'rgb(var(--color-accent-300) / <alpha-value>)',
          400: 'rgb(var(--color-accent-400) / <alpha-value>)',
          500: 'rgb(var(--color-accent-500) / <alpha-value>)',
          600: 'rgb(var(--color-accent-600) / <alpha-value>)',
          700: 'rgb(var(--color-accent-700) / <alpha-value>)',
          800: 'rgb(var(--color-accent-800) / <alpha-value>)',
          900: 'rgb(var(--color-accent-900) / <alpha-value>)',
          950: 'rgb(var(--color-accent-950) / <alpha-value>)',
        },
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        muted: {
          DEFAULT: 'rgb(var(--color-muted) / <alpha-value>)',
          foreground: 'rgb(var(--color-muted-foreground) / <alpha-value>)',
        },
        border: 'rgb(var(--color-border) / <alpha-value>)',
        input: 'rgb(var(--color-input) / <alpha-value>)',
        ring: 'rgb(var(--color-ring) / <alpha-value>)',
      },
      // Custom gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary':
          'linear-gradient(135deg, rgb(var(--color-primary-500)), rgb(var(--color-primary-700)))',
        'gradient-secondary':
          'linear-gradient(135deg, rgb(var(--color-secondary-500)), rgb(var(--color-secondary-700)))',
        'gradient-accent':
          'linear-gradient(135deg, rgb(var(--color-accent-500)), rgb(var(--color-accent-700)))',
        'gradient-hero':
          'linear-gradient(135deg, rgb(var(--color-primary-600)), rgb(var(--color-secondary-600)), rgb(var(--color-accent-600)))',
      },
      // Fluid typography using CSS variables (design tokens)
      fontSize: {
        'fluid-xs': 'var(--size-fluid-xs)',
        'fluid-sm': 'var(--size-fluid-sm)',
        'fluid-base': 'var(--size-fluid-base)',
        'fluid-lg': 'var(--size-fluid-lg)',
        'fluid-xl': 'var(--size-fluid-xl)',
        'fluid-2xl': 'var(--size-fluid-2xl)',
        'fluid-3xl': 'var(--size-fluid-3xl)',
        'fluid-4xl': 'var(--size-fluid-4xl)',
        'fluid-5xl': 'var(--size-fluid-5xl)',
        'fluid-6xl': 'var(--size-fluid-6xl)',
      },
      // Spacing derived from CSS variables (design tokens)
      spacing: {
        // Fluid container paddings (can be used ad-hoc as utilities)
        'container-xs': 'var(--space-container-xs)',
        'container-sm': 'var(--space-container-sm)',
        'container-md': 'var(--space-container-md)',
        'container-lg': 'var(--space-container-lg)',
        'container-xl': 'var(--space-container-xl)',
        // Material 3 4pt aliases (semantic helpers)
        'm3-1': 'var(--space-m3-1)', // 4px
        'm3-2': 'var(--space-m3-2)', // 8px
        'm3-3': 'var(--space-m3-3)', // 12px
        'm3-4': 'var(--space-m3-4)', // 16px
        'm3-5': 'var(--space-m3-5)', // 20px
        'm3-6': 'var(--space-m3-6)', // 24px
        'm3-7': 'var(--space-m3-7)', // 28px
        'm3-8': 'var(--space-m3-8)', // 32px
      },
      // Custom font families
      fontFamily: {
        sans: [
          'var(--font-geist-sans)',
          'var(--font-inter)',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-geist-mono)',
          'var(--font-jetbrains-mono)',
          'ui-monospace',
          'monospace',
        ],
        display: [
          'var(--font-geist-sans)',
          'var(--font-inter)',
          'system-ui',
          'sans-serif',
        ],
        'geist-sans': ['var(--font-geist-sans)', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace'],
        'google-sans': ['var(--font-inter)', 'sans-serif'],
        'google-mono': ['var(--font-jetbrains-mono)', 'monospace'],
      },
      // Radii (via tokens)
      borderRadius: {
        DEFAULT: 'var(--radius-md)', // rounded-12 baseline
        12: 'var(--radius-md)',
      },
      // Shadows (elevation via tokens)
      boxShadow: {
        soft: 'var(--elevation-soft)',
        glass: 'var(--elevation-glass)',
        deep: 'var(--elevation-deep)',
      },
      // Transitions
      transitionTimingFunction: {
        material: 'cubic-bezier(.4,0,.2,1)',
      },
      transitionDuration: {
        material: '200ms',
      },
      // Animation utilities
      animation: {
        in: 'animate-in 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.8s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.8s ease-out forwards',
        'slide-in-from-bottom-4':
          'slide-in-from-bottom-4 0.6s ease-out forwards',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      },
      keyframes: {
        'animate-in': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-from-bottom-4': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    // Add line-clamp plugin functionality
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        '.line-clamp-1': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '1',
        },
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-3': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        },
        '.animate-in': {
          'animation-fill-mode': 'both',
        },
      });
    },
  ],
};
export default config;
