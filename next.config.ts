import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow any HTTPS domain
      },
      {
        protocol: "http",
        hostname: "**", // Allow any HTTP domain (optional)
      },
      
    ],
  },
};

export default nextConfig;

