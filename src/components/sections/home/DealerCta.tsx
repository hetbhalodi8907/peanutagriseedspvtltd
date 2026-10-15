import { ArrowRightIcon } from "@/components/icons";
import { FieldLines } from "@/components/sections/FieldLines";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { dealerCta } from "@/content/home";

const tradeAudiences = siteConfig.audiences.filter((audience) => audience !== "Farmers");

/** Invitation for trade partners. Links to the Dealer Enquiry and Contact routes. */
export function DealerCta() {
  return (
    <section aria-labelledby="dealer-heading" className="bg-cream pb-10 pt-20 sm:pt-24 lg:pt-32">
      <Container>
        <div className="reveal-on-scroll relative isolate overflow-hidden rounded-sm bg-forest-950 px-6 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <FieldLines className="-z-10 opacity-80" />
          <div aria-hidden="true" className="absolute inset-3 -z-10 border border-gold-400/20 sm:inset-4" />

          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SectionHeading id="dealer-heading" tone="light" eyebrow={dealerCta.eyebrow} title={dealerCta.title} lede={dealerCta.body} />
              <ul aria-label="We work with" className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/65">
                {tradeAudiences.map((audience) => (
                  <li key={audience} className="flex items-center gap-2.5 whitespace-nowrap">
                    <span aria-hidden="true" className="size-1 rounded-full bg-gold-400/70" />
                    {audience}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 min-[480px]:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
              <ButtonLink href={dealerCta.primaryCta.href} variant="gold" size="lg">
                {dealerCta.primaryCta.label}
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
              <ButtonLink href={dealerCta.secondaryCta.href} variant="outline-light" size="lg">
                {dealerCta.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
