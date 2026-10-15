import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeedDetail } from "@/components/sections/seeds/SeedDetail";
import { siteConfig } from "@/config/site";
import { getSeedVariety, seedVarieties } from "@/content/seeds";

type SeedPageProps = { params: Promise<{ slug: string }> };

// Only the 11 known varieties exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return seedVarieties.map((seed) => ({ slug: seed.slug }));
}

export async function generateMetadata({ params }: SeedPageProps): Promise<Metadata> {
  const seed = getSeedVariety((await params).slug);
  if (!seed) return {};
  return {
    title: `${seed.name} Groundnut Seeds`,
    // siteConfig.name already ends with a full stop.
    description: `${seed.name}: a groundnut seed variety from ${siteConfig.name}`,
  };
}

export default async function SeedPage({ params }: SeedPageProps) {
  const seed = getSeedVariety((await params).slug);
  if (!seed) notFound();
  return <SeedDetail seed={seed} />;
}
