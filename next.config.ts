import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
      protocol: 'https',
      hostname: '**',          // double wildcard for any hostname
      pathname: '/**',
    },
    ],

  },
};

export default nextConfig;
