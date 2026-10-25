/**
 * Dealer Enquiry page copy. Facts (name, tagline, contacts) come from `siteConfig`;
 * product names, images and the count come from `src/content/seeds.ts`.
 *
 * This is an invitation to enquire, not a dealer programme. Do not add benefits,
 * margins, discounts, credit terms, territories, guaranteed supply, response times
 * or an existing dealer network unless the company confirms them.
 */
import { siteConfig } from "@/config/site";
import { dealerEnquiryHref } from "./contact";
import { images } from "./images";
import { seedVarietyCount } from "./seeds";
import { pickSeedVarieties } from "./showcase";

const { name } = siteConfig;

export const dealerHero = {
  eyebrow: "Business Enquiries",
  title: "Grow With PEANUT AGRI SEEDS.",
  subtitle: "Let's Explore New Business Opportunities in Agriculture.",
  // The company name ends in "LTD.", so no extra period is added before "to".
  body: `Are you a seed dealer, retailer, distributor, or bulk buyer? Connect with ${name} to discuss your business requirements, the varieties you are interested in, and potential opportunities to work together.`,
  primaryCta: { label: "Discuss a Dealership", href: dealerEnquiryHref },
  secondaryCta: { label: "Explore Our Varieties", href: "/seeds" },
  image: images.sowingField,
};

export const dealerAudiences = {
  eyebrow: "Business Partners",
  title: "Who Can Enquire?",
  lede: "Interested businesses are welcome to contact us to discuss their requirements.",
  items: [
    "Agricultural seed retailers",
    "Groundnut seed dealers",
    "Distributors and wholesalers",
    "Agricultural-input businesses",
    "Bulk purchasers",
  ],
  note: "Every enquiry is considered individually. Sending an enquiry does not confirm a dealership, a territory or any supply arrangement.",
};

export const dealerProcess = {
  eyebrow: "How It Works",
  title: "A Simple Enquiry Process",
  lede: "Business conversations start with your requirements.",
  steps: [
    {
      title: "Share Your Requirements",
      text: "Tell us about your business, location, required seed varieties, and expected quantities.",
    },
    {
      title: "Discuss Your Needs",
      text: "Contact our team to discuss the relevant product range and business requirements.",
    },
    {
      title: "Review the Next Steps",
      text: "Any commercial arrangements, product availability, packing options, or dealership terms must be confirmed directly with the company.",
    },
  ],
  note: "This is an enquiry process, not an automatic dealer approval.",
};

export const dealerCollection = {
  eyebrow: "Our Varieties",
  title: "A Look at Our Collection",
  lede: `A selection from our ${seedVarietyCount} groundnut seed varieties, each shown in its official packaging. Open a variety to see its page.`,
  // A cross-section of the catalogue; shown in official catalogue order.
  showcase: pickSeedVarieties(["g20", "tj-37", "girnar-4", "red-cherry", "peanut-agri-seeds-special", "no-39", "sweta", "rembo"]),
  cta: { label: `View All ${seedVarietyCount} Varieties`, href: "/seeds" },
};

export const dealerContact = {
  eyebrow: "Start the Conversation",
  title: "Ready to Discuss Your Requirements?",
  body: "Share your business details through our enquiry form, or reach our team directly by phone, WhatsApp or email.",
  cta: { label: "Discuss a Dealership", href: dealerEnquiryHref },
};
