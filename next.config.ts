import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" }],
  },
  async rewrites() {
    return [
      { source: "/zh/send-ywy", destination: "/send-ywy/index.html" },
    ];
  },
};

export default nextConfig;
