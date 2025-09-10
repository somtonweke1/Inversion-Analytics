import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      // Set root to this project to avoid picking parent lockfiles
      root: __dirname,
    },
  },
};

export default nextConfig;
