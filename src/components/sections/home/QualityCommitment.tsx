import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { qualityCommitment } from "@/content/home";

/** Full-bleed photo / statement split. Detailed quality content belongs on /quality. */
export function QualityCommitment() {
  return (
    <section aria-labelledby="quality-heading" className="grid grid-cols-1 bg-forest-900 text-cream lg:grid-cols-2">
      <div className="relative min-h-[320px] sm:min-h-[440px] lg:min-h-[640px]">
        <Image
          src={qualityCommitment.image.src}
          alt={qualityCommitment.image.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="reveal-on-scroll flex items-center px-5 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
        <div className="max-w-xl">
          <SectionHeading id="quality-heading" tone="light" eyebrow={qualityCommitment.eyebrow} title={qualityCommitment.title} />
          <span aria-hidden="true" className="mt-8 block h-px w-16 bg-gold-400" />
          <p className="mt-8 text-base leading-[1.8] text-cream/80 sm:text-lg">{qualityCommitment.body}</p>
          <ButtonLink href={qualityCommitment.cta.href} variant="gold" size="lg" className="mt-10">
            {qualityCommitment.cta.label}
            <ArrowRightIcon className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
