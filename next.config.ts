import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "3yrpgg4xvr.ucarecd.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
