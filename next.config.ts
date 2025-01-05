import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'next-movies-storage.s3.eu-north-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
