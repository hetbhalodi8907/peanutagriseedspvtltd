import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { FieldLines } from "@/components/sections/FieldLines";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { seedRange, type SeedCategory } from "@/content/home";

/**
 * Category-level preview of the seed range. Photography is general crop imagery,
 * not product packaging — real variety images arrive with the catalogue (Phase 4/5).
 */
export function SeedRangePreview() {
  return (
    <section aria-labelledby="seed-range-heading" className="relative isolate overflow-hidden bg-forest-900 py-20 text-cream sm:py-24 lg:py-32">
      <FieldLines className="-z-10 opacity-60" />
      <Container>
        <div className="reveal-on-scroll flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="seed-range-heading" tone="light" eyebrow={seedRange.eyebrow} title={seedRange.title} lede={seedRange.lede} />
          {/* Visibility lives on a wrapper: `hidden` would conflict with the button's own `inline-flex`. */}
          <div className="hidden shrink-0 lg:block">
            <ButtonLink href={seedRange.cta.href} variant="outline-light" size="lg">
              {seedRange.cta.label}
              <ArrowRightIcon className="size-4" />
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
          {seedRange.categories.map((category, index) => (
            <li key={category.id} className="reveal-on-scroll">
              <CategoryPanel category={category} index={index} />
            </li>
          ))}
        </ul>

        <ButtonLink href={seedRange.cta.href} variant="gold" size="lg" className="mt-10 w-full sm:w-auto lg:hidden">
          {seedRange.cta.label}
          <ArrowRightIcon className="size-4" />
        </ButtonLink>
      </Container>
    </section>
  );
}

function CategoryPanel({ category, index }: { category: SeedCategory; index: number }) {
  return (
    <Link
      href={category.href}
      className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-sm bg-forest-950 sm:aspect-[5/4] md:aspect-[4/5] xl:aspect-[5/5.2]"
    >
      <Image
        src={category.image.src}
        alt={category.image.alt}
        fill
        placeholder="blur"
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-[1.04]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/55 to-forest-950/5" />
      <div
        aria-hidden="true"
        className="absolute inset-3 border border-gold-400/0 transition-colors duration-500 group-hover:border-gold-400/50 group-focus-visible:border-gold-400/50"
      />

      <div className="relative p-7 sm:p-9 lg:p-10">
        <span className="text-xs font-semibold tracking-[0.3em] text-gold-400">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-3 font-display text-[2rem] font-semibold leading-tight text-cream sm:text-4xl lg:text-[2.6rem]">
          {category.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/80 sm:text-base">{category.description}</p>
        <span className="mt-6 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
          View the range
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
