import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeedDetail } from "@/components/sections/seeds/SeedDetail";
import { siteConfig } from "@/config/site";
import { getSeedVariety, seedHref, seedVarieties } from "@/content/seeds";
import { pageMetadata } from "@/lib/seo";

type SeedPageProps = { params: Promise<{ slug: string }> };

// Only the varieties listed in src/content/seeds.ts exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return seedVarieties.map((seed) => ({ slug: seed.slug }));
}

export async function generateMetadata({ params }: SeedPageProps): Promise<Metadata> {
  const seed = getSeedVariety((await params).slug);
  if (!seed) return {};
  return pageMetadata({
    title: `${seed.name} Groundnut Seeds`,
    // siteConfig.name already ends with a full stop.
    description: `${seed.name} groundnut seeds from ${siteConfig.name} View the official ${seed.name} packaging and send an enquiry to our team.`,
    path: seedHref(seed),
  });
}

export default async function SeedPage({ params }: SeedPageProps) {
  const seed = getSeedVariety((await params).slug);
  if (!seed) notFound();
  return <SeedDetail seed={seed} />;
}
