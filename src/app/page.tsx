import { CompanyIntro } from "@/components/sections/home/CompanyIntro";
import { ContactQuickActions } from "@/components/sections/home/ContactQuickActions";
import { DealerCta } from "@/components/sections/home/DealerCta";
import { FloatingWhatsApp } from "@/components/sections/home/FloatingWhatsApp";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { QualityCommitment } from "@/components/sections/home/QualityCommitment";
import { SeedRangePreview } from "@/components/sections/home/SeedRangePreview";
import { TrustStrip } from "@/components/sections/home/TrustStrip";
import { ValuesSection } from "@/components/sections/home/ValuesSection";

// Homepage copy lives in src/content/home.ts; company facts in src/config/site.ts.
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <CompanyIntro />
      <SeedRangePreview />
      <ValuesSection />
      <QualityCommitment />
      <DealerCta />
      <ContactQuickActions />
      <FloatingWhatsApp />
    </>
  );
}
