/**
 * Contact page copy. Phone, email, address, hours and links come from
 * `siteConfig` / `factoryMapsHref`; never restate them here.
 * No claims about appointments, walk-ins, tours, response times or delivery.
 */
import { ENQUIRY_ANCHOR, siteConfig } from "@/config/site";
import { seedVarietyCount } from "./seeds";

export const contactHero = {
  eyebrow: "Connect with Peanut Agri Seeds",
  title: "Let's Grow Together.",
  subtitle: "We're Here to Help You Connect.",
  // The company name ends in "LTD.", so no extra period is added before "to".
  body: `Whether you are a farmer, dealer, distributor, or bulk buyer, connect with ${siteConfig.name} to discuss your requirements and learn more about our groundnut seed varieties.`,
};

export const enquirySection = {
  eyebrow: "Enquiry Form",
  title: "Enquire About Our Groundnut Seeds",
  lede: "Tell us what you need and our team will review your requirements.",
};

/**
 * Starting text for the optional message on links such as /contact?type=dealer#enquiry.
 * The form applies it once, on first load, and only while the message is still empty.
 */
export const enquiryTypeMessages: Record<string, string> = {
  // The company name ends in "LTD.", which also ends the first sentence.
  dealer: `I am interested in discussing a dealership or distribution opportunity with ${siteConfig.name} My business details and requirements are provided below.`,
};

/** The Contact page enquiry form, opened for a dealership enquiry (no variety preselected). */
export const dealerEnquiryHref = `/contact?type=dealer#${ENQUIRY_ANCHOR}`;

export const contactActionsCopy = {
  title: "Prefer to talk?",
  lede: "Reach our team directly. If the form is ever unavailable, phone and WhatsApp always work.",
};

export const factoryHoursSection = {
  eyebrow: "Factory Hours",
  title: "Visit Our Factory",
  subtitle: "Here When You Need Us.",
  body: "We welcome enquiries from farmers, dealers, distributors, and other agricultural business partners. Please use our contact details to connect with our team or plan a visit during our stated factory hours.",
  timezoneNote: "All times are India Standard Time (IST).",
};

export const factoryLocationSection = {
  eyebrow: "Location",
  title: "Our Factory Location",
  body: "Our factory is located in Sondarada, Gujarat, along the Keshod–Veraval Highway. Contact us if you need further assistance locating the premises.",
  mapNote: "Opens a Google Maps search for our address.",
};

export const contactExplore = {
  title: "Continue Exploring",
  links: [
    { label: "Send an Enquiry", href: `#${ENQUIRY_ANCHOR}`, description: "Share your seed requirements with our team." },
    { label: "Browse Seed Varieties", href: "/seeds", description: `See all ${seedVarietyCount} groundnut seed varieties.` },
    { label: "About Our Company", href: "/about", description: "Our story and leadership." },
    { label: "Become a Dealer", href: "/dealer-enquiry", description: "Partner with us as a dealer or distributor." },
  ],
};
