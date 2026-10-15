import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "gold" | "forest" | "outline-light" | "outline-dark";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-md text-center font-semibold uppercase tracking-[0.12em] transition-[color,background-color,border-color,transform] duration-300 ease-premium active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  gold: "bg-gold-400 text-forest-900 hover:bg-gold-200 active:bg-gold-600",
  forest: "bg-forest-900 text-cream hover:bg-forest-700 active:bg-forest-950",
  "outline-light": "border border-cream/35 text-cream hover:border-gold-400 hover:text-gold-400 active:bg-cream/10",
  "outline-dark":
    "border border-forest-900/25 text-forest-900 hover:border-forest-900 hover:bg-forest-900 hover:text-cream active:bg-forest-950",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-xs",
  lg: "min-h-13 px-7 text-[0.8rem]",
};

export function buttonClasses(variant: ButtonVariant = "gold", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

/**
 * A link styled as a button. Internal paths use Next.js client navigation;
 * `tel:`, `mailto:` and external URLs render a plain anchor.
 */
export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}
