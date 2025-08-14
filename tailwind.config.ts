import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom color palette
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
      // Custom spacing for fluid design
      spacing: {
        'fluid-xs': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem)',
        'fluid-sm': 'clamp(0.5rem, 0.4rem + 0.5vw, 1rem)',
        'fluid-md': 'clamp(1rem, 0.8rem + 1vw, 2rem)',
        'fluid-lg': 'clamp(1.5rem, 1.2rem + 1.5vw, 3rem)',
        'fluid-xl': 'clamp(2rem, 1.6rem + 2vw, 4rem)',
        'fluid-2xl': 'clamp(3rem, 2.4rem + 3vw, 6rem)',
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
