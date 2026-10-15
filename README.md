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
| `src/config/site.ts` | **Single source of truth** for company facts, contact details and navigation. Only confirmed facts go here. |
| `src/app/globals.css` | Design tokens (`@theme`), intro animation, page-entrance and reduced-motion rules. |
| `public/brand/peanut-agri-seeds-logo.png` | Official logo (unaltered original, 1254×1254). `src/app/icon.png` / `apple-icon.png` are resized copies. |
| `src/components/brand/` | `BrandLogo` (logo with missing-asset fallback), `BrandLockup` (logo + name), `BrandIntro` + `intro-script.ts`. |
| `src/components/layout/` | `TopBar`, `SiteHeader`, `MobileNav`, `SiteFooter`. |
| `src/components/ui/` | `Container`, `ButtonLink` / `buttonClasses`, `Eyebrow`. |
| `src/components/sections/` | `HomeHero`, `BrandFacts`, `PageHero`, `ContactDetails`, `UpcomingSection`, `FieldLines`. |
| `src/app/{about,seeds,quality,dealer-enquiry,contact}` | Routes. Each currently renders `UpcomingSection` — replace it when that module is built. |

## Brand intro behaviour

- Plays once per browser session (`sessionStorage` key `pas-intro-seen`), ~3.5 s, with a Skip button and Escape key.
- An inline `<head>` script sets `<html data-intro="play|seen">` before first paint, so repeat visits never flash the overlay.
- The animation and the overlay's exit are CSS-only, so it hides itself even if JavaScript fails. Without JavaScript it is skipped (`<noscript>`), and it is skipped entirely for `prefers-reduced-motion`.

## Colour tokens

`forest-900` #173B2A · `forest-700` #28563A · `gold-400` #D9BD79 (on dark) · `gold-700` #7C6428 (gold text on light) · `cream` #F7F4EB · `paper` #FEF8EF (matches the logo background — use behind the logo) · `charcoal` #252923
