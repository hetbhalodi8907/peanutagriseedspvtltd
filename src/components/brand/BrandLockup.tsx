import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { BrandLogo } from "./BrandLogo";

type BrandLockupProps = {
  tone?: "light" | "dark";
  className?: string;
  onNavigate?: () => void;
};

/** Logo + company name, linking home. Used in the header and mobile menu. */
export function BrandLockup({ tone = "dark", className, onNavigate }: BrandLockupProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${siteConfig.name} — Home`}
      className={cn("group flex min-w-0 items-center gap-3 sm:gap-4", className)}
    >
      <span className="shrink-0 overflow-hidden rounded-lg bg-paper">
        <BrandLogo alt="" sizes="(min-width: 1024px) 64px, 52px" className="w-[52px] lg:w-16" />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "truncate text-[0.7rem] font-bold tracking-[0.08em] min-[370px]:text-[0.82rem] min-[370px]:tracking-[0.16em] sm:text-[0.95rem]",
            tone === "dark" ? "text-forest-900" : "text-cream",
          )}
        >
          PEANUT AGRI SEEDS
        </span>
        <span
          className={cn(
            "mt-1.5 text-[0.62rem] font-semibold tracking-[0.32em] sm:text-[0.68rem]",
            tone === "dark" ? "text-gold-700" : "text-gold-400",
          )}
        >
          PVT. LTD.
        </span>
      </span>
    </Link>
  );
}
