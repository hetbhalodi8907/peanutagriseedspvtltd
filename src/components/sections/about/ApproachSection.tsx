import { ConversationIcon, DetailIcon, RingsIcon, SproutIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approach, type ApproachTheme } from "@/content/about";

const icons: Record<ApproachTheme["icon"], typeof RingsIcon> = {
  years: RingsIcon,
  detail: DetailIcon,
  seed: SproutIcon,
  relationships: ConversationIcon,
};

/** "Why Our Approach Matters" — four principles, set as an editorial row rather than cards. */
export function ApproachSection() {
  return (
    <section aria-labelledby="approach-heading" className="bg-cream py-20 sm:py-24 lg:py-32">
      <Container>
        <SectionHeading
          id="approach-heading"
          eyebrow={approach.eyebrow}
          title={approach.title}
          lede={approach.lede}
          className="reveal-on-scroll"
        />
        <ol className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-16 xl:grid-cols-4">
          {approach.themes.map((theme, index) => {
            const Icon = icons[theme.icon];
            return (
              <li key={theme.title} className="reveal-on-scroll border-t border-gold-600/50 pt-7">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full bg-forest-900 text-gold-400">
                    <Icon className="size-5" />
                  </span>
                  <span aria-hidden="true" className="font-display text-3xl font-semibold text-gold-600/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-forest-900">{theme.title}</h3>
                <p className="mt-3 leading-relaxed text-charcoal/75">{theme.text}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
