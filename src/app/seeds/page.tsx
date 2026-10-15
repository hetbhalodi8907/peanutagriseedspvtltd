import type { Metadata } from "next";
import { SeedCatalogue } from "@/components/sections/seeds/SeedCatalogue";
import { SeedsHelp } from "@/components/sections/seeds/SeedsHelp";
import { SeedsHero } from "@/components/sections/seeds/SeedsHero";
import { siteConfig } from "@/config/site";
import { seedVarieties, seedVarietyCount } from "@/content/seeds";

export const metadata: Metadata = {
  title: "Our Seeds",
  description: `Explore ${seedVarietyCount} groundnut seed varieties from ${siteConfig.name}: ${seedVarieties.map((seed) => seed.name).join(", ")}.`,
};

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
