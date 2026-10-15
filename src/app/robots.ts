import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/seo";

/**
 * robots.txt: all public pages may be indexed; the enquiry API may not.
 * The Sitemap line appears only once SITE_URL (the real domain) is configured.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    ...(siteUrl ? { sitemap: absoluteUrl("/sitemap.xml")!, host: siteUrl.origin } : {}),
  };
}
