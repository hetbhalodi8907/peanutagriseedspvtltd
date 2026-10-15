import type { MetadataRoute } from "next";
import { mainNav } from "@/config/site";
import { seedHref, seedVarieties } from "@/content/seeds";
import { absoluteUrl, siteUrl } from "@/lib/seo";

/**
 * sitemap.xml: every public page, including all variety pages from the catalogue.
 * Sitemap URLs must be absolute, so without SITE_URL (the real domain) this returns
 * an empty sitemap rather than localhost or invented URLs.
 * Unknown variety URLs 404 and are never listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const paths = [...mainNav.map((item) => item.href), ...seedVarieties.map(seedHref), "/privacy"];
  return [...new Set(paths)].map((path) => ({
    url: absoluteUrl(path)!,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/seeds") ? 0.8 : 0.6,
  }));
}
