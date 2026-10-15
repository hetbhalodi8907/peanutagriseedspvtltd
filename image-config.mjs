/**
 * Responsive image widths, shared by next.config.ts (srcset widths), the custom
 * loader (src/lib/image-loader.ts) and the build-time generator
 * (scripts/optimize-images.mjs). Change widths here only.
 */

/**
 * Widths for layout images (`sizes` with vw / full-width).
 * 480 bridges 384→640 so mid-size images on phones (e.g. catalogue packages ~390px at 1.75x)
 * don't have to fetch 640 (Phase 8 Lighthouse finding).
 */
export const deviceSizes = [480, 640, 750, 828, 1080, 1200, 1920, 2048];

/** Widths for small fixed-size images (logos, thumbnails). */
export const imageSizes = [64, 96, 128, 256, 384];

/** Public URL prefix and output folder (public/_img) for generated files. */
export const imagePublicPath = "/_img";
