import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  titleTemplate: '%s | Volodymyr Yakymenko',
  defaultTitle: 'Volodymyr Yakymenko | E‑Learning & AI Product Developer',
  description:
    'E‑Learning specialist building AI‑powered learning products. Next.js, React, TypeScript. Explore projects and get in touch.',
  canonical: 'https://your-domain.com',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    siteName: 'Volodymyr Yakymenko Portfolio',
    title: 'Volodymyr Yakymenko | E‑Learning & AI Product Developer',
    description:
      'E‑Learning specialist building AI‑powered learning products. Next.js, React, TypeScript. Explore projects and get in touch.',
    images: [
      {
        url: 'https://your-domain.com/og/default-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Volodymyr Yakymenko — E‑Learning & AI Product Developer',
        type: 'image/jpeg',
      },
      {
        url: 'https://your-domain.com/og/default-og-square.jpg',
        width: 400,
        height: 400,
        alt: 'Volodymyr Yakymenko — E‑Learning & AI Product Developer',
        type: 'image/jpeg',
      },
    ],
  },

  // Twitter
  twitter: {
    handle: '@yourtwitterhandle',
    site: '@yourtwitterhandle',
    cardType: 'summary_large_image',
    images: ['https://your-domain.com/og/default-og.jpg'],
  },

  // Additional metadata
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
    },
    {
      name: 'theme-color',
      content: '#000000',
    },
    {
      name: 'msapplication-TileColor',
      content: '#000000',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'author',
      content: 'Portfolio Owner',
    },
    {
      name: 'robots',
      content: 'index,follow',
    },
    {
      name: 'googlebot',
      content: 'index,follow',
    },
  ],

  // Additional link tags
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'preload',
      href: '/fonts/GeistVF.woff',
      as: 'font',
      type: 'font/woff',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/fonts/GeistMonoVF.woff',
      as: 'font',
      type: 'font/woff',
      crossOrigin: 'anonymous',
    },
  ],
};

export default config;
