/**
 * Pre-generates responsive WebP files for every site image into public/_img,
 * named <basename>-<width>.webp to match src/lib/image-loader.ts.
 * Runs automatically before `npm run dev` and `npm run build`.
 *
 * Incremental: a file is regenerated only when its source is newer.
 * Images are never enlarged beyond their source width; metadata is not copied.
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { deviceSizes, imagePublicPath, imageSizes } from "../image-config.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", imagePublicPath);
const widths = [...new Set([...imageSizes, ...deviceSizes])].sort((a, b) => a - b);

/** Source folders and their WebP quality. Packaging (seeds) and the logo stay sharper. */
const sources = [
  { dir: "src/assets/images/home", quality: 75 },
  { dir: "src/assets/images/about", quality: 75 },
  { dir: "src/assets/images/leadership", quality: 80 },
  { dir: "src/assets/images/seeds", quality: 85 },
  { dir: "public/brand", quality: 90 },
];

const isImage = (f) => /\.(jpe?g|png)$/i.test(f);
const mtime = async (p) => (await stat(p).catch(() => null))?.mtimeMs ?? 0;

await mkdir(outDir, { recursive: true });

const seen = new Map();
let written = 0;
let skipped = 0;

for (const { dir, quality } of sources) {
  const files = (await readdir(path.join(root, dir))).filter(isImage);
  for (const file of files) {
    const name = file.replace(/\.[a-z0-9]+$/i, "");
    // The loader maps by basename, so two sources with the same name would collide.
    if (seen.has(name)) throw new Error(`Duplicate image basename "${name}" in ${dir} and ${seen.get(name)}`);
    seen.set(name, dir);

    const input = path.join(root, dir, file);
    const sourceTime = await mtime(input);
    for (const width of widths) {
      const output = path.join(outDir, `${name}-${width}.webp`);
      if ((await mtime(output)) > sourceTime) {
        skipped++;
        continue;
      }
      await sharp(input).rotate().resize(width, undefined, { withoutEnlargement: true }).webp({ quality }).toFile(output);
      written++;
    }
  }
}

console.log(`optimize-images: ${seen.size} images × ${widths.length} widths → ${written} written, ${skipped} up to date (public${imagePublicPath})`);
