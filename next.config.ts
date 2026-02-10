import type { NextConfig } from "next";

// Force project root so Next doesn't use a parent directory (e.g. lockfile in home dir)
const root = process.cwd();

// Only use basePath in production when explicitly set (e.g. Webflow). Localhost always at /.
const basePath =
  process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

const nextConfig: NextConfig = {
  basePath,
  assetPrefix: basePath,
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
