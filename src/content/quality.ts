/**
 * Quality page copy. Facts (name, years, tagline, contacts) come from `siteConfig`;
 * product names, images and the count come from `src/content/seeds.ts`.
 *
 * This page describes the company's approach only. Do not add inspection, testing,
 * cleaning, grading or certification claims, statistics, guarantees or testimonials
 * unless the company has confirmed and documented them.
 */
import { ENQUIRY_ANCHOR, siteConfig } from "@/config/site";
import { images } from "./images";
import { seedVarietyCount } from "./seeds";
import { pickSeedVarieties } from "./showcase";

const { name, yearsInMarket } = siteConfig;

export const qualityHero = {
  eyebrow: "Our Approach to Quality",
  title: "Quality Is in Every Detail.",
  subtitle: "Experience, Care, and a Commitment to Agriculture.",
  // The company name ends in "LTD.", which takes the comma directly.
  body: `At ${name}, our approach is guided by ${yearsInMarket} years in the agricultural market, a focus on premium groundnut seed products, and attention to detail in serving farmers and business partners.`,
  primaryCta: { label: "Explore Our Seeds", href: "/seeds" },
  secondaryCta: { label: "Talk to Our Team", href: "/contact" },
  image: images.podsCloseup,
};

export const qualityPhilosophy = {
  eyebrow: "Our Philosophy",
  title: "Built on Attention to Detail.",
  body: "We believe that trust is built through clear communication, careful attention, and consistent business practices. Our focus is on serving the agricultural market with premium groundnut seed products and helping customers understand the products they enquire about.",
  /** The three ideas in the paragraph above, set as a quiet list beside it. */
  pillars: ["Clear communication", "Careful attention", "Consistent business practices"],
  image: images.floweringPlants,
};

export const qualityPrinciples = {
  eyebrow: "Our Principles",
  title: "Four Principles Behind Our Work",
  lede: "How we think about quality in the way we run our business and serve our customers.",
  items: [
    {
      title: "Experience in Agriculture",
      text: `Our approach has been shaped by ${yearsInMarket} years in the agricultural market, working with groundnut seeds and the people who grow, sell and distribute them.`,
    },
    {
      title: "Attention to Detail",
      text: "Careful business management and attention to detail guide how we run the company and how we serve every customer, from the first conversation onwards.",
    },
    {
      title: "Product Clarity",
      text: "Every variety is listed under its exact name and shown in its official packaging, so customers can be clear about which seed they are asking about. Accurate product information matters to us, and detailed variety information will be added as it is confirmed.",
    },
    {
      title: "Customer Relationships",
      text: "We value clear communication, trust and long-term relationships with farmers, retailers, dealers, distributors and our business partners.",
    },
  ],
};

/** Varieties with similar names, shown side by side to make the point about exact names. */
const productShowcase = pickSeedVarieties(["g20", "g22", "g23"]);
const showcaseNames = productShowcase.map((seed) => seed.name);

export const qualityProducts = {
  eyebrow: "Product Transparency",
  title: "Know the Variety. Make an Informed Enquiry.",
  lede: `Several of our varieties have similar names, such as ${showcaseNames.slice(0, -1).join(", ")} and ${showcaseNames[showcaseNames.length - 1]}. Each one is listed with its exact name and official packaging, so you can be sure which variety you are asking about.`,
  showcase: productShowcase,
  cta: { label: `View All ${seedVarietyCount} Varieties`, href: "/seeds" },
};

export const qualityContact = {
  title: "Have Questions About Our Seed Range?",
  // The company name ends in "LTD.", so no extra period is added before "to".
  body: `Connect with ${name} to discuss your product requirements and receive further information about the varieties you are interested in.`,
  primaryCta: { label: "Enquire Now", href: `/contact#${ENQUIRY_ANCHOR}` },
  whatsappLabel: "Chat on WhatsApp",
};
