/**
 * Homepage copy. Company facts (name, years, contacts, leadership) come from
 * `siteConfig` — never restate them here as literals.
 * Do not add statistics, certifications or claims the company has not confirmed.
 */
import { siteConfig } from "@/config/site";
import { images, type SiteImage } from "./images";

const { name, yearsInMarket, contact } = siteConfig;

export const hero = {
  eyebrow: ["Trust", "Quality", "Agriculture"],
  titleLead: "Growing Trust.",
  titleAccent: "Cultivating Quality.",
  subtitle: "Premium Groundnut Seeds for a Stronger Agricultural Future.",
  body: `With ${yearsInMarket} years in the agricultural market, ${name} is committed to serving farmers, dealers, and distributors through a quality-focused approach to groundnut seed products.`,
  primaryCta: { label: "Explore Our Seeds", href: "/seeds" },
  secondaryCta: { label: "Enquire Now", href: "/contact" },
  image: { ...images.peanutField, alt: "" }, // decorative behind the headline
};

export type TrustItem = { icon: "years" | "seed" | "detail" | "location"; title: string; text: string };

export const trustItems: TrustItem[] = [
  { icon: "years", title: `${yearsInMarket} Years`, text: "In the agricultural market" },
  { icon: "seed", title: "Premium Groundnut Seeds", text: "Premium and hybrid groundnut seed products" },
  { icon: "detail", title: "Quality-Focused", text: "A business approach shaped by care and attention to detail" },
  {
    icon: "location",
    title: `${contact.factory.region}, ${contact.factory.country}`,
    text: `Factory at ${contact.factory.locality}, ${contact.factory.street}`,
  },
];

export const introduction = {
  eyebrow: "Our Company",
  titleLead: "Rooted in Agriculture.",
  titleAccent: "Driven by Quality.",
  body: `At ${name}, agriculture is more than a business — it is our culture. With ${yearsInMarket} years of experience in the agricultural market, we continue to focus on premium groundnut seed products, attention to detail, and lasting relationships with the people who make agriculture possible.`,
  cta: { label: "Discover Our Company", href: "/about" },
  image: images.harvestedPods,
};

/** One entry per seed category. Phase 4/5 adds varieties and packaging images per category. */
export type SeedCategory = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: SiteImage;
};

export const seedRange = {
  eyebrow: "Our Seeds",
  title: "Explore Our Seed Range",
  lede: "Discover our range of premium groundnut seed varieties and hybrid seed offerings.",
  cta: { label: "Explore All Varieties", href: "/seeds" },
  categories: [
    {
      id: "premium-groundnut-seeds",
      title: "Premium Groundnut Seeds",
      description: "Our premium groundnut seed varieties for farmers, retailers, dealers and distributors.",
      href: "/seeds",
      image: images.podsCloseup,
    },
    {
      id: "hybrid-groundnut-seeds",
      title: "Hybrid Groundnut Seeds",
      description: "Our hybrid groundnut seed offerings for the agricultural market.",
      href: "/seeds",
      image: images.floweringPlants,
    },
  ] satisfies SeedCategory[],
};

export const values = {
  eyebrow: "Why Choose Us",
  title: "Quality Is in Every Detail.",
  lede: `The principles behind ${name} and the way we work with every customer.`,
  items: [
    {
      title: `Experience of ${yearsInMarket} Years`,
      text: `Our understanding of the groundnut seed market has been built over ${yearsInMarket} years in agriculture.`,
    },
    {
      title: "Focused on Groundnut Seeds",
      text: "Our work centres on premium and hybrid groundnut seed products — the crop we know best.",
    },
    {
      title: "Attention to Detail",
      text: "We take care in how we serve every customer, from the very first conversation.",
    },
    {
      title: "Relationships Built on Trust",
      text: "We are committed to long-term relationships with farmers, dealers, distributors and business partners.",
    },
  ],
};

export const qualityCommitment = {
  eyebrow: "Our Commitment",
  title: "Every Seed Represents Our Commitment.",
  body: "We believe that strong agricultural relationships begin with quality, care, and attention to detail. Our focus is on offering groundnut seed products that serve the needs of farmers and our agricultural business partners.",
  cta: { label: "Discover Our Quality Approach", href: "/quality" },
  image: images.freshlyDug,
};

export const dealerCta = {
  eyebrow: "Dealers & Distributors",
  title: "Grow With PEANUT AGRI SEEDS.",
  body: "Looking to explore business opportunities with a groundnut seed company? Connect with our team to discuss varieties, availability, and your business requirements.",
  primaryCta: { label: "Become a Dealer", href: "/dealer-enquiry" },
  secondaryCta: { label: "Contact Our Team", href: "/contact" },
};

export const contactActions = {
  eyebrow: "Talk to Us",
  title: "Speak With Our Team",
  lede: "Call us, message us on WhatsApp or send an email — we will be glad to help with your enquiry.",
};
