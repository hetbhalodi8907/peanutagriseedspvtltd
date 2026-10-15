import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
import { ArrowDownIcon, ArrowRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/config/site";
import { hero } from "@/content/home";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Full-bleed photographic hero. The first screen of the site. */
export function HomeHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      data-hide-floating-contact
      className="relative isolate flex min-h-[calc(100svh-112px)] flex-col overflow-hidden bg-forest-950 text-cream lg:min-h-[calc(100svh-128px)]"
    >
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        fetchPriority="high"
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[60%_center]"
      />
      {/* Even wash on small screens (text spans the width); directional on large screens. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(15_42_29/0.78)_0%,rgb(15_42_29/0.7)_45%,rgb(15_42_29/0.9)_100%)] lg:bg-[linear-gradient(90deg,rgb(15_42_29/0.94)_0%,rgb(23_59_42/0.8)_42%,rgb(23_59_42/0.28)_78%,rgb(23_59_42/0.12)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 hidden h-48 bg-gradient-to-t from-forest-950/85 to-transparent lg:block"
      />

      <Container className="flex flex-1 flex-col justify-center py-14 sm:py-20 lg:py-16 xl:py-20">
        <div className="reveal max-w-3xl">
          <Eyebrow tone="light" style={stagger(0)}>
            {hero.eyebrow.map((word, i) => (
              <Fragment key={word}>
                {/* Real spaces keep the words breakable on narrow screens. */}
                {i > 0 && (
                  <span aria-hidden="true" className="mx-1 text-gold-400/60">
                    {" • "}
                  </span>
                )}
                {word}
              </Fragment>
            ))}
          </Eyebrow>

          <h1
            id="hero-heading"
            style={stagger(1)}
            className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.01em] min-[400px]:text-5xl sm:text-6xl lg:text-[5rem] xl:text-[5.6rem]"
          >
            <span className="block">{hero.titleLead}</span>
            <span className="block italic text-gold-400">{hero.titleAccent}</span>
          </h1>

          <p
            style={stagger(2)}
            className="mt-6 max-w-2xl text-balance font-display text-[1.45rem] font-medium leading-snug text-cream sm:text-3xl"
          >
            {hero.subtitle}
          </p>

          <p style={stagger(3)} className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream/80 sm:text-lg">
            {hero.body}
          </p>

          <div style={stagger(4)} className="mt-8 flex flex-col gap-3 min-[480px]:flex-row sm:gap-4">
            <ButtonLink href={hero.primaryCta.href} variant="gold" size="lg">
              {hero.primaryCta.label}
              <ArrowRightIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="outline-light" size="lg">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div className="border-t border-cream/15">
        <Container className="flex items-center justify-between gap-6 py-5">
          <p className="font-display text-lg italic text-gold-400 sm:text-xl">{siteConfig.tagline}</p>
          <a
            href="#introduction"
            className="group hidden items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-cream/70 transition-colors hover:text-gold-400 sm:flex"
          >
            Discover more
            <span className="flex size-9 items-center justify-center rounded-full border border-cream/25 transition-colors group-hover:border-gold-400">
              <ArrowDownIcon className="size-4" />
            </span>
          </a>
        </Container>
      </div>
    </section>
  );
}
