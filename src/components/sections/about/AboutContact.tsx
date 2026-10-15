import { ArrowRightIcon } from "@/components/icons";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { aboutContact } from "@/content/about";

/** Factory and contact details with the page's closing calls to action. */
export function AboutContact() {
  return (
    <section aria-labelledby="about-contact-heading" className="bg-cream py-20 sm:py-24 lg:py-32">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal-on-scroll lg:col-span-6">
          <SectionHeading
            id="about-contact-heading"
            eyebrow={aboutContact.eyebrow}
            title={aboutContact.title}
            lede={aboutContact.lede}
          />
          <div className="mt-10 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            {aboutContact.ctas.map((cta, index) => (
              <ButtonLink key={cta.href} href={cta.href} variant={cta.variant} size="lg">
                {cta.label}
                {index === 0 && <ArrowRightIcon className="size-4" />}
              </ButtonLink>
            ))}
          </div>
        </div>
        <div className="reveal-on-scroll lg:col-span-6">
          <ContactDetails title={siteConfig.name} headingAs="h3" showWhatsApp />
        </div>
      </Container>
    </section>
  );
}
