import type { Metadata } from "next";
import { DealerAudiences } from "@/components/sections/dealer/DealerAudiences";
import { DealerCollection } from "@/components/sections/dealer/DealerCollection";
import { DealerContact } from "@/components/sections/dealer/DealerContact";
import { DealerProcess } from "@/components/sections/dealer/DealerProcess";
import { SplitHero } from "@/components/sections/SplitHero";
import { siteConfig } from "@/config/site";
import { dealerHero } from "@/content/dealer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Become a Seed Dealer",
  // The company name ends in "LTD.", so no extra period is added before "to".
  description: `Contact ${siteConfig.name} to discuss groundnut seed dealership, distribution, retail, and bulk-buying requirements.`,
  path: "/dealer-enquiry",
});

// Page copy lives in src/content/dealer.ts. Enquiries use the existing Contact page form
// (/contact?type=dealer#enquiry), so there is no separate submission flow.
export default function DealerEnquiryPage() {
  return (
    <>
      <SplitHero id="dealer-page-heading" {...dealerHero} />
      <DealerAudiences />
      <DealerProcess />
      <DealerCollection />
      <DealerContact />
    </>
  );
}
