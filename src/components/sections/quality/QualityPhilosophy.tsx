import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { qualityPhilosophy } from "@/content/quality";

/** Editorial statement beside a framed crop photograph (general imagery, not the company's own fields). */
export function QualityPhilosophy() {
  return (
    <section aria-labelledby="philosophy-heading" className="bg-cream py-20 sm:py-24 lg:py-32">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="reveal-on-scroll lg:col-span-5">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden="true" className="absolute -bottom-4 -left-4 right-8 top-8 border border-gold-600/50 sm:-bottom-5 sm:-left-5" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-forest-900 shadow-[0_30px_60px_-30px_rgb(15_42_29/0.55)]">
              <Image
                src={qualityPhilosophy.image.src}
                alt={qualityPhilosophy.image.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1280px) 460px, (min-width: 1024px) 36vw, (min-width: 488px) 448px, calc(100vw - 40px)"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="reveal-on-scroll lg:col-span-7">
          <SectionHeading id="philosophy-heading" eyebrow={qualityPhilosophy.eyebrow} title={qualityPhilosophy.title} />
          <span aria-hidden="true" className="mt-8 block h-px w-16 bg-gold-600" />
          <p className="mt-8 max-w-xl text-base leading-[1.85] text-charcoal/80 sm:text-lg">{qualityPhilosophy.body}</p>
          <ul className="mt-10 grid grid-cols-1 border-y border-forest-900/12 sm:grid-cols-3">
            {qualityPhilosophy.pillars.map((pillar) => (
              <li
                key={pillar}
                className="flex items-center gap-3 border-forest-900/12 py-5 font-display text-xl font-semibold leading-snug text-forest-900 [&:not(:first-child)]:border-t sm:px-5 sm:first:pl-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0"
              >
                <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-gold-600" />
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
