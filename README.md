# PEANUT AGRI SEEDS PVT. LTD. — Website

_Our Culture Is Agriculture._

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No animation library — the intro is pure CSS.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (includes type check + lint)
npm start
```

## Where things live

| Path | Purpose |
| --- | --- |
| `src/config/site.ts` | **Single source of truth** for company facts, leadership, contact details (phone defined once; call and WhatsApp links derive from it) and navigation. Only confirmed facts go here. |
| `src/content/home.ts` | Homepage copy, section by section. Reads facts from `site.ts`. |
| `src/content/about.ts` | About Us copy: story, leadership biographies, father–son section, approach, brand statement. |
| `src/content/images.ts` | Photo registry: file, alt text, credit; plus `leadershipPortraits` keyed by leader id. See `docs/IMAGE-CREDITS.md`. |
| `src/assets/images/{home,about}/` | Licensed (CC0) photography, statically imported (auto dimensions, blur placeholders, AVIF/WebP). |
| `src/assets/images/leadership/` | Official company-supplied portraits of the MD and CEO (metadata stripped). |
| `src/app/globals.css` | Design tokens (`@theme`), intro animation, page entrance, scroll reveal, reduced-motion rules. |
| `public/brand/peanut-agri-seeds-logo.png` | Official logo (unaltered original, 1254×1254). `src/app/icon.png` / `apple-icon.png` are resized copies. |
| `src/components/brand/` | `BrandLogo` (logo with missing-asset fallback), `BrandLockup` (logo + name), `BrandIntro` + `intro-script.ts`. |
| `src/components/layout/` | `TopBar`, `SiteHeader`, `MobileNav`, `SiteFooter`. |
| `src/components/ui/` | `Container`, `ButtonLink` / `buttonClasses`, `Eyebrow`, `SectionHeading`. |
| `src/components/sections/` | Shared sections: `PageHero`, `ContactDetails`, `UpcomingSection`, `FieldLines`. |
| `src/components/sections/about/` | About page sections, in order: `AboutHero`, `CompanyStory`, `LeadershipProfiles`, `LeadershipBridge`, `ApproachSection`, `BrandStatement`, `AboutContact`. |
| `src/components/sections/home/` | Homepage sections, in page order: `HomeHero`, `TrustStrip`, `CompanyIntro`, `SeedRangePreview`, `ValuesSection`, `QualityCommitment`, `DealerCta`, `ContactQuickActions`, plus `FloatingWhatsApp`. |
| `src/app/{seeds,quality,dealer-enquiry,contact}` | Routes that still render `UpcomingSection` placeholders. Replace each when its module is built. `/about` is complete (Phase 3). |
| `docs/IMAGE-CREDITS.md` | Source and licence for every photograph. |

## Homepage notes (Phase 2)

- **Seed range:** categories are data in `seedRange.categories` (`src/content/home.ts`). Phase 4/5 can add varieties and real packaging images per category without touching the layout. The category photos are general crop imagery, not packaging.
- **Floating WhatsApp:** shown on the homepage only. It hides while any element marked `data-hide-floating-contact` is on screen (hero, contact section, footer) and whenever a link or button is underneath it.
- **Scroll reveal** (`.reveal-on-scroll`) uses CSS scroll-driven animations. Browsers without support, and visitors who prefer reduced motion, simply see the content.

## About page notes (Phase 3)

- Leadership facts (names, roles, MD/CEO abbreviations) live in `siteConfig.leadership`. Biographies are in `src/content/about.ts`, written only from facts the company supplied.
- Portraits: add or replace a leader photo in `leadershipPortraits`. Profiles use the native 3:4 ratio. If a new photo has a different ratio, update the `aspect-[3/4]` box in `LeadershipProfiles` and the thumbnail crop offsets in `LeadershipBridge`.
- The About WhatsApp link reuses `siteConfig.contact.whatsappHref`, i.e. `https://wa.me/917016017561` plus the pre-filled greeting.

## Gotchas

- The company name ends with a full stop ("PVT. LTD."). Never place it at the end of a sentence followed by another period.
- `ButtonLink` always sets `inline-flex`, so a `hidden` class on it loses. Control a button's visibility with a wrapper element.

## Brand intro behaviour

- Plays once per browser session (`sessionStorage` key `pas-intro-seen`), ~3.5 s, with a Skip button and Escape key.
- An inline `<head>` script sets `<html data-intro="play|seen">` before first paint, so repeat visits never flash the overlay.
- The animation and the overlay's exit are CSS-only, so it hides itself even if JavaScript fails. Without JavaScript it is skipped (`<noscript>`), and it is skipped entirely for `prefers-reduced-motion`.

## Colour tokens

`forest-900` #173B2A · `forest-700` #28563A · `gold-400` #D9BD79 (on dark) · `gold-700` #7C6428 (gold text on light) · `cream` #F7F4EB · `paper` #FEF8EF (matches the logo background — use behind the logo) · `charcoal` #252923
