/**
 * Single source of truth for company facts, contact details and navigation.
 * Only add facts here that the company has confirmed — every page reads from this file.
 */

export const siteConfig = {
  name: "PEANUT AGRI SEEDS PVT. LTD.",
  shortName: "Peanut Agri Seeds",
  tagline: "Our Culture Is Agriculture.",
  description:
    "PEANUT AGRI SEEDS PVT. LTD. supplies premium groundnut seeds and hybrid groundnut seeds to farmers, dealers, distributors and bulk purchasers from its factory at Sondarada, Gujarat.",
  industry: "Agricultural seeds",
  yearsInMarket: 25,
  products: [
    { name: "Premium Groundnut Seeds", href: "/seeds" },
    { name: "Hybrid Groundnut Seeds", href: "/seeds" },
  ],
  audiences: ["Farmers", "Dealers", "Distributors", "Bulk purchasers"],
  contact: {
    phoneDisplay: "+91 7016017561",
    phoneHref: "tel:+917016017561",
    email: "peanutagriseeds@gmail.com",
    emailHref: "mailto:peanutagriseeds@gmail.com",
    factory: {
      street: "Keshod–Veraval Highway",
      locality: "Sondarada",
      region: "Gujarat",
      country: "India",
    },
  },
  logo: {
    src: "/brand/peanut-agri-seeds-logo.png",
    width: 1254,
    height: 1254,
    alt: "PEANUT AGRI SEEDS PVT. LTD. company logo",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Rendered as the highlighted call-to-action button on desktop. */
  isCta?: boolean;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Seeds", href: "/seeds" },
  { label: "Quality", href: "/quality" },
  { label: "Contact Us", href: "/contact" },
  { label: "Dealer Enquiry", href: "/dealer-enquiry", isCta: true },
];

export const factoryAddressLine = [
  siteConfig.contact.factory.street,
  siteConfig.contact.factory.locality,
  siteConfig.contact.factory.region,
  siteConfig.contact.factory.country,
].join(", ");
