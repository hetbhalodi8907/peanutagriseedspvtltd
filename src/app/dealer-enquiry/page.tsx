import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { UpcomingSection } from "@/components/sections/UpcomingSection";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Dealer Enquiry",
  description: `Dealer, distributor and bulk purchase enquiries for ${siteConfig.name}.`,
};

export default function DealerEnquiryPage() {
  return (
    <>
      <PageHero eyebrow="Dealer Enquiry" title="Partner with us">
        <p>We work with dealers, distributors and bulk purchasers of groundnut seeds.</p>
      </PageHero>
      <UpcomingSection
        note="Our online enquiry form is being prepared. Until it is available, please call or email us directly. This page will include:"
        planned={[
          "An enquiry form for dealers, distributors and bulk purchasers",
          "Direct calling and WhatsApp options",
        ]}
      />
    </>
  );
}
