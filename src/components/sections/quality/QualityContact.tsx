import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { FieldLines } from "@/components/sections/FieldLines";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { qualityContact } from "@/content/quality";

/** Closing band: the enquiry form and WhatsApp, using the shared contact configuration. */
export function QualityContact() {
  return (
    <section aria-labelledby="quality-contact-heading" className="bg-cream pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <div className="reveal-on-scroll relative isolate overflow-hidden rounded-sm bg-forest-950 px-6 py-12 text-cream sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <FieldLines className="-z-10 opacity-70" />
          <div aria-hidden="true" className="absolute inset-3 -z-10 border border-gold-400/20 sm:inset-4" />
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 id="quality-contact-heading" className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
                {qualityContact.title}
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-cream/75 sm:text-lg">{qualityContact.body}</p>
            </div>
            <div className="flex flex-col gap-3 min-[480px]:flex-row lg:col-span-5 lg:flex-col lg:items-stretch">
              <ButtonLink href={qualityContact.primaryCta.href} variant="gold" size="lg">
                {qualityContact.primaryCta.label}
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
              <ButtonLink href={siteConfig.contact.whatsappHref} target="_blank" rel="noopener noreferrer" variant="outline-light" size="lg">
                <WhatsAppIcon className="size-4" />
                {qualityContact.whatsappLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
