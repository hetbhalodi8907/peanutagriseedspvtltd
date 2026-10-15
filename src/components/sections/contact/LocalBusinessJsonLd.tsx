import { siteConfig } from "@/config/site";

/**
 * schema.org LocalBusiness data for the Contact page, using verified details only:
 * no street number, coordinates, ratings or reviews. (A `url`/`logo` can be added
 * once the production domain is known.)
 */
export function LocalBusinessJsonLd() {
  const { contact } = siteConfig;
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    slogan: siteConfig.tagline,
    telephone: contact.phoneHref.replace(/^tel:/, ""),
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.factory.street,
      addressLocality: contact.factory.locality,
      addressRegion: contact.factory.region,
      addressCountry: contact.factory.countryCode,
    },
    openingHoursSpecification: siteConfig.factoryHours.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.days.map((day) => `https://schema.org/${day}`),
      opens: entry.opens,
      closes: entry.closes,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // JSON is escaped so no value can close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
