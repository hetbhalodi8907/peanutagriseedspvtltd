import Image from "next/image";
import { ArrowRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { introduction } from "@/content/home";

/** "Rooted in Agriculture" — company introduction. Leadership biographies arrive in Phase 3. */
export function CompanyIntro() {
  return (
    <section
      id="introduction"
      aria-labelledby="introduction-heading"
      className="scroll-mt-24 overflow-hidden bg-cream py-20 sm:py-24 lg:scroll-mt-28 lg:py-32"
    >
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="reveal-on-scroll relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="absolute -right-3 -top-3 bottom-10 left-10 border border-gold-600/45 sm:-right-5 sm:-top-5" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-forest-900">
            <Image
              src={introduction.image.src}
              alt={introduction.image.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, (min-width: 448px) 448px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative -mt-16 ml-auto mr-4 w-fit max-w-[15rem] bg-forest-900 px-6 py-5 text-cream shadow-[0_24px_50px_-24px_rgb(15_42_29/0.7)] sm:mr-[-1.5rem] lg:-mt-24 lg:mr-[-2.5rem]">
            <span className="block font-display text-5xl font-semibold leading-none text-gold-400">
              {siteConfig.yearsInMarket}
            </span>
            <span className="mt-2 block text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] text-cream/80">
              Years in the agricultural market
            </span>
          </div>
        </div>

        <div className="reveal-on-scroll lg:col-span-7">
          <SectionHeading
            id="introduction-heading"
            eyebrow={introduction.eyebrow}
            title={
              <>
                <span className="block">{introduction.titleLead}</span>
                <span className="block italic text-forest-700">{introduction.titleAccent}</span>
              </>
            }
          />
          <p className="mt-7 max-w-2xl text-base leading-[1.8] text-charcoal/80 sm:text-[1.075rem]">{introduction.body}</p>

          <blockquote className="mt-9 border-l-2 border-gold-400 pl-6">
            <p className="font-display text-[1.7rem] italic leading-snug text-forest-900 sm:text-3xl">{siteConfig.tagline}</p>
          </blockquote>

          <dl className="mt-10 grid max-w-xl grid-cols-1 gap-6 border-t border-forest-900/10 pt-7 min-[480px]:grid-cols-2">
            {siteConfig.leadership.map((leader) => (
              <div key={leader.role}>
                <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-700">{leader.role}</dt>
                <dd className="mt-1.5 font-display text-xl font-semibold text-forest-900">{leader.name}</dd>
              </div>
            ))}
          </dl>

          <ButtonLink href={introduction.cta.href} variant="forest" size="lg" className="mt-10">
            {introduction.cta.label}
            <ArrowRightIcon className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
