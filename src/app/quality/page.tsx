import type { Metadata } from "next";
import { QualityContact } from "@/components/sections/quality/QualityContact";
import { QualityPhilosophy } from "@/components/sections/quality/QualityPhilosophy";
import { QualityPrinciples } from "@/components/sections/quality/QualityPrinciples";
import { QualityProducts } from "@/components/sections/quality/QualityProducts";
import { SplitHero } from "@/components/sections/SplitHero";
import { siteConfig } from "@/config/site";
import { qualityHero } from "@/content/quality";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Seed Quality Approach",
  // The company name ends in "LTD.", which takes the comma directly.
  description: `Discover the quality-focused approach of ${siteConfig.name}, serving the agricultural market with premium groundnut seed products.`,
  path: "/quality",
});

// Page copy lives in src/content/quality.ts; company facts in src/config/site.ts.
export default function QualityPage() {
  return (
    <>
      <SplitHero id="quality-page-heading" {...qualityHero} />
      <QualityPhilosophy />
      <QualityPrinciples />
      <QualityProducts />
      <QualityContact />
    </>
  );
}
