import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/config/site";
import { brandStatement } from "@/content/about";

/** Full-bleed brand statement built around the tagline. */
export function BrandStatement() {
  return (
    <section aria-label="Our purpose" className="relative isolate overflow-hidden bg-forest-950 text-cream">
      <Image
        src={brandStatement.image.src}
        alt={brandStatement.image.alt}
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[50%_60%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(15_42_29/0.82),rgb(15_42_29/0.9))] lg:bg-[linear-gradient(90deg,rgb(15_42_29/0.95)_0%,rgb(15_42_29/0.84)_50%,rgb(23_59_42/0.74)_100%)]"
      />

      <Container className="grid grid-cols-1 items-end gap-12 py-24 sm:py-28 lg:grid-cols-12 lg:py-36">
        <div className="reveal-on-scroll lg:col-span-7">
          <Eyebrow tone="light">{brandStatement.eyebrow}</Eyebrow>
          <h2 id="purpose-heading" className="mt-6 font-display font-semibold leading-[0.98] tracking-[-0.01em]">
            <span className="block text-[2.6rem] min-[400px]:text-5xl sm:text-6xl lg:text-7xl">Our Culture Is</span>
            <span className="block text-[3.4rem] italic text-gold-400 min-[400px]:text-[4rem] sm:text-[5.5rem] lg:text-[7rem]">
              Agriculture.
            </span>
          </h2>
        </div>
        <div className="reveal-on-scroll lg:col-span-5 lg:pb-4">
          <span aria-hidden="true" className="block h-px w-16 bg-gold-400" />
          <p className="mt-7 text-base leading-[1.85] text-cream/85 sm:text-lg">{brandStatement.body}</p>
          <p className="mt-7 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold-400">{siteConfig.name}</p>
        </div>
      </Container>
    </section>
  );
}
