import type { Metadata } from "next";
import { AboutContact } from "@/components/sections/about/AboutContact";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { ApproachSection } from "@/components/sections/about/ApproachSection";
import { BrandStatement } from "@/components/sections/about/BrandStatement";
import { CompanyStory } from "@/components/sections/about/CompanyStory";
import { LeadershipBridge } from "@/components/sections/about/LeadershipBridge";
import { LeadershipProfiles } from "@/components/sections/about/LeadershipProfiles";
import { siteConfig } from "@/config/site";

const [md, ceo] = siteConfig.leadership;

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${siteConfig.name}: ${siteConfig.yearsInMarket} years in the agricultural market, led by ${md.role} ${md.name} and ${ceo.role} ${ceo.name}.`,
};

// Page copy lives in src/content/about.ts; company facts in src/config/site.ts.
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyStory />
      <LeadershipProfiles />
      <LeadershipBridge />
      <ApproachSection />
      <BrandStatement />
      <AboutContact />
    </>
  );
}
