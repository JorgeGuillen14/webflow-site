import type { NextConfig } from "next";

// Force project root so Next doesn't use a parent directory (e.g. lockfile in home dir)
const root = process.cwd();

const nextConfig: NextConfig = {
  outputFileTracingRoot: root,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
