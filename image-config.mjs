/**
 * Responsive image widths, shared by next.config.ts (srcset widths), the custom
 * loader (src/lib/image-loader.ts) and the build-time generator
 * (scripts/optimize-images.mjs). Change widths here only.
 */

/** Widths for layout images (`sizes` with vw / full-width). */
export const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048];

/** Widths for small fixed-size images (logos, thumbnails). */
export const imageSizes = [64, 96, 128, 256, 384];

/** Public URL prefix and output folder (public/_img) for generated files. */
export const imagePublicPath = "/_img";
