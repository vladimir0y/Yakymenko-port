/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use class strategy to toggle dark mode without affecting system preference
  darkMode: 'class',
  content: [
    // Common entry points
    './index.html',
    './public/index.html',

    // Typical app directories
    './src/**/*.{html,js,jsx,ts,tsx,vue,svelte,md,mdx}',
    './app/**/*.{html,js,jsx,ts,tsx,md,mdx}',
    './pages/**/*.{html,js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{html,js,jsx,ts,tsx,md,mdx}',

    // If using server-side templates, include them as needed
    './templates/**/*.{html,ejs,twig,php}',
  ],
  theme: {
    extend: {
      colors: {
        // Example semantic colors; extend rather than override Tailwind defaults
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
    },
  },
  plugins: [
    // Add any required Tailwind plugins here without changing the build pipeline
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};

