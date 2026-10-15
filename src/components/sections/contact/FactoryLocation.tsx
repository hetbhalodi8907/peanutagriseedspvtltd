import { ArrowRightIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { FieldLines } from "@/components/sections/FieldLines";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { factoryAddressLine, factoryMapsHref, siteConfig } from "@/config/site";
import { factoryLocationSection } from "@/content/contact";

/**
 * "Our Factory Location": the exact supplied address plus a Google Maps address search.
 * No embedded map: it would load third-party scripts and cookies. No coordinates or pin
 * are shown, because none have been verified against the actual premises.
 */
export function FactoryLocation() {
  const { contact } = siteConfig;

  return (
    <section id="location" aria-labelledby="location-heading" className="scroll-mt-24 bg-cream py-20 sm:py-24 lg:scroll-mt-28 lg:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal-on-scroll lg:col-span-6">
          <SectionHeading id="location-heading" eyebrow={factoryLocationSection.eyebrow} title={factoryLocationSection.title} />
          <address className="mt-7 flex items-start gap-3 font-display text-2xl font-semibold not-italic leading-snug text-forest-900 sm:text-[1.7rem]">
            <MapPinIcon className="mt-1.5 size-6 shrink-0 text-gold-700" />
            <span>{factoryAddressLine}</span>
          </address>
          <p className="mt-6 max-w-lg leading-[1.8] text-charcoal/75">{factoryLocationSection.body}</p>
          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <a href={factoryMapsHref} target="_blank" rel="noopener noreferrer" className={buttonClasses("forest", "lg")}>
              Find Us on Google Maps
              <ArrowRightIcon className="size-4" />
              <span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
          </div>
          <p className="mt-3 text-xs text-charcoal/55">{factoryLocationSection.mapNote}</p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="text-charcoal/70">Need help finding us?</span>
            <a href={contact.phoneHref} className="inline-flex items-center gap-2 font-semibold text-forest-900 hover:underline">
              <PhoneIcon className="size-4 text-gold-700" />
              Call {contact.phoneDisplay}
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-forest-900 hover:underline"
            >
              <WhatsAppIcon className="size-4 text-gold-700" />
              WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>

        <div className="reveal-on-scroll lg:col-span-6">
          {/* Decorative location panel (not a map): region-level only. */}
          <div className="relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-sm bg-forest-900 p-7 text-cream sm:aspect-[16/11] sm:p-10">
            <FieldLines className="-z-10 opacity-80" />
            <div aria-hidden="true" className="absolute inset-4 -z-10 border border-gold-400/25" />
            <span className="flex size-14 items-center justify-center rounded-full border border-gold-400/60 bg-forest-950/60 text-gold-400">
              <MapPinIcon className="size-6" />
            </span>
            <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold-400">
              {contact.factory.region}, {contact.factory.country}
            </p>
            <p className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">{contact.factory.locality}</p>
            <p className="mt-1 text-cream/75">{contact.factory.street}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
