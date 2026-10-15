import { DetailIcon, MapPinIcon, RingsIcon, SproutIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { trustItems, type TrustItem } from "@/content/home";

const icons: Record<TrustItem["icon"], typeof RingsIcon> = {
  years: RingsIcon,
  seed: SproutIcon,
  detail: DetailIcon,
  location: MapPinIcon,
};

/** Editorial credibility strip directly beneath the hero. Confirmed facts only. */
export function TrustStrip() {
  return (
    <section aria-label="Company at a glance" className="border-b border-forest-900/10 bg-paper">
      <Container>
        {/* 1px gaps over a tinted background draw hairline dividers at every breakpoint. */}
        <ul className="grid gap-px bg-forest-900/10 sm:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className="flex items-start gap-4 bg-paper py-7 sm:p-7 lg:py-10 xl:p-9">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold-600/50 text-forest-700">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[1.45rem] font-semibold leading-tight text-forest-900">
                    {item.title}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-charcoal/70">{item.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
