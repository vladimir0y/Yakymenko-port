// Make @next/bundle-analyzer optional to avoid crashing when it's not installed
let withBundleAnalyzer = (config) => config;
if (process.env.ANALYZE === 'true') {
  try {
    const { default: bundleAnalyzer } = await import('@next/bundle-analyzer');
    withBundleAnalyzer = bundleAnalyzer({ enabled: true });
  } catch (e) {
    console.warn('[next.config] @next/bundle-analyzer not installed; continuing without analyzer');
  }
}

// GitHub Pages support: enable static export when deploying to GitHub Pages
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = '';
const assetPrefix = undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export settings for GitHub Pages builds
  ...(isGithubPages
    ? {
        output: 'export',
        trailingSlash: true,
        basePath,
        assetPrefix,
        images: { unoptimized: true },
      }
    : {
        // Standard dev/prod settings for Vercel/local
        images: { unoptimized: false },
      }),
  // Expose base path for client-side code (used for iframe src)
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    ...(isGithubPages ? {} : { unoptimized: false }),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/uc/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'docs.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
