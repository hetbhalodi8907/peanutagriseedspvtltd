import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { UpcomingSection } from "@/components/sections/UpcomingSection";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.name} by phone or email, or visit our factory at Sondarada, Gujarat.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact Us" title="Get in touch">
        <p>Reach our team by phone or email. Our factory is located on the {siteConfig.contact.factory.street}.</p>
      </PageHero>
      <UpcomingSection
        note="You can contact us now using the details shown here. This page will also include:"
        planned={["An online enquiry form", "Factory hours and location map", "WhatsApp contact"]}
      />
    </>
  );
}
