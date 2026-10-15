import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** Confirmed company facts only — extend via `siteConfig`, never with estimates. */
const facts = [
  { value: `${siteConfig.yearsInMarket} Years`, label: "Of market presence in agricultural seeds" },
  { value: "Premium & Hybrid", label: "Groundnut seed categories" },
  {
    value: siteConfig.contact.factory.region,
    label: `Factory at ${siteConfig.contact.factory.locality}, ${siteConfig.contact.factory.street}`,
  },
  { value: "Farm to Trade", label: "Serving farmers, dealers, distributors and bulk purchasers" },
];

export function BrandFacts() {
  return (
    <section aria-label="Company at a glance" className="border-b border-forest-900/10 bg-paper">
      <Container>
        {/* 1px gaps over a tinted background draw the dividers at every breakpoint. */}
        <dl className="grid gap-px bg-forest-900/10 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact, index) => (
            <div
              key={fact.label}
              className={cn(
                "flex flex-col gap-2 bg-paper py-8 sm:px-8 lg:py-12",
                // First column sits flush with the container edge (2-up on sm, 4-up on lg).
                index === 0 && "sm:pl-0",
                index === 2 && "sm:pl-0 lg:pl-8",
              )}
            >
              <dt className="order-2 text-sm leading-relaxed text-charcoal/70">{fact.label}</dt>
              <dd className="order-1 font-display text-3xl font-semibold text-forest-900 lg:text-[2.1rem]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
