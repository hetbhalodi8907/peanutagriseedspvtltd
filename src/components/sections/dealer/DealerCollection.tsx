import { ArrowRightIcon } from "@/components/icons";
import { SeedPreviewGrid } from "@/components/sections/seeds/SeedPreviewGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { dealerCollection } from "@/content/dealer";

/** A compact selection from the catalogue, linking to each variety page and to /seeds. */
export function DealerCollection() {
  return (
    <section aria-labelledby="dealer-collection-heading" className="bg-cream py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          id="dealer-collection-heading"
          eyebrow={dealerCollection.eyebrow}
          title={dealerCollection.title}
          lede={dealerCollection.lede}
          className="reveal-on-scroll"
        />
        <SeedPreviewGrid
          seeds={dealerCollection.showcase}
          className="reveal-on-scroll mt-12 grid-cols-2 md:grid-cols-4 lg:mt-14"
          sizes="(min-width: 1280px) 210px, (min-width: 768px) 18vw, 38vw"
        />
        <ButtonLink href={dealerCollection.cta.href} variant="forest" size="lg" className="mt-12">
          {dealerCollection.cta.label}
          <ArrowRightIcon className="size-4" />
        </ButtonLink>
      </Container>
    </section>
  );
}
