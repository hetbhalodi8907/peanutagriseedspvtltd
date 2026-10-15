import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF where supported, WebP otherwise (photography is the heaviest asset on the site).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
