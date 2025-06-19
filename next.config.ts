import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  
  // Remove experimental and headers for static export
  // These don't work with static export
};

export default nextConfig;
