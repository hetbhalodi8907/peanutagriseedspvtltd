import { ArrowRightIcon } from "@/components/icons";
import { SeedPreviewGrid } from "@/components/sections/seeds/SeedPreviewGrid";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { qualityProducts } from "@/content/quality";

/** A restrained preview of real packages and names, linking to their pages and the full catalogue. */
export function QualityProducts() {
  return (
    <section aria-labelledby="quality-products-heading" className="bg-cream pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pt-32">
      <Container>
        <SectionHeading
          id="quality-products-heading"
          eyebrow={qualityProducts.eyebrow}
          title={qualityProducts.title}
          lede={qualityProducts.lede}
          className="reveal-on-scroll max-w-3xl"
        />
        <SeedPreviewGrid
          seeds={qualityProducts.showcase}
          className="reveal-on-scroll mt-12 grid-cols-1 min-[480px]:grid-cols-3 lg:mt-14"
          sizes="(min-width: 1280px) 300px, (min-width: 480px) 24vw, 70vw"
        />
        <ButtonLink href={qualityProducts.cta.href} variant="forest" size="lg" className="mt-12">
          {qualityProducts.cta.label}
          <ArrowRightIcon className="size-4" />
        </ButtonLink>
      </Container>
    </section>
  );
}
