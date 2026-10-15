import type { NextConfig } from "next";
import { deviceSizes, imageSizes } from "./image-config.mjs";

const nextConfig: NextConfig = {
  images: {
    // Images are pre-generated at build time (scripts/optimize-images.mjs) and served as
    // static WebP files through a custom loader, instead of Next.js's on-the-fly optimiser.
    // The runtime optimiser intermittently left a variant stuck forever under rapid
    // navigation (with AVIF and WebP alike); static files cannot hang and work on any host.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes,
    imageSizes,
  },
};

export default nextConfig;
