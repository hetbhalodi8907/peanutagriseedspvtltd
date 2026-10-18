import type { Metadata } from "next";
import { SeedCatalogue } from "@/components/sections/seeds/SeedCatalogue";
import { SeedsHelp } from "@/components/sections/seeds/SeedsHelp";
import { SeedsHero } from "@/components/sections/seeds/SeedsHero";
import { siteConfig } from "@/config/site";
import { seedVarietyCount } from "@/content/seeds";
import { pageMetadata } from "@/lib/seo";

const { factory } = siteConfig.contact;

export const metadata: Metadata = pageMetadata({
  title: "Our Seeds",
  // Kept to about 150 characters for search snippets; the varieties themselves are listed on the page.
  description: `Explore ${seedVarietyCount} groundnut seed varieties from ${siteConfig.name} in ${factory.locality}, ${factory.region}. View each variety's official packaging and send an enquiry.`,
  path: "/seeds",
});

// Catalogue data lives in src/content/seeds.ts.
export default function SeedsPage() {
  return (
    <>
      <SeedsHero />
      <SeedCatalogue />
      <SeedsHelp />
    </>
  );
}
