import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { UpcomingSection } from "@/components/sections/UpcomingSection";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${siteConfig.name} — ${siteConfig.yearsInMarket} years of market presence in groundnut seeds.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title={`${siteConfig.yearsInMarket} years rooted in agriculture`}>
        <p>
          {siteConfig.name} specialises in premium groundnut seeds and hybrid groundnut seeds, with a factory on the{" "}
          {siteConfig.contact.factory.street} at {siteConfig.contact.factory.locality}, {siteConfig.contact.factory.region}.
        </p>
      </PageHero>
      <UpcomingSection
        planned={[
          "Our company story and journey in agricultural seeds",
          "Leadership profiles of our Managing Director and CEO",
          "Our factory at Sondarada, Gujarat",
        ]}
      />
    </>
  );
}
