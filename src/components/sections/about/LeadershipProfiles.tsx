import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leaders, leadershipIntro, type LeaderProfile } from "@/content/about";
import { cn } from "@/lib/cn";

/**
 * Managing Director and CEO profiles. Portraits are the company-supplied photographs,
 * shown at their native 3:4 ratio (no cropping) and paired by `id`, never by position.
 */
export function LeadershipProfiles() {
  const md = leaders.find((leader) => leader.id === "md")!;
  const ceo = leaders.find((leader) => leader.id === "ceo")!;

  return (
    <section id="leadership" aria-labelledby="leadership-heading" className="scroll-mt-24 bg-cream lg:scroll-mt-28">
      <Container className="pb-20 pt-4 sm:pb-24 lg:pb-32">
        <SectionHeading
          id="leadership-heading"
          eyebrow={leadershipIntro.eyebrow}
          title={leadershipIntro.title}
          lede={leadershipIntro.lede}
          className="reveal-on-scroll"
        />
        <Profile leader={md} variant="primary" className="mt-14 lg:mt-20" />
      </Container>

      <div className="border-y border-forest-900/10 bg-paper">
        <Container className="py-20 sm:py-24 lg:py-32">
          <Profile leader={ceo} variant="secondary" />
        </Container>
      </div>
    </section>
  );
}

type ProfileProps = { leader: LeaderProfile; variant: "primary" | "secondary"; className?: string };

function Profile({ leader, variant, className }: ProfileProps) {
  const portraitRight = variant === "secondary";
  const headingId = `leader-${leader.id}`;

  return (
    <article aria-labelledby={headingId} className={cn("grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20", className)}>
      <div className={cn("reveal-on-scroll lg:col-span-5", portraitRight && "lg:order-2")}>
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          {variant === "primary" ? (
            <div aria-hidden="true" className="absolute -bottom-4 -left-4 right-8 top-8 border border-gold-600/50 sm:-bottom-5 sm:-left-5" />
          ) : (
            <>
              <span aria-hidden="true" className="absolute -right-3 -top-3 size-20 border-r border-t border-gold-600/70 sm:-right-4 sm:-top-4" />
              <span aria-hidden="true" className="absolute -bottom-3 -left-3 size-20 border-b border-l border-gold-600/70 sm:-bottom-4 sm:-left-4" />
            </>
          )}
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-forest-900 shadow-[0_30px_60px_-30px_rgb(15_42_29/0.55)]">
            <Image
              src={leader.portrait.src}
              alt={leader.portrait.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1280px) 460px, (min-width: 1024px) 38vw, 384px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className={cn("reveal-on-scroll lg:col-span-7", portraitRight && "lg:order-1")}>
        <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold-700 sm:text-xs">
          <span aria-hidden="true" className="h-px w-8 bg-gold-600" />
          {leader.role} ({leader.roleShort})
        </p>
        <h3 id={headingId} className="mt-4 font-display text-[2.3rem] font-semibold leading-tight text-forest-900 sm:text-5xl">
          {leader.name}
        </h3>
        <p className="mt-4 max-w-xl text-balance font-display text-xl italic leading-snug text-forest-700 sm:text-2xl">
          {leader.intro}
        </p>

        <div className="mt-7 max-w-2xl space-y-5 text-base leading-[1.85] text-charcoal/80">
          {leader.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-9 max-w-2xl border-t border-forest-900/10 pt-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-charcoal/60">Areas of focus</p>
          <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
            {leader.focus.map((item) => (
              <li key={item} className="flex items-center gap-3 font-semibold text-forest-900">
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
