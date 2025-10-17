import type { NextConfig } from "next";
import path from "path";

// Make FIREBASE_WEBAPP_CONFIG (provided by App Hosting at BUILD time)
// available to the browser as NEXT_PUBLIC_FIREBASE_WEBAPP_CONFIG.
const firebaseWebAppConfig = process.env.FIREBASE_WEBAPP_CONFIG || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/s2/favicons/**',
      },
    ],
  },
  webpack(config) {
    // Allow imports like "@/components/..."
    config.resolve.alias["@" ] = path.resolve(__dirname, "src");
    return config;
  },
  env: {
    NEXT_PUBLIC_FIREBASE_WEBAPP_CONFIG: firebaseWebAppConfig,
  },
};

export default nextConfig;
