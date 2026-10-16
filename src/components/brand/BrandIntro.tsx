"use client";

import { useCallback, useEffect, useState, type AnimationEvent } from "react";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "./BrandLogo";

/** Overlay exit ends at 2900ms + 650ms (see globals.css); remove it shortly after regardless. */
const SAFETY_UNMOUNT_MS = 4200;
const SKIP_FADE_MS = 400;

/**
 * Animated company introduction, played on every full page load (new tab, reload).
 * Rendered in the root layout, which stays mounted across client-side route changes,
 * so navigating within the site never replays it. No browser storage is used.
 */
export function BrandIntro() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  const finish = useCallback(() => {
    document.documentElement.setAttribute("data-intro", "done");
    setVisible(false);
  }, []);

  const skip = useCallback(() => {
    // Releases the delayed page entrance immediately.
    document.documentElement.setAttribute("data-intro", "done");
    setLeaving(true);
    window.setTimeout(() => setVisible(false), SKIP_FADE_MS);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    // Reduced-motion visitors: the boot script marked the page "skip" and CSS hides the intro.
    if (root.getAttribute("data-intro") === "skip") {
      setVisible(false);
      return;
    }

    const safety = window.setTimeout(finish, SAFETY_UNMOUNT_MS);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(safety);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [finish, skip]);

  const onAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && event.animationName === "intro-exit") finish();
  };

  if (!visible) return null;

  return (
    <div className="brand-intro" data-state={leaving ? "leaving" : "playing"} onAnimationEnd={onAnimationEnd}>
      <div className="brand-intro__stage" aria-hidden="true">
        <div className="brand-intro__emblem">
          <span className="brand-intro__ring" />
          <div className="brand-intro__plate">
            <BrandLogo alt="" priority sizes="(min-width: 640px) 216px, 42vw" className="w-full" />
          </div>
        </div>
        <p className="brand-intro__name">{siteConfig.name}</p>
        <span className="brand-intro__rule" />
        <p className="brand-intro__tagline">{siteConfig.tagline}</p>
      </div>
      <button type="button" className="brand-intro__skip" onClick={skip}>
        Skip intro
      </button>
    </div>
  );
}
