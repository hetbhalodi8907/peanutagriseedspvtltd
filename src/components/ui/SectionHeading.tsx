import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Eyebrow + h2 + optional lede. Pass `id` and reference it with `aria-labelledby` on the section. */
export function SectionHeading({ id, eyebrow, title, lede, tone = "dark", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          "mt-5 text-balance font-display text-[2.15rem] font-semibold leading-[1.08] sm:text-5xl lg:text-[3.4rem]",
          tone === "light" ? "text-cream" : "text-forest-900",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", tone === "light" ? "text-cream/75" : "text-charcoal/75")}>
          {lede}
        </p>
      )}
    </div>
  );
}
