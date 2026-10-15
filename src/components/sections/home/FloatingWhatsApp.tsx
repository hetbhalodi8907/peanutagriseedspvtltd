"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** Sections that already show contact actions (or primary CTAs) opt out with this attribute. */
const HIDE_ZONE_SELECTOR = "[data-hide-floating-contact]";
const CONTROL_SELECTOR = 'a[href], button, input, select, textarea, [role="button"]';
/** Extra margin around the button that must also be free of controls. */
const CLEARANCE = 8;

/**
 * Restrained floating WhatsApp shortcut. It stays hidden while
 *  - a hide-zone is on screen (hero, contact section, footer), and
 *  - any link, button or form control sits underneath it,
 * so it never covers CTAs. It sits below the header (z-50) and mobile menu (z-60).
 */
export function FloatingWhatsApp() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [inHideZone, setInHideZone] = useState(true);
  const [overControl, setOverControl] = useState(false);

  useEffect(() => {
    const zones = document.querySelectorAll(HIDE_ZONE_SELECTOR);
    if (zones.length === 0 || !("IntersectionObserver" in window)) {
      setInHideZone(false);
      return;
    }
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setInHideZone(onScreen.size > 0);
    });
    zones.forEach((zone) => observer.observe(zone));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const self = ref.current;
      if (!self) return;
      const r = self.getBoundingClientRect();
      const points: Array<[number, number]> = [
        [r.left - CLEARANCE, r.top - CLEARANCE],
        [r.right + CLEARANCE, r.top - CLEARANCE],
        [r.left - CLEARANCE, r.bottom + CLEARANCE],
        [r.right + CLEARANCE, r.bottom + CLEARANCE],
        [r.left + r.width / 2, r.top + r.height / 2],
      ];
      const covered = points.some(([x, y]) =>
        document.elementsFromPoint(x, y).some((node) => !self.contains(node) && node.closest(CONTROL_SELECTOR)),
      );
      setOverControl(covered);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const hidden = inHideZone || overControl;

  return (
    <a
      ref={ref}
      href={siteConfig.contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      data-state={hidden ? "hidden" : "visible"}
      className={cn(
        "fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-12 items-center gap-2.5 rounded-full bg-forest-900 px-3.5 text-cream shadow-[0_14px_34px_-12px_rgb(15_42_29/0.65)] ring-1 ring-gold-400/40 transition-[opacity,transform,background-color] duration-300 ease-premium hover:bg-forest-700 sm:right-6 sm:pr-5",
        hidden ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      <WhatsAppIcon className="size-5 text-gold-400" />
      <span className="sr-only sm:not-sr-only sm:text-xs sm:font-semibold sm:uppercase sm:tracking-[0.14em]">
        WhatsApp
      </span>
      <span className="sr-only"> — chat with our team (opens in a new tab)</span>
    </a>
  );
}
