import type { NextConfig } from "next";
import { deviceSizes, imageSizes } from "./image-config.mjs";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction && !process.env.SITE_URL?.trim()) {
  console.warn(
    "[seo] SITE_URL is not set: canonical URLs, social image URLs and sitemap entries are omitted. Set it for the public launch build (docs/LAUNCH-READINESS.md).",
  );
}

/**
 * Content Security Policy. Everything is first-party: fonts are self-hosted by
 * next/font, there are no analytics, embeds or CDNs. 'unsafe-inline' is required for
 * Next.js's inline bootstrap scripts and the logo-intro boot script on statically
 * generated pages (nonces would force dynamic rendering). Production only, because
 * `next dev` needs eval for fast refresh.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  ...(isProduction ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }] : []),
  // Ignored by browsers over plain HTTP; takes effect once served over HTTPS.
  ...(isProduction ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }] : []),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
