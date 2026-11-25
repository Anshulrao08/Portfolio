import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Core optimizations for production builds
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  // Enable image formats for better compression
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Experimental features (app directory already used)
  experimental: {
    appDir: true,
    // Bundle analysis can be enabled via ANALYZE env var
    // See https://nextjs.org/docs/advanced-features/bundle-analyzer
  },
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
