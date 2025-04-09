// next.config.ts (hoặc next.config.js nếu em sử dụng JavaScript)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["store.lolitacollective.com", "example.com"], // Thêm domain của nguồn hình ảnh
  },
};

export default nextConfig;
