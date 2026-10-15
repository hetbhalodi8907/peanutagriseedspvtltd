import { MailIcon, PhoneIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

/** Slim brand bar above the header with direct contact links. */
export function TopBar() {
  const { contact, tagline, yearsInMarket } = siteConfig;

  return (
    <div className="bg-forest-950 text-cream/80">
      <Container className="flex h-9 items-center justify-between gap-4 text-[0.72rem]">
        <p className="truncate">
          <span className="font-display text-sm italic text-gold-400">{tagline}</span>
          <span className="hidden md:inline">
            <span aria-hidden="true" className="mx-3 text-cream/30">
              |
            </span>
            {yearsInMarket} years of market presence in groundnut seeds
          </span>
        </p>
        <div className="flex shrink-0 items-center gap-5">
          <a href={contact.phoneHref} className="flex items-center gap-2 transition-colors hover:text-gold-400">
            <PhoneIcon className="size-3.5" />
            <span className="sr-only sm:not-sr-only">{contact.phoneDisplay}</span>
            <span className="sm:hidden" aria-hidden="true">
              Call
            </span>
          </a>
          <a
            href={contact.emailHref}
            className="hidden items-center gap-2 transition-colors hover:text-gold-400 lg:flex"
          >
            <MailIcon className="size-3.5" />
            {contact.email}
          </a>
        </div>
      </Container>
    </div>
  );
}
