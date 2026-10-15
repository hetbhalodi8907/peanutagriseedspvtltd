import type { CSSProperties } from "react";
import { ArrowDownIcon, ClockIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { FieldLines } from "@/components/sections/FieldLines";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ENQUIRY_ANCHOR, siteConfig } from "@/config/site";
import { contactHero } from "@/content/contact";
import { hoursSummary } from "@/lib/business-hours";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Contact hero: statement, primary paths, and an at-a-glance panel (hours, place, phone). */
export function ContactHero() {
  const { contact } = siteConfig;

  return (
    <section aria-labelledby="contact-heading" className="relative isolate overflow-hidden bg-forest-900 text-cream">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_70%_at_80%_40%,rgb(40_86_58/0.85),transparent_70%)]"
      />
      <FieldLines className="-z-10 opacity-70" />

      <Container className="grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="reveal lg:col-span-7">
          <Eyebrow tone="light" style={stagger(0)}>
            {contactHero.eyebrow}
          </Eyebrow>
          <h1
            id="contact-heading"
            style={stagger(1)}
            className="mt-6 text-balance font-display text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.01em] min-[400px]:text-5xl sm:text-6xl lg:text-[4.6rem]"
          >
            {contactHero.title}
          </h1>
          <p style={stagger(2)} className="mt-5 text-balance font-display text-[1.45rem] font-medium italic leading-snug text-gold-400 sm:text-[1.8rem]">
            {contactHero.subtitle}
          </p>
          <p style={stagger(3)} className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-cream/80 sm:text-lg">
            {contactHero.body}
          </p>
          <p style={stagger(3)} className="mt-6 flex items-center gap-4 font-display text-xl italic text-cream/90">
            <span aria-hidden="true" className="h-px w-10 bg-gold-400" />
            {siteConfig.tagline}
          </p>
          <div style={stagger(4)} className="mt-9 flex flex-col gap-3 min-[480px]:flex-row">
            <ButtonLink href={`#${ENQUIRY_ANCHOR}`} variant="gold" size="lg">
              Send an Enquiry
              <ArrowDownIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href="/seeds" variant="outline-light" size="lg">
              Browse Seed Varieties
            </ButtonLink>
          </div>
        </div>

        <div className="reveal lg:col-span-5">
          <div style={stagger(3)} className="border border-cream/15 bg-forest-950/45 p-6 sm:p-8">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold-400">At a glance</h2>
            <ul className="mt-6 divide-y divide-cream/10">
              <li className="flex gap-4 pb-5">
                <ClockIcon className="mt-0.5 size-5 shrink-0 text-gold-400" />
                <div className="min-w-0 text-sm">
                  <p className="font-semibold text-cream">Factory hours</p>
                  <ul className="mt-1.5 space-y-1 text-cream/75">
                    {hoursSummary().map((row) => (
                      <li key={row.days}>
                        <span className="text-cream/90">{row.days}:</span> {row.hours}
                      </li>
                    ))}
                  </ul>
                  <a href="#hours" className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-gold-400 hover:underline">
                    Full schedule
                  </a>
                </div>
              </li>
              <li className="flex gap-4 py-5">
                <MapPinIcon className="mt-0.5 size-5 shrink-0 text-gold-400" />
                <div className="min-w-0 text-sm">
                  <p className="font-semibold text-cream">
                    {contact.factory.locality}, {contact.factory.region}
                  </p>
                  <p className="mt-1 text-cream/75">{contact.factory.street}</p>
                  <a href="#location" className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.14em] text-gold-400 hover:underline">
                    Factory location
                  </a>
                </div>
              </li>
              <li className="flex gap-4 pt-5">
                <PhoneIcon className="mt-0.5 size-5 shrink-0 text-gold-400" />
                <div className="min-w-0 text-sm">
                  <p className="font-semibold text-cream">Call our team</p>
                  <a href={contact.phoneHref} className="mt-1 inline-block text-cream/85 hover:text-gold-400 hover:underline">
                    {contact.phoneDisplay}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
