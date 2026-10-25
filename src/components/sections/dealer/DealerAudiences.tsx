import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { dealerAudiences } from "@/content/dealer";

/** The kinds of business invited to enquire, with an honest note that an enquiry is not an approval. */
export function DealerAudiences() {
  return (
    <section aria-labelledby="audiences-heading" className="bg-cream py-20 sm:py-24 lg:py-32">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal-on-scroll lg:col-span-5">
          <SectionHeading id="audiences-heading" eyebrow={dealerAudiences.eyebrow} title={dealerAudiences.title} lede={dealerAudiences.lede} />
          <p className="mt-8 max-w-xl border-l-2 border-gold-400 bg-paper px-5 py-4 text-sm leading-relaxed text-charcoal/75">
            {dealerAudiences.note}
          </p>
        </div>
        <ul className="reveal-on-scroll border-t border-forest-900/12 lg:col-span-7 lg:mt-3">
          {dealerAudiences.items.map((item) => (
            <li key={item} className="flex items-center gap-5 border-b border-forest-900/12 py-6 sm:py-7">
              <span aria-hidden="true" className="size-2 shrink-0 rotate-45 bg-gold-600" />
              <span className="font-display text-[1.6rem] font-semibold leading-tight text-forest-900 sm:text-[1.9rem]">{item}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
