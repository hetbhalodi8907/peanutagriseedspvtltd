import type { CSSProperties } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ArrowRightIcon, MapPinIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { factoryAddressLine, siteConfig } from "@/config/site";
import { FieldLines } from "./FieldLines";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** First-screen homepage hero: tagline, positioning and primary paths. */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden bg-forest-900 text-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_78%_45%,rgb(40_86_58/0.9),transparent_70%)]"
      />
      <FieldLines className="-z-10" />

      <Container className="grid grid-cols-1 items-center gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="reveal lg:col-span-7">
          <Eyebrow tone="light" style={stagger(0)}>
            Premium Groundnut Seeds · Since {siteConfig.yearsInMarket} Years
          </Eyebrow>

          <h1
            id="hero-heading"
            style={stagger(1)}
            className="mt-7 font-display text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.01em] sm:text-6xl lg:text-[5.25rem]"
          >
            Our Culture Is <span className="italic text-gold-400">Agriculture.</span>
          </h1>

          <p style={stagger(2)} className="mt-7 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {siteConfig.name} supplies premium groundnut seeds and hybrid groundnut seeds to farmers, dealers,
            distributors and bulk purchasers.
          </p>

          <div style={stagger(3)} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <ButtonLink href="/seeds" variant="gold" size="lg">
              Explore Our Seeds
              <ArrowRightIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href="/dealer-enquiry" variant="outline-light" size="lg">
              Dealer Enquiry
            </ButtonLink>
          </div>

          <p style={stagger(4)} className="mt-12 flex items-start gap-3 text-sm text-cream/65">
            <MapPinIcon className="mt-0.5 size-4 shrink-0 text-gold-400" />
            <span>Factory: {factoryAddressLine}</span>
          </p>
        </div>

        <div className="reveal flex justify-center lg:col-span-5 lg:justify-end">
          <div style={stagger(2)} className="relative w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[420px]">
            <div aria-hidden="true" className="absolute -inset-3 rounded-[38px] border border-gold-400/40 sm:-inset-4" />
            <div className="overflow-hidden rounded-[28px] bg-paper shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]">
              {/* Not `priority`: the intro logo owns the page's single image preload. */}
              <BrandLogo sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 260px" className="w-full" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
