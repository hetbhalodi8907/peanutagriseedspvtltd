import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { FieldLines } from "@/components/sections/FieldLines";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { seedCatalogue } from "@/content/seeds";

/** Closing band on the catalogue: route visitors to the existing contact options. */
export function SeedsHelp() {
  const { contact } = siteConfig;

  return (
    <section aria-labelledby="seeds-help-heading" className="bg-cream pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-sm bg-forest-950 px-6 py-12 text-cream sm:px-12 lg:px-16 lg:py-14">
          <FieldLines className="-z-10 opacity-70" />
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 id="seeds-help-heading" className="text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">
                {seedCatalogue.help.title}
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-cream/75">{seedCatalogue.help.body}</p>
              <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a href={contact.phoneHref} className="inline-flex items-center gap-2 text-cream/85 hover:text-gold-400">
                  <PhoneIcon className="size-4 text-gold-400" />
                  {contact.phoneDisplay}
                </a>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cream/85 hover:text-gold-400"
                >
                  <WhatsAppIcon className="size-4 text-gold-400" />
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-3 min-[480px]:flex-row lg:col-span-5 lg:flex-col lg:items-stretch">
              <ButtonLink href="/contact" variant="gold" size="lg">
                Contact Our Team
                <ArrowRightIcon className="size-4" />
              </ButtonLink>
              <ButtonLink href="/dealer-enquiry" variant="outline-light" size="lg">
                Become a Dealer
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
