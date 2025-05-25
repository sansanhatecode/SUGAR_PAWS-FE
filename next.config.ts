// next.config.ts (hoặc next.config.js nếu em sử dụng JavaScript)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "store.lolitacollective.com",
      "example.com",
      "via.placeholder.com",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
