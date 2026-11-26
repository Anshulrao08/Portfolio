
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Core optimizations for production builds
  reactStrictMode: true,
  compress: true,

  // Enable image formats for better compression
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Enable caching and prefetching
  cacheComponents: true,
  partialPrefetching: true,

  // Turbopack configuration
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
