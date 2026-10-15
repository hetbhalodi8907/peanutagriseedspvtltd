import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = ComponentProps<"p"> & {
  tone?: "light" | "dark";
};

/** Small uppercase label with a gold rule, used above section headings. */
export function Eyebrow({ tone = "dark", className, children, ...rest }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] sm:text-xs",
        tone === "light" ? "text-gold-400" : "text-gold-700",
        className,
      )}
      {...rest}
    >
      <span aria-hidden="true" className={cn("h-px w-8 shrink-0", tone === "light" ? "bg-gold-400" : "bg-gold-600")} />
      <span>{children}</span>
    </p>
  );
}
