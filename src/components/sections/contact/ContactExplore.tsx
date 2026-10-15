import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { contactExplore } from "@/content/contact";

/** Closing navigation band: next steps from the Contact page. */
export function ContactExplore() {
  return (
    <section aria-labelledby="explore-heading" className="border-t border-forest-900/10 bg-paper py-16 sm:py-20">
      <Container>
        <h2 id="explore-heading" className="font-display text-3xl font-semibold text-forest-900 sm:text-4xl">
          {contactExplore.title}
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-px bg-forest-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {contactExplore.links.map((link) => {
            const content = (
              <>
                <span className="flex items-center justify-between gap-3 font-semibold text-forest-900">
                  {link.label}
                  <ArrowRightIcon className="size-4 shrink-0 text-gold-700 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-charcoal/65">{link.description}</span>
              </>
            );
            const className = "group block h-full bg-paper p-6 transition-colors hover:bg-white sm:p-7";
            return (
              <li key={link.href}>
                {link.href.startsWith("#") ? (
                  <a href={link.href} className={className}>
                    {content}
                  </a>
                ) : (
                  <Link href={link.href} className={className}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
