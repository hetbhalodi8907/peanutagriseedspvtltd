"use client";

import Image from "next/image";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  /** Width/height classes for the square logo box, e.g. "w-14". */
  className?: string;
  /** Responsive `sizes` hint so Next.js serves an appropriately sized file. */
  sizes: string;
  priority?: boolean;
  /** Pass "" when the logo sits next to visible company-name text. */
  alt?: string;
};

/**
 * The official company logo, rendered unaltered at its native 1:1 ratio.
 * If the asset fails to load, the company name is shown as plain text
 * instead of a broken image (never a substitute logo).
 */
export function BrandLogo({ className, sizes, priority, alt = siteConfig.logo.alt }: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={cn(
          "flex aspect-square items-center justify-center bg-paper p-1 text-center text-[0.55rem] font-bold leading-tight tracking-wider text-forest-900",
          className,
        )}
      >
        {siteConfig.shortName.toUpperCase()}
      </span>
    );
  }

  return (
    <Image
      src={siteConfig.logo.src}
      width={siteConfig.logo.width}
      height={siteConfig.logo.height}
      alt={alt}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={cn("aspect-square h-auto select-none", className)}
      draggable={false}
    />
  );
}
