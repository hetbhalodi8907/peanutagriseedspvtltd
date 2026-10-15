/**
 * The seed catalogue: single source of truth for every variety.
 * The grid, count, search, "About This Seed" links, detail pages and static
 * params all derive from `seedVarieties`. Add only company-verified facts here.
 *
 * Packaging images are the official files supplied by the company, stored
 * byte-for-byte unaltered in src/assets/images/seeds/.
 */
import type { StaticImageData } from "next/image";
import { siteConfig } from "@/config/site";
import g20 from "@/assets/images/seeds/g20.png";
import g22 from "@/assets/images/seeds/g22.png";
import girnar4 from "@/assets/images/seeds/girnar-4.png";
import girnar5 from "@/assets/images/seeds/girnar-5.png";
import menakshi from "@/assets/images/seeds/menakshi.png";
import peanutAgriSeedsSpecial from "@/assets/images/seeds/peanut-agri-seeds-special.png";
import redCherry from "@/assets/images/seeds/red-cherry.png";
import sona from "@/assets/images/seeds/sona.png";
import tj37 from "@/assets/images/seeds/tj-37.png";
import tj38 from "@/assets/images/seeds/tj-38.png";
import vardan from "@/assets/images/seeds/vardan.png";

export type SeedDetailStatus = "in-preparation" | "published";

export type SeedVariety = {
  /** Stable URL segment: /seeds/[slug]. Never change once published. */
  slug: string;
  /** Exact official display name. */
  name: string;
  /** General descriptor only; no per-variety premium/hybrid classification until verified. */
  descriptor: string;
  packaging: StaticImageData;
  /** "in-preparation" until verified specifications are added in Phase 5. */
  detailStatus: SeedDetailStatus;
};

const DESCRIPTOR = "Groundnut Seed Variety";

const variety = (slug: string, name: string, packaging: StaticImageData): SeedVariety => ({
  slug,
  name,
  descriptor: DESCRIPTOR,
  packaging,
  detailStatus: "in-preparation",
});

/** Official order, as supplied by the company. */
export const seedVarieties: readonly SeedVariety[] = [
  variety("g20", "G20", g20),
  variety("g22", "G22", g22),
  variety("tj-37", "TJ-37", tj37),
  variety("tj-38", "TJ-38", tj38),
  variety("girnar-4", "GIRNAR-4", girnar4),
  variety("girnar-5", "GIRNAR-5", girnar5),
  variety("menakshi", "MENAKSHI", menakshi),
  variety("red-cherry", "RED CHERRY", redCherry),
  variety("sona", "SONA", sona),
  variety("vardan", "VARDAN", vardan),
  variety("peanut-agri-seeds-special", "PEANUT AGRI SEEDS SPECIAL", peanutAgriSeedsSpecial),
];

export const seedVarietyCount = seedVarieties.length;

export function getSeedVariety(slug: string) {
  return seedVarieties.find((seed) => seed.slug === slug);
}

export const seedHref = (seed: Pick<SeedVariety, "slug">) => `/seeds/${seed.slug}`;

/** Contact page with this variety preselected in the enquiry form. */
export const seedEnquiryHref = (seed: Pick<SeedVariety, "slug">) => `/contact?variety=${seed.slug}`;

/** Name/slug pairs for the enquiry form dropdown and server-side validation (no image data). */
export const seedVarietyOptions = seedVarieties.map(({ slug, name }) => ({ slug, name }));

export const packagingAlt = (seed: Pick<SeedVariety, "name">) =>
  `${seed.name} groundnut seed packaging by ${siteConfig.name}`;

/**
 * Search key: upper-case letters and digits only, so "girnar 4", "Girnar-4"
 * and "GIRNAR4" all match GIRNAR-4, and "tj37" matches TJ-37.
 */
export const normaliseSearch = (value: string) => value.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");

export function searchSeedVarieties(query: string, seeds: readonly SeedVariety[] = seedVarieties) {
  const key = normaliseSearch(query);
  if (!key) return seeds;
  return seeds.filter((seed) => normaliseSearch(seed.name).includes(key));
}

/** Catalogue page copy. */
export const seedCatalogue = {
  hero: {
    eyebrow: "Our Seed Collection",
    title: "Discover Our Groundnut Seeds",
    subtitle: "Quality-Focused Seed Solutions for Agriculture.",
    // The company name ends in "LTD.", which also ends the first sentence; don't add another period.
    body: `Explore the groundnut seed varieties offered by ${siteConfig.name} Our collection reflects our focus on premium seed products, attention to detail, and our continuing connection with agriculture.`,
    /** Packages featured in the hero, by slug (must exist in `seedVarieties`). */
    showcase: ["g20", "peanut-agri-seeds-special", "red-cherry"],
  },
  intro: {
    eyebrow: "The Collection",
    body: "Our premium and hybrid groundnut seed collection, shown in its official packaging. Select About This Seed to open each variety's page.",
  },
  help: {
    title: "Need help choosing a variety?",
    body: "Speak with our team about our groundnut seed varieties, availability and your requirements.",
  },
};

/** Detail-page placeholder copy (Phase 4 scaffolding until verified details arrive in Phase 5). */
export const seedDetailNotice = {
  title: "Detailed information is being prepared",
  body: "Variety-specific information for this seed will be published here soon. In the meantime, our team will be glad to answer your questions.",
};
