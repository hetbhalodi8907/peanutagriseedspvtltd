export const INTRO_STORAGE_KEY = "pas-intro-seen";

/**
 * Runs inline in <head> before first paint. Marks <html data-intro> as:
 *  - "seen" → skip the intro (already shown this session, or reduced motion)
 *  - "play" → show the intro
 * If this script never runs, the CSS-only intro still plays and hides itself.
 */
export const introBootScript = `(function(){try{var d=document.documentElement;var r=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.setAttribute('data-intro',(r||sessionStorage.getItem('${INTRO_STORAGE_KEY}'))?'seen':'play');}catch(e){}})();`;

/** For visitors without JavaScript: skip the intro entirely. */
export const introNoScriptStyle = `<style>.brand-intro{display:none!important}</style>`;
