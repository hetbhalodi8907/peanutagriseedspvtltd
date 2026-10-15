import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { seedDetailNotice, seedHref, seedVarieties, type SeedVariety } from "@/content/seeds";
import { PackagingImage } from "./PackagingImage";

/**
 * Variety page. Phase 4 scaffolding: name, official packaging and an honest
 * "in preparation" notice. Phase 5 adds verified details for `published` varieties.
 */
export function SeedDetail({ seed }: { seed: SeedVariety }) {
  const index = seedVarieties.findIndex((s) => s.slug === seed.slug);
  const previous = seedVarieties[(index - 1 + seedVarieties.length) % seedVarieties.length];
  const next = seedVarieties[(index + 1) % seedVarieties.length];
  const { contact } = siteConfig;

  return (
    <section aria-labelledby="seed-heading" className="bg-cream">
      <div className="border-b border-forest-900/10 bg-paper">
        <Container>
          <nav aria-label="Breadcrumb" className="py-4 text-sm">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-charcoal/65">
              <li>
                <Link href="/" className="hover:text-forest-900 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/seeds" className="hover:text-forest-900 hover:underline">
                  Our Seeds
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-forest-900">
                {seed.name}
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      <Container className="grid grid-cols-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-16 lg:py-20">
        <div className="reveal mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
          <PackagingImage
            seed={seed}
            priority
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 448px, 384px"
            className="aspect-[2/3] rounded-sm border border-forest-900/10 shadow-[0_30px_60px_-34px_rgb(23_59_42/0.5)]"
            imageClassName="p-4 sm:p-6"
          />
        </div>

        <div className="reveal lg:col-span-7">
          <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold-700 sm:text-xs">
            <span aria-hidden="true" className="h-px w-8 bg-gold-600" />
            {seed.descriptor}
          </p>
          <h1 id="seed-heading" className="mt-5 text-balance font-display text-[2.8rem] font-semibold leading-[1.02] text-forest-900 lining-nums sm:text-6xl lg:text-[4.2rem]">
            {seed.name}
          </h1>
          <p className="mt-4 font-display text-xl italic text-forest-700">{siteConfig.tagline}</p>

          <div className="mt-9 max-w-xl border-l-2 border-gold-400 bg-paper px-6 py-5">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-forest-900">{seedDetailNotice.title}</h2>
            <p className="mt-2 leading-relaxed text-charcoal/75">{seedDetailNotice.body}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <ButtonLink href="/contact" variant="forest" size="lg">
              Enquire About This Seed
              <ArrowRightIcon className="size-4" />
            </ButtonLink>
            <ButtonLink href="/seeds" variant="outline-dark" size="lg">
              <ArrowLeftIcon className="size-4" />
              Back to Seed Catalogue
            </ButtonLink>
          </div>

          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href={contact.phoneHref} className="inline-flex items-center gap-2 font-semibold text-forest-900 hover:underline">
              <PhoneIcon className="size-4 text-gold-700" />
              {contact.phoneDisplay}
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-forest-900 hover:underline"
            >
              <WhatsAppIcon className="size-4 text-gold-700" />
              WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </Container>

      <nav aria-label="More varieties" className="border-t border-forest-900/10">
        <Container className="grid grid-cols-2 gap-4 py-6 text-sm">
          <Link href={seedHref(previous)} className="group flex flex-col items-start gap-1 text-left">
            <span className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-charcoal/60">
              <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              Previous variety
            </span>
            <span className="font-display text-xl font-semibold text-forest-900 lining-nums group-hover:underline">{previous.name}</span>
          </Link>
          <Link href={seedHref(next)} className="group flex flex-col items-end gap-1 text-right">
            <span className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-charcoal/60">
              Next variety
              <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="font-display text-xl font-semibold text-forest-900 lining-nums group-hover:underline">{next.name}</span>
          </Link>
        </Container>
      </nav>
    </section>
  );
}
