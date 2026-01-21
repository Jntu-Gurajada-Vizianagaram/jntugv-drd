import type { NextConfig } from "next";

// Config updated to trigger rebuild
const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["192.168.57.30:3000", "localhost:3000", "http://127.0.0.1:6000", "http://72.61.232.85:3000", "http://72.61.232.85:6000", "https://drnd.jntugv.edu.in", "https://drnd.jntugv.edu.in/api/", "http://127.0.0.1:6000",],
    },
  },
  async rewrites() {
    // In production, we proxy to the local backend port (avoiding public domain loop)
    const BACKEND_URL = process.env.INTERNAL_BACKEND_URL || 'http://127.0.0.1:6000';

    return [
      {
        source: '/api/auth/:path*',
        destination: `${BACKEND_URL}/api/auth/:path*`,
      },
      {
        source: '/api/notifications/:path*',
        destination: `${BACKEND_URL}/api/notifications/:path*`,
      },
      {
        source: '/api/contacts/:path*',
        destination: `${BACKEND_URL}/api/contacts/:path*`,
      },
      {
        source: '/api/downloads/:path*',
        destination: `${BACKEND_URL}/api/downloads/:path*`,
      },
      {
        source: '/api/files/:path*',
        destination: `${BACKEND_URL}/api/files/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${BACKEND_URL}/uploads/:path*`,
      },
      // Generic fallback for any other API route
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
