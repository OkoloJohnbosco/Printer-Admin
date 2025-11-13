import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://fly.storage.tigris.dev/**"),
      new URL("http://159.89.91.30:9000/**"),
    ],
  },
};

export default nextConfig;
