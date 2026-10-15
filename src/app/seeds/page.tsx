import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { UpcomingSection } from "@/components/sections/UpcomingSection";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Our Seeds",
  description: `Premium groundnut seeds and hybrid groundnut seeds from ${siteConfig.name}`,
};

export default function SeedsPage() {
  return (
    <>
      <PageHero eyebrow="Our Seeds" title="Premium and hybrid groundnut seeds">
        <p>Our range covers two categories: Premium Groundnut Seeds and Hybrid Groundnut Seeds.</p>
      </PageHero>
      <UpcomingSection
        planned={[
          "The complete Premium Groundnut Seeds range",
          "The complete Hybrid Groundnut Seeds range",
          "Dedicated pages for each variety, with packaging images and variety-specific information",
        ]}
      />
    </>
  );
}
