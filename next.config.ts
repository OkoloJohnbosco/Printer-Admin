import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://fly.storage.tigris.dev/**"),
      new URL("http://159.89.91.30:9000/**"),
      new URL("https://s3.printa.africa/**"),
      new URL("https://s3.stagprinta.africa/**"),
      new URL("https://fra1.digitaloceanspaces.com/**"),
      new URL(
        "https://zynk-printa-media-prod.fra1.cdn.digitaloceanspaces.com/**",
      ),
    ],
  },
};

export default nextConfig;
