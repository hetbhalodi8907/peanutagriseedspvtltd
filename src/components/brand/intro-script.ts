/**
 * Runs inline in <head> before first paint, on every full document load (new tab,
 * reload, address bar). Marks <html data-intro> as:
 *  - "skip" → visitor prefers reduced motion; the intro is not shown
 *  - "play" → show the intro
 * There is deliberately no storage flag, so every full page load replays the intro.
 * Client-side route changes don't re-run this script or remount the intro (it lives in
 * the root layout), so navigating within the site never replays it.
 * If this script never runs, the CSS-only intro still plays and hides itself.
 */
export const introBootScript = `(function(){try{var d=document.documentElement;var r=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.setAttribute('data-intro',r?'skip':'play');}catch(e){}})();`;

/** For visitors without JavaScript: skip the intro entirely. */
export const introNoScriptStyle = `<style>.brand-intro{display:none!important}</style>`;
