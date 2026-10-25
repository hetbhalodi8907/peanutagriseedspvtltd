import { DetailIcon } from "@/components/icons";
import { FieldLines } from "@/components/sections/FieldLines";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { dealerProcess } from "@/content/dealer";

/** Three plain steps, joined by a gold rule on wider screens. */
export function DealerProcess() {
  return (
    <section aria-labelledby="process-heading" className="relative isolate overflow-hidden bg-forest-900 py-20 text-cream sm:py-24 lg:py-32">
      <FieldLines className="-z-10 opacity-50" />
      <Container>
        <SectionHeading
          id="process-heading"
          tone="light"
          eyebrow={dealerProcess.eyebrow}
          title={dealerProcess.title}
          lede={dealerProcess.lede}
          className="reveal-on-scroll"
        />
        <div className="reveal-on-scroll relative mt-14 lg:mt-16">
          {/* One rule from the first step number to the last (centres of the 3rem circles), drawn behind them. */}
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 hidden h-px bg-gold-400/35 md:block md:right-[calc((100%_-_4rem)/3_-_1.5rem)] lg:right-[calc((100%_-_6rem)/3_-_1.5rem)]"
          />
          <ol className="relative grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
            {dealerProcess.steps.map((step, index) => (
              <li key={step.title}>
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full border border-gold-400/60 bg-forest-900 font-display text-xl font-semibold text-gold-400 lining-nums"
                >
                  {index + 1}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold leading-tight sm:text-[1.75rem]">{step.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-cream/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <p className="reveal-on-scroll mt-14 flex items-start gap-3 border-t border-cream/15 pt-8 font-semibold text-cream/90 lg:mt-16">
          <DetailIcon className="mt-0.5 size-5 shrink-0 text-gold-400" />
          {dealerProcess.note}
        </p>
      </Container>
    </section>
  );
}
