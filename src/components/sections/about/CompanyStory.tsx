import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { companyStory } from "@/content/about";

/** "Built on Experience. Guided by Agriculture." — the company narrative. */
export function CompanyStory() {
  return (
    <section aria-labelledby="story-heading" className="overflow-hidden bg-cream py-20 sm:py-24 lg:py-32">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="reveal-on-scroll lg:col-span-7">
          <SectionHeading
            id="story-heading"
            eyebrow={companyStory.eyebrow}
            title={
              <>
                <span className="block">{companyStory.titleLead}</span>
                <span className="block italic text-forest-700">{companyStory.titleAccent}</span>
              </>
            }
          />
          <div className="mt-8 max-w-2xl space-y-5 text-base leading-[1.85] text-charcoal/80 sm:text-[1.075rem]">
            {companyStory.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <ul aria-label="What our business is built on" className="mt-10 flex max-w-2xl flex-wrap gap-x-8 gap-y-3 border-t border-forest-900/10 pt-7">
            {companyStory.pillars.map((pillar) => (
              <li key={pillar} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-forest-900">
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold-600" />
                {pillar}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal-on-scroll relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-forest-900">
            <Image
              src={companyStory.image.src}
              alt={companyStory.image.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, (min-width: 448px) 448px, 100vw"
              className="object-cover"
            />
          </div>
          <figure className="relative -mt-14 ml-4 max-w-[17rem] border-l-2 border-gold-400 bg-paper px-6 py-5 shadow-[0_24px_50px_-28px_rgb(15_42_29/0.55)] sm:-ml-6 lg:-ml-12">
            <blockquote className="font-display text-2xl italic leading-snug text-forest-900">{siteConfig.tagline}</blockquote>
            <figcaption className="mt-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-700">
              {siteConfig.shortName}
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
