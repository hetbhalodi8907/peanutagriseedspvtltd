import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ArrowRightIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { mainNav, siteConfig } from "@/config/site";
import { breakableEmail } from "@/lib/breakable-email";
import { hoursSummary } from "@/lib/business-hours";

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold-400">{children}</h2>;
}

const linkClass = "text-sm text-cream/75 transition-colors hover:text-gold-400";

export function SiteFooter() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer data-hide-floating-contact className="bg-forest-950 text-cream">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <span className="inline-block overflow-hidden rounded-xl bg-paper">
            <BrandLogo sizes="96px" className="w-24" />
          </span>
          <p className="mt-6 text-sm font-bold tracking-[0.16em]">{siteConfig.name}</p>
          <p className="mt-2 font-display text-xl italic text-gold-400">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/65">
            Premium groundnut seeds and hybrid groundnut seeds, with {siteConfig.yearsInMarket} years of market
            presence.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <FooterHeading>Explore</FooterHeading>
          <ul className="mt-5 space-y-3">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <FooterHeading>Our Seeds</FooterHeading>
          <ul className="mt-5 space-y-3">
            {siteConfig.products.map((product) => (
              <li key={product.name}>
                <Link href={product.href} className={linkClass}>
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <FooterHeading>Contact</FooterHeading>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3 text-cream/75">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <address className="not-italic leading-relaxed">
                Factory: {contact.factory.street},
                <br />
                {contact.factory.locality}, {contact.factory.region}, {contact.factory.country}
              </address>
            </li>
            <li>
              <a href={contact.phoneHref} className={`flex gap-3 ${linkClass}`}>
                <PhoneIcon className="mt-0.5 size-4 shrink-0 text-gold-400" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className={`flex gap-3 [overflow-wrap:anywhere] ${linkClass}`}>
                <MailIcon className="mt-0.5 size-4 shrink-0 text-gold-400" />
                <span>{breakableEmail(contact.email)}</span>
              </a>
            </li>
            {/* Same central schedule as the Contact page (siteConfig.factoryHours). */}
            <li className="flex gap-3 text-cream/75">
              <ClockIcon className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span className="leading-relaxed">
                {hoursSummary({ short: true }).map((row) => (
                  <span key={row.days} className="block">
                    {row.days}: {row.hours}
                  </span>
                ))}
              </span>
            </li>
            <li>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:underline">
                Contact &amp; directions
                <ArrowRightIcon className="size-3.5" />
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-cream/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name} All rights reserved.{" "}
            <Link href="/privacy" className="ml-2 inline-block py-1 text-cream/70 underline-offset-4 hover:text-gold-400 hover:underline">
              Privacy Notice
            </Link>
          </p>
          <p className="font-display text-sm italic text-cream/60">{siteConfig.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
