import type { Metadata } from "next";
import { EnquiryForm } from "@/components/sections/contact/EnquiryForm";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/config/site";
import { seedVarietyOptions } from "@/content/seeds";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Enquire about groundnut seed varieties from ${siteConfig.name} Send an enquiry, call, WhatsApp or email our team.`,
};

// The page stays statically generated; the form posts to /api/enquiry.
// ?variety=<name or slug> preselects a variety in the browser.
export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact Us" title="Let's Grow Together.">
        <p>
          Looking for premium groundnut seed varieties for your farming or business requirements? Share your enquiry with{" "}
          {siteConfig.name} Our team can use your details to understand your requirements and respond through the appropriate
          available contact channel.
        </p>
        <p className="mt-6 flex items-center gap-4 font-display text-xl italic text-gold-400">
          <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
          {siteConfig.tagline}
        </p>
      </PageHero>

      <section aria-labelledby="enquiry-heading" className="bg-cream py-16 sm:py-20 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>Enquiry Form</Eyebrow>
            <h2 id="enquiry-heading" className="mt-5 text-balance font-display text-[2.1rem] font-semibold leading-tight text-forest-900 sm:text-[2.6rem]">
              Enquire About Our Groundnut Seeds
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-charcoal/75">
              Tell us what you need and our team will review your requirements.
            </p>
            <div className="mt-9 rounded-sm border border-forest-900/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgb(23_59_42/0.45)] sm:p-9">
              <EnquiryForm varieties={seedVarietyOptions} />
            </div>
          </div>

          <aside className="lg:col-span-5 lg:pt-[7.25rem]">
            <ContactDetails title="Prefer to talk?" showWhatsApp className="lg:sticky lg:top-32" />
          </aside>
        </Container>
      </section>
    </>
  );
}
