import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactDetails } from "./ContactDetails";

type UpcomingSectionProps = {
  /** What this page will contain once the module is built. */
  planned: string[];
  note?: string;
};

/**
 * Honest placeholder for a page whose content arrives in a later phase.
 * Replace this component on each page when the real module is built.
 */
export function UpcomingSection({ planned, note }: UpcomingSectionProps) {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Eyebrow>In preparation</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-semibold text-forest-900 sm:text-4xl">
            This section is being prepared
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-charcoal/75">
            {note ?? "Detailed information for this page will be published soon. It will include:"}
          </p>
          <ul className="mt-8 space-y-4 border-l border-gold-600/50 pl-6">
            {planned.map((item) => (
              <li key={item} className="leading-relaxed text-charcoal/85">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <ContactDetails title="Need information now?" />
        </div>
      </Container>
    </section>
  );
}
