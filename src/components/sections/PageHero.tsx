import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FieldLines } from "./FieldLines";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  children?: ReactNode;
};

/** Standard banner for inner pages. */
export function PageHero({ eyebrow, title, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-900 text-cream">
      <FieldLines className="-z-10 opacity-70" />
      <Container className="reveal py-16 sm:py-20 lg:py-24">
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children && <div className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">{children}</div>}
      </Container>
    </section>
  );
}
