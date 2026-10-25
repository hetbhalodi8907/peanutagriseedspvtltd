import { ArrowRightIcon } from "@/components/icons";
import { ContactActionList } from "@/components/sections/contact/ContactActionList";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { dealerContact } from "@/content/dealer";

/** Closing section: the dealership enquiry form plus the shared call, WhatsApp and email actions. */
export function DealerContact() {
  return (
    <section aria-labelledby="dealer-contact-heading" className="border-t border-forest-900/10 bg-paper py-20 sm:py-24 lg:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal-on-scroll lg:col-span-6">
          <SectionHeading id="dealer-contact-heading" eyebrow={dealerContact.eyebrow} title={dealerContact.title} lede={dealerContact.body} />
          <ButtonLink href={dealerContact.cta.href} variant="forest" size="lg" className="mt-10">
            {dealerContact.cta.label}
            <ArrowRightIcon className="size-4" />
          </ButtonLink>
        </div>
        <div className="reveal-on-scroll lg:col-span-6">
          <ContactActionList />
        </div>
      </Container>
    </section>
  );
}
