import type { CSSProperties } from "react";
import { FieldLines } from "@/components/sections/FieldLines";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/config/site";
import { getSeedVariety, seedCatalogue, type SeedVariety } from "@/content/seeds";
import { cn } from "@/lib/cn";
import { PackagingImage } from "./PackagingImage";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;
const { hero } = seedCatalogue;
const showcase = hero.showcase.map((slug) => getSeedVariety(slug)).filter((seed): seed is SeedVariety => !!seed);

/** Catalogue hero: statement plus three official packages (from `sm` up). */
export function SeedsHero() {
  return (
    <section aria-labelledby="seeds-heading" className="relative isolate overflow-hidden bg-forest-900 text-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_70%_at_78%_45%,rgb(40_86_58/0.9),transparent_70%)]"
      />
      <FieldLines className="-z-10 opacity-70" />

      <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="reveal lg:col-span-6">
          <Eyebrow tone="light" style={stagger(0)}>
            {hero.eyebrow}
          </Eyebrow>
          <h1
            id="seeds-heading"
            style={stagger(1)}
            className="mt-6 text-balance font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.01em] min-[400px]:text-5xl sm:text-6xl lg:text-[4.4rem]"
          >
            {hero.title}
          </h1>
          <p style={stagger(2)} className="mt-6 text-balance font-display text-[1.4rem] font-medium italic leading-snug text-gold-400 sm:text-[1.75rem]">
            {hero.subtitle}
          </p>
          <p style={stagger(3)} className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream/80 sm:text-lg">
            {hero.body}
          </p>
          <p style={stagger(4)} className="mt-8 flex items-center gap-4 font-display text-xl italic text-cream/90">
            <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
            {siteConfig.tagline}
          </p>
        </div>

        <div className="reveal hidden sm:block lg:col-span-6">
          <ul aria-label="Featured packaging" style={stagger(2)} className="grid grid-cols-3 items-end gap-4 lg:gap-5">
            {showcase.map((seed, index) => (
              <li key={seed.slug} className={cn(index === 1 ? "lg:-translate-y-6" : "lg:translate-y-2")}>
                <PackagingImage
                  seed={seed}
                  sizes="(min-width: 1280px) 190px, (min-width: 1024px) 15vw, 30vw"
                  className="aspect-[2/3] rounded-sm shadow-[0_30px_60px_-28px_rgb(0_0_0/0.65)] ring-1 ring-gold-400/30"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
