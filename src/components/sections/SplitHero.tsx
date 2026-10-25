import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { FieldLines } from "./FieldLines";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

type Cta = { label: string; href: string };

type SplitHeroProps = {
  /** id of the h1, referenced by the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  image: { src: StaticImageData; alt: string };
  /** Optional object-position for the photograph, e.g. "object-[50%_60%]". */
  imageClassName?: string;
};

/** Inner-page hero: statement, tagline and two actions beside a framed photograph. */
export function SplitHero({ id, eyebrow, title, subtitle, body, primaryCta, secondaryCta, image, imageClassName }: SplitHeroProps) {
  return (
    <section aria-labelledby={id} className="relative isolate overflow-hidden bg-forest-900 text-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_65%_at_80%_40%,rgb(40_86_58/0.85),transparent_70%)]"
      />
      <FieldLines className="-z-10 opacity-70" />

      <Container className="grid grid-cols-1 items-center gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <div className="reveal lg:col-span-7">
          <Eyebrow tone="light" style={stagger(0)}>
            {eyebrow}
          </Eyebrow>
          <h1
            id={id}
            style={stagger(1)}
            className="mt-6 text-balance font-display text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.01em] min-[400px]:text-5xl sm:text-6xl lg:text-[4.4rem]"
          >
            {title}
          </h1>
          <p style={stagger(2)} className="mt-6 text-balance font-display text-[1.4rem] font-medium italic leading-snug text-gold-400 sm:text-[1.75rem]">
            {subtitle}
          </p>
          <p style={stagger(3)} className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream/80 sm:text-lg">
            {body}
          </p>
          <p style={stagger(4)} className="mt-8 flex items-center gap-4 font-display text-xl italic text-cream/90">
            <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
            {siteConfig.tagline}
          </p>
          <div style={stagger(5)} className="mt-10 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <ButtonLink href={primaryCta.href} variant="gold" size="lg">
              {primaryCta.label}
              <ArrowRightIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="outline-light" size="lg">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="reveal lg:col-span-5">
          <div style={stagger(2)} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden="true" className="absolute -inset-3 border border-gold-400/40 sm:-inset-4" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-forest-950 lg:aspect-[4/5]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                fetchPriority="high"
                placeholder="blur"
                sizes="(min-width: 1024px) 38vw, (min-width: 488px) 448px, calc(100vw - 40px)"
                className={cn("object-cover", imageClassName)}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
