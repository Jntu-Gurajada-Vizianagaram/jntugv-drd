import type { NextConfig } from "next";

// Config updated to trigger rebuild
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://localhost:5000/api/auth/:path*',
      },
      {
        source: '/api/notifications/:path*',
        destination: 'http://localhost:5000/api/notifications/:path*',
      },
      {
        source: '/api/files/:path*',
        destination: 'http://localhost:5000/api/files/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
