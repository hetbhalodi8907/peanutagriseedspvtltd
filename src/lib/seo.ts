import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Public site URL for canonical links, Open Graph/Twitter URLs, sitemap entries and
 * structured data. Read from SITE_URL at build time (pages are statically generated).
 *
 * The production domain has not been supplied yet. Until SITE_URL is set:
 * no canonical/og:url, no social image URL, an empty sitemap, and no Sitemap line
 * in robots.txt. Nothing ever points at an invented, localhost or placeholder domain.
 */
function readSiteUrl(raw = process.env.SITE_URL?.trim()): URL | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`SITE_URL "${raw}" is not a valid URL, e.g. https://www.yourcompany.com`);
  }
  const host = url.hostname.toLowerCase();
  const placeholder =
    host === "localhost" ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(host) ||
    host.includes("[") ||
    host.endsWith(".local") ||
    /(^|\.)example\.(com|org|net)$/.test(host) ||
    host.includes("your-");
  if (url.protocol !== "https:") throw new Error(`SITE_URL must use https:// (got "${raw}")`);
  if (placeholder) throw new Error(`SITE_URL "${raw}" looks like a local or placeholder address`);
  if (url.pathname !== "/" || url.search || url.hash) throw new Error(`SITE_URL must be the bare origin, e.g. ${url.origin}`);
  return new URL(url.origin);
}

export const siteUrl = readSiteUrl();

export const absoluteUrl = (path: string) => (siteUrl ? new URL(path, siteUrl).toString() : null);

/** Official logo (square, opaque cream background) used as the social sharing image. */
const socialImage = {
  url: siteConfig.logo.src,
  width: siteConfig.logo.width,
  height: siteConfig.logo.height,
  alt: siteConfig.logo.alt,
};

export const defaultTitle = `${siteConfig.name} | ${siteConfig.tagline}`;

type PageMetaInput = {
  /** Short page title; the layout template appends " | PEANUT AGRI SEEDS PVT. LTD.". */
  title?: string;
  /** Full title used as-is (no template). */
  absoluteTitle?: string;
  description: string;
  /** Path of the page, e.g. "/seeds/g20". */
  path: string;
};

/**
 * Page metadata with consistent description, canonical and social tags.
 * Next.js replaces (not merges) openGraph/twitter per page, so every page builds them here.
 */
export function pageMetadata({ title, absoluteTitle, description, path }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ?? (title ? `${title} | ${siteConfig.name}` : defaultTitle);
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title ? title : { absolute: defaultTitle },
    description,
    ...(siteUrl ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_IN",
      title: fullTitle,
      description,
      ...(siteUrl ? { url: path, images: [socialImage] } : {}),
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
      ...(siteUrl ? { images: [socialImage.url] } : {}),
    },
  };
}
