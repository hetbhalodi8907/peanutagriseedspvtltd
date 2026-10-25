import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { seedHref, type SeedVariety } from "@/content/seeds";
import { cn } from "@/lib/cn";
import { PackagingImage } from "./PackagingImage";

type SeedPreviewGridProps = {
  seeds: SeedVariety[];
  /** Grid columns for this placement, e.g. "grid-cols-2 md:grid-cols-4". */
  className?: string;
  /** `sizes` for the package images, matching those columns. */
  sizes: string;
};

/**
 * A small preview of varieties for other pages (not the catalogue): the official package,
 * its exact name, and a link to the variety page. The whole tile is clickable; the link's
 * name stays short because the package image keeps its own alt text outside the link.
 */
export function SeedPreviewGrid({ seeds, className, sizes }: SeedPreviewGridProps) {
  return (
    <ul className={cn("grid gap-4 sm:gap-6", className)}>
      {seeds.map((seed) => (
        <li key={seed.slug} className="group relative">
          <PackagingImage
            seed={seed}
            sizes={sizes}
            className="aspect-[4/5] rounded-sm border border-forest-900/10 transition-[border-color,box-shadow] duration-300 group-hover:border-gold-600/50 group-hover:shadow-[0_26px_50px_-30px_rgb(23_59_42/0.45)]"
            imageClassName="p-4 transition-transform duration-500 ease-premium group-hover:-translate-y-1 sm:p-5"
          />
          <p className="mt-4 flex items-start justify-between gap-3">
            <Link
              href={seedHref(seed)}
              className="text-balance font-display text-xl font-semibold leading-tight text-forest-900 lining-nums underline-offset-4 after:absolute after:inset-0 group-hover:underline sm:text-2xl"
            >
              {seed.name}
              <span className="sr-only">: view this variety</span>
            </Link>
            <ArrowRightIcon className="mt-1.5 size-4 shrink-0 text-gold-700 transition-transform duration-300 group-hover:translate-x-0.5" />
          </p>
        </li>
      ))}
    </ul>
  );
}
