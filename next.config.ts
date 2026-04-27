import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/job/:path*",
        destination: `${process.env.JOB_SERVICE_URL}/:path*`,
      },
      {
        source: "/api/user/:path*",
        destination: `${process.env.USER_SERVICE_URL}/:path*`,
      },
      {
        source: "/api/job-marketplace/:path*",
        destination: `${process.env.JOB_MARKETPLACE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
