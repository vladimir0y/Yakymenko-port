import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/theme';

// Local font declarations with preload
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
  preload: true,
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
  preload: true,
});

// Google Fonts as fallbacks
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'Portfolio | Full Stack Developer',
    template: '%s | Portfolio',
  },
  description:
    'Full Stack Developer specializing in modern web technologies, React, Next.js, and TypeScript.',
  keywords: [
    'portfolio',
    'developer',
    'react',
    'nextjs',
    'typescript',
    'web development',
  ],
  authors: [{ name: 'Portfolio Owner' }],
  creator: 'Portfolio Owner',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Portfolio | Full Stack Developer',
    description:
      'Full Stack Developer specializing in modern web technologies, React, Next.js, and TypeScript.',
    siteName: 'Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Full Stack Developer',
    description:
      'Full Stack Developer specializing in modern web technologies, React, Next.js, and TypeScript.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload custom fonts for better performance */}
        <link
          rel="preload"
          href="/fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GeistMonoVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        {/* Additional preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          ${inter.variable} ${jetbrainsMono.variable}
          font-sans antialiased
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          {/* Skip link for accessibility */}
          <a
            href="#main-content"
            className="skip-link focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
