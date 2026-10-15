import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { UpcomingSection } from "@/components/sections/UpcomingSection";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dealer Enquiry",
  // siteConfig.name already ends with a full stop.
  description: `Dealer, distributor and bulk purchase enquiries for ${siteConfig.name} Contact our team to discuss groundnut seed varieties and your requirements.`,
  path: "/dealer-enquiry",
});

export default function DealerEnquiryPage() {
  return (
    <>
      <PageHero eyebrow="Dealer Enquiry" title="Partner with us">
        <p>We work with dealers, distributors and bulk purchasers of groundnut seeds.</p>
      </PageHero>
      <UpcomingSection
        note="A dedicated dealer enquiry form is being prepared. Until then, you can send an enquiry through the form on our Contact Us page, or call or email us directly. This page will include:"
        planned={[
          "An enquiry form for dealers, distributors and bulk purchasers",
          "Direct calling and WhatsApp options",
        ]}
      />
    </>
  );
}
