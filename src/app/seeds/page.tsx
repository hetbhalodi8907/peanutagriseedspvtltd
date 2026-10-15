import type { Metadata } from "next";
import { SeedCatalogue } from "@/components/sections/seeds/SeedCatalogue";
import { SeedsHelp } from "@/components/sections/seeds/SeedsHelp";
import { SeedsHero } from "@/components/sections/seeds/SeedsHero";
import { siteConfig } from "@/config/site";
import { seedVarieties, seedVarietyCount } from "@/content/seeds";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Seeds",
  description: `Explore ${seedVarietyCount} groundnut seed varieties from ${siteConfig.name}: ${seedVarieties.map((seed) => seed.name).join(", ")}.`,
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
