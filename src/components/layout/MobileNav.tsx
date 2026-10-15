"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { CloseIcon, MailIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { siteConfig, type NavItem } from "@/config/site";
import { cn } from "@/lib/cn";
import { isActivePath } from "./nav-utils";

const SHEET_ID = "mobile-navigation";
const DESKTOP_QUERY = "(min-width: 1024px)";

type MobileNavProps = {
  items: NavItem[];
  pathname: string;
};

/** Hamburger toggle + full-screen navigation sheet for screens below `lg`. */
export function MobileNav({ items, pathname }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close whenever the route changes (link click, back/forward).
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const sheet = sheetRef.current;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(sheet?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      // Keep keyboard focus inside the open sheet.
      const els = focusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onViewportChange = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const close = () => setOpen(false);
  const { contact } = siteConfig;

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={SHEET_ID}
        onClick={() => setOpen(true)}
        className="-mr-2 flex size-11 items-center justify-center rounded-md text-forest-900 transition-colors hover:bg-forest-900/5"
      >
        <MenuIcon className="size-6" />
        <span className="sr-only">Open menu</span>
      </button>

      {open && (
        <div
          ref={sheetRef}
          id={SHEET_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="nav-sheet fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-forest-900 text-cream"
        >
          <div className="flex h-[76px] shrink-0 items-center justify-between gap-4 border-b border-cream/10 px-5 sm:px-8">
            <BrandLockup tone="light" onNavigate={close} />
            <button
              type="button"
              onClick={close}
              className="-mr-2 flex size-11 shrink-0 items-center justify-center rounded-md text-cream transition-colors hover:bg-cream/10"
            >
              <CloseIcon className="size-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 px-5 py-8 sm:px-8">
            <ol className="divide-y divide-cream/10 border-y border-cream/10">
              {items.map((item, index) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-baseline gap-5 py-4 transition-colors",
                        active ? "text-gold-400" : "text-cream hover:text-gold-400",
                      )}
                    >
                      <span className="w-6 text-xs font-semibold tracking-widest text-gold-400/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[1.75rem] font-semibold leading-tight">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="space-y-5 border-t border-cream/10 px-5 pb-10 pt-6 sm:px-8">
            <div className="flex flex-col gap-3 text-sm text-cream/80">
              <a href={contact.phoneHref} className="flex items-center gap-3 hover:text-gold-400">
                <PhoneIcon className="size-4 text-gold-400" />
                {contact.phoneDisplay}
              </a>
              <a href={contact.emailHref} className="flex items-center gap-3 break-all hover:text-gold-400">
                <MailIcon className="size-4 shrink-0 text-gold-400" />
                {contact.email}
              </a>
            </div>
            <p className="font-display text-lg italic text-gold-400">{siteConfig.tagline}</p>
          </div>
        </div>
      )}
    </div>
  );
}
