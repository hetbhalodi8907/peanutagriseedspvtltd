"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav } from "@/config/site";
import { cn } from "@/lib/cn";
import { MobileNav } from "./MobileNav";
import { isActivePath } from "./nav-utils";

/**
 * Sticky site header. Keep the background solid (no backdrop-filter):
 * a filter would become the containing block for the fixed mobile sheet.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = mainNav.filter((item) => !item.isCta);
  const cta = mainNav.find((item) => item.isCta);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-paper transition-shadow duration-300",
        scrolled ? "border-forest-900/10 shadow-[0_8px_30px_-12px_rgb(23_59_42/0.25)]" : "border-forest-900/8",
      )}
    >
      <Container className="flex h-[76px] items-center justify-between gap-3 sm:gap-6 lg:h-[92px]">
        <BrandLockup />

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          <ul className="flex items-center gap-8 xl:gap-10">
            {links.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-[0.84rem] font-semibold tracking-[0.04em] transition-colors",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold-600 after:transition-transform after:duration-300",
                      active
                        ? "text-forest-900 after:scale-x-100"
                        : "text-charcoal/75 after:scale-x-0 hover:text-forest-900 hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {cta && (
            <Link
              href={cta.href}
              aria-current={isActivePath(pathname, cta.href) ? "page" : undefined}
              className={buttonClasses("forest", "md")}
            >
              {cta.label}
            </Link>
          )}
        </nav>

        <MobileNav items={mainNav} pathname={pathname} />
      </Container>
    </header>
  );
}
