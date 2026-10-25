import { FieldLines } from "@/components/sections/FieldLines";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { qualityPrinciples } from "@/content/quality";

/** The four quality principles, set in a hairline grid rather than as separate cards. */
export function QualityPrinciples() {
  return (
    <section aria-labelledby="principles-heading" className="relative isolate overflow-hidden bg-forest-900 py-20 text-cream sm:py-24 lg:py-32">
      <FieldLines className="-z-10 opacity-50" />
      <Container>
        <SectionHeading
          id="principles-heading"
          tone="light"
          eyebrow={qualityPrinciples.eyebrow}
          title={qualityPrinciples.title}
          lede={qualityPrinciples.lede}
          className="reveal-on-scroll"
        />
        <ol className="reveal-on-scroll mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-cream/12 bg-cream/12 md:grid-cols-2 lg:mt-16">
          {qualityPrinciples.items.map((item, index) => (
            <li key={item.title} className="bg-forest-900 p-7 sm:p-10 lg:p-12">
              <span aria-hidden="true" className="font-display text-4xl font-semibold text-gold-400 lining-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold leading-tight sm:text-[1.75rem]">{item.title}</h3>
              <p className="mt-4 max-w-lg leading-relaxed text-cream/75">{item.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
