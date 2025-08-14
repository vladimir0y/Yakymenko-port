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
      // Fluid typography using clamp
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', // 12-14px
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', // 14-16px
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', // 16-18px
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)', // 18-20px
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', // 20-24px
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)', // 24-32px
        'fluid-3xl': 'clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)', // 30-40px
        'fluid-4xl': 'clamp(2.25rem, 1.8rem + 2.25vw, 3rem)', // 36-48px
        'fluid-5xl': 'clamp(3rem, 2.4rem + 3vw, 4rem)', // 48-64px
        'fluid-6xl': 'clamp(3.75rem, 3rem + 3.75vw, 5rem)', // 60-80px
      },
      // Custom spacing for fluid design and Material-3 4-pt aliases
      spacing: {
        // Fluid container paddings (can be used ad-hoc as utilities)
        'container-xs': 'clamp(0.75rem, 2.5vw, 1.25rem)',
        'container-sm': 'clamp(1rem, 3vw, 2rem)',
        'container-md': 'clamp(1.25rem, 4vw, 2.5rem)',
        'container-lg': 'clamp(1.5rem, 4.5vw, 3rem)',
        'container-xl': 'clamp(2rem, 5vw, 4rem)',
        // Material 3 4pt aliases (semantic helpers)
        'm3-1': '0.25rem', // 4px
        'm3-2': '0.5rem', // 8px
        'm3-3': '0.75rem', // 12px
        'm3-4': '1rem', // 16px
        'm3-5': '1.25rem', // 20px
        'm3-6': '1.5rem', // 24px
        'm3-7': '1.75rem', // 28px
        'm3-8': '2rem', // 32px
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
      // Radii
      borderRadius: {
        DEFAULT: '0.75rem', // rounded-12 baseline
        12: '0.75rem',
      },
      // Shadows
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.08)',
        glass:
          'inset 0 1px 1.5px rgba(255,255,255,0.25), inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.15)',
        deep: '0 6px 20px rgba(0,0,0,0.25), 0 12px 48px rgba(0,0,0,0.15)',
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
