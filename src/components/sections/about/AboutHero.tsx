import Image from "next/image";
import type { CSSProperties } from "react";
import { FieldLines } from "@/components/sections/FieldLines";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/config/site";
import { aboutHero } from "@/content/about";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Editorial About Us hero: statement on the left, framed seedling photograph on the right. */
export function AboutHero() {
  const { yearsInMarket, contact } = siteConfig;

  return (
    <section aria-labelledby="about-heading" className="relative isolate overflow-hidden bg-forest-900 text-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_65%_at_80%_40%,rgb(40_86_58/0.85),transparent_70%)]"
      />
      <FieldLines className="-z-10 opacity-70" />

      <Container className="grid grid-cols-1 items-center gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <div className="reveal lg:col-span-7">
          <Eyebrow tone="light" style={stagger(0)}>
            {aboutHero.eyebrow}
          </Eyebrow>
          <h1
            id="about-heading"
            style={stagger(1)}
            className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.01em] min-[400px]:text-5xl sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem]"
          >
            <span className="block">{aboutHero.titleLead}</span>
            <span className="block italic text-gold-400">{aboutHero.titleAccent}</span>
          </h1>
          <p style={stagger(2)} className="mt-6 text-balance font-display text-[1.45rem] font-medium leading-snug sm:text-3xl">
            {aboutHero.subtitle}
          </p>
          <p style={stagger(3)} className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream/80 sm:text-lg">
            {aboutHero.body}
          </p>
          <dl
            style={stagger(4)}
            className="mt-10 grid max-w-xl grid-cols-1 gap-5 border-t border-cream/15 pt-7 min-[480px]:grid-cols-3"
          >
            {[
              { term: "Experience", value: `${yearsInMarket} Years` },
              { term: "Focus", value: "Groundnut Seeds" },
              { term: "Factory", value: `${contact.factory.locality}, ${contact.factory.region}` },
            ].map((item) => (
              <div key={item.term}>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-400">{item.term}</dt>
                <dd className="mt-1.5 font-display text-xl font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal lg:col-span-5">
          <div style={stagger(2)} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden="true" className="absolute -inset-3 border border-gold-400/40 sm:-inset-4" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-forest-950 lg:aspect-[4/5]">
              <Image
                src={aboutHero.image.src}
                alt={aboutHero.image.alt}
                fill
                priority
                fetchPriority="high"
                placeholder="blur"
                sizes="(min-width: 1024px) 38vw, (min-width: 448px) 448px, 100vw"
                className="object-cover object-[46%_55%]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
