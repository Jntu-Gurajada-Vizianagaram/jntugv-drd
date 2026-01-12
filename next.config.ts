import type { NextConfig } from "next";

// Config updated to trigger rebuild
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://drnd.jntugv.edu.in/api/auth/:path*',
      },
      {
        source: '/api/notifications/:path*',
        destination: 'https://drnd.jntugv.edu.in/api/notifications/:path*',
      },
      {
        source: '/api/files/:path*',
        destination: 'https://drnd.jntugv.edu.in/api/files/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'https://drnd.jntugv.edu.in/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
