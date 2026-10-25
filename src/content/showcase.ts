import { seedVarieties, type SeedVariety } from "./seeds";

/**
 * Varieties for a page showcase, by slug, always in official catalogue order.
 * Fails the build on an unknown slug, so a showcase can never silently shrink.
 */
export function pickSeedVarieties(slugs: readonly string[]): SeedVariety[] {
  const unknown = slugs.filter((slug) => !seedVarieties.some((seed) => seed.slug === slug));
  if (unknown.length > 0) throw new Error(`Unknown seed slug(s) in showcase: ${unknown.join(", ")}`);
  return seedVarieties.filter((seed) => slugs.includes(seed.slug));
}
