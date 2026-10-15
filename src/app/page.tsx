import { BrandFacts } from "@/components/sections/BrandFacts";
import { HomeHero } from "@/components/sections/HomeHero";

// Phase 1 foundation. Company story, seed range and enquiry sections are added in later phases.
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <BrandFacts />
    </>
  );
}
