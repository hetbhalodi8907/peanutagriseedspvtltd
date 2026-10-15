import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { UpcomingSection } from "@/components/sections/UpcomingSection";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Quality",
  description: `Seed quality at ${siteConfig.name}.`,
};

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
