import { ArrowRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { seedHref, type SeedVariety } from "@/content/seeds";
import { PackagingImage } from "./PackagingImage";

type SeedCardProps = {
  seed: SeedVariety;
  /** Position in the official list (1-based), not in the filtered results. */
  number: number;
};

/** One variety: the full official package, its exact name, and "About This Seed". */
export function SeedCard({ seed, number }: SeedCardProps) {
  const headingId = `seed-${seed.slug}`;

  return (
    <article
      aria-labelledby={headingId}
      className="group flex h-full flex-col overflow-hidden rounded-sm border border-forest-900/10 bg-white shadow-[0_1px_0_rgb(23_59_42/0.04)] transition-[border-color,box-shadow] duration-300 hover:border-gold-600/45 hover:shadow-[0_26px_50px_-30px_rgb(23_59_42/0.45)]"
    >
      <PackagingImage
        seed={seed}
        // The package (object-contain inside a padded stage) renders at ~65-70% of the card width,
        // so size the request to the package, not the card (Phase 8 audit: ~2x pixels were fetched).
        sizes="(min-width: 1280px) 210px, (min-width: 1024px) 22vw, (min-width: 480px) 34vw, 56vw"
        // Square on single-column phones keeps the list compact; 4:5 once cards sit side by side.
        className="aspect-square border-b border-forest-900/8 min-[480px]:aspect-[4/5]"
        imageClassName="p-5 transition-transform duration-500 ease-premium group-hover:-translate-y-1 sm:p-6"
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center justify-between gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-gold-700">
          {seed.descriptor}
          <span aria-hidden="true" className="tabular-nums text-gold-700">
            {String(number).padStart(2, "0")}
          </span>
        </p>
        <h3 id={headingId} className="mt-3 text-balance font-display text-[1.7rem] font-semibold leading-tight text-forest-900 lining-nums">
          {seed.name}
        </h3>
        {/* mt-auto keeps every button on the card's bottom edge, however the name wraps. */}
        <div className="mt-auto pt-6">
          <ButtonLink href={seedHref(seed)} variant="forest" className="w-full">
            About This Seed
            <span className="sr-only">: {seed.name}</span>
            <ArrowRightIcon className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
