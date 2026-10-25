import type { Metadata } from "next";
import { ContactActionList } from "@/components/sections/contact/ContactActionList";
import { ContactExplore } from "@/components/sections/contact/ContactExplore";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { EnquiryForm } from "@/components/sections/contact/EnquiryForm";
import { FactoryHours } from "@/components/sections/contact/FactoryHours";
import { FactoryLocation } from "@/components/sections/contact/FactoryLocation";
import { LocalBusinessJsonLd } from "@/components/sections/contact/LocalBusinessJsonLd";
import { ClockIcon, MapPinIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ENQUIRY_ANCHOR, factoryAddressLine, siteConfig } from "@/config/site";
import { contactActionsCopy, enquirySection, enquiryTypeMessages } from "@/content/contact";
import { seedVarietyOptions } from "@/content/seeds";
import { hoursSummary } from "@/lib/business-hours";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  // Absolute: the default " | PEANUT AGRI SEEDS PVT. LTD." suffix would repeat the name.
  absoluteTitle: `Contact ${siteConfig.name} | Groundnut Seeds Gujarat`,
  description: `Contact ${siteConfig.name} for groundnut seed enquiries, factory location, opening hours, and business contact information in Sondarada, Gujarat.`,
  path: "/contact",
});

// Statically generated; the enquiry form posts to /api/enquiry.
// ?variety=<name or slug> preselects a variety; ?type=dealer starts the message for a
// dealership enquiry; #enquiry scrolls to the form.
export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section
        id={ENQUIRY_ANCHOR}
        aria-labelledby="enquiry-heading"
        className="scroll-mt-20 bg-cream py-16 sm:py-20 lg:scroll-mt-24 lg:py-24"
      >
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>{enquirySection.eyebrow}</Eyebrow>
            <h2
              id="enquiry-heading"
              className="mt-5 text-balance font-display text-[2.1rem] font-semibold leading-tight text-forest-900 sm:text-[2.6rem]"
            >
              {enquirySection.title}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-charcoal/75">{enquirySection.lede}</p>
            <div className="mt-9 rounded-sm border border-forest-900/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgb(23_59_42/0.45)] sm:p-9">
              <EnquiryForm varieties={seedVarietyOptions} typeMessages={enquiryTypeMessages} />
            </div>
          </div>

          {/* A region, not <aside>: complementary landmarks must not sit inside <main>. */}
          <section aria-labelledby="talk-heading" data-contact-aside className="lg:col-span-5 lg:pt-[7.25rem]">
            <div className="lg:sticky lg:top-32">
              <h2 id="talk-heading" className="font-display text-3xl font-semibold text-forest-900">
                {contactActionsCopy.title}
              </h2>
              <p className="mt-3 leading-relaxed text-charcoal/70">{contactActionsCopy.lede}</p>
              <div className="mt-6">
                <ContactActionList />
              </div>
              <div className="mt-6 space-y-4 border-t border-forest-900/10 pt-6 text-sm">
                <p className="flex gap-3 text-charcoal/80">
                  <MapPinIcon className="mt-0.5 size-4 shrink-0 text-gold-700" />
                  <span>
                    <span className="block font-semibold text-forest-900">Factory</span>
                    {factoryAddressLine}
                  </span>
                </p>
                <div className="flex gap-3 text-charcoal/80">
                  <ClockIcon className="mt-0.5 size-4 shrink-0 text-gold-700" />
                  <div>
                    <p className="font-semibold text-forest-900">Factory hours</p>
                    <ul>
                      {hoursSummary().map((row) => (
                        <li key={row.days}>
                          {row.days}: {row.hours}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </section>

      <FactoryHours />
      <FactoryLocation />
      <ContactExplore />
      <LocalBusinessJsonLd />
    </>
  );
}
