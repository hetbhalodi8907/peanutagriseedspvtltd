import type { ImageLoaderProps } from "next/image";
import { imagePublicPath } from "../../image-config.mjs";

/**
 * Custom next/image loader: points every srcset entry at a WebP file pre-generated
 * at build time by scripts/optimize-images.mjs, e.g.
 *   /_next/static/media/g20.0537d964.png @ 828w  →  /_img/g20-828.webp
 *   /brand/peanut-agri-seeds-logo.png    @ 128w  →  /_img/peanut-agri-seeds-logo-128.webp
 *
 * Why: Next.js's on-the-fly optimiser intermittently left a variant stuck forever
 * under rapid navigation (see README, Gotchas). Static files cannot hang.
 * Quality is fixed per image folder by the generator, so `quality` is not used here.
 */
export default function imageLoader({ src, width }: ImageLoaderProps) {
  const file = src.split("?")[0].split("/").pop() ?? src;
  const name = file
    .replace(/\.[0-9a-f]{8}(?=\.[a-z0-9]+$)/i, "") // static-import content hash
    .replace(/\.[a-z0-9]+$/i, ""); // extension
  return `${imagePublicPath}/${name}-${width}.webp`;
}
