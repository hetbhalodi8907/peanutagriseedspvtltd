import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { UpcomingSection } from "@/components/sections/UpcomingSection";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Quality",
  // siteConfig.name already ends with a full stop.
  description: `Seed quality at ${siteConfig.name} Detailed information about our approach to groundnut seed quality is being prepared.`,
  path: "/quality",
});

export default function QualityPage() {
  return (
    <>
      <PageHero eyebrow="Quality" title="Our commitment to seed quality" />
      <UpcomingSection
        planned={[
          "How we approach groundnut seed quality",
          "Seed handling and processing at our Sondarada factory",
          "Guidance for farmers and dealers",
        ]}
      />
    </>
  );
}
