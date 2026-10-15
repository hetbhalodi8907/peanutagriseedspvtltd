# PEANUT AGRI SEEDS PVT. LTD. — Website

_Our Culture Is Agriculture._

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No animation library — the intro is pure CSS.

## Run

```bash
npm install
npm run dev     # http://localhost:3000 (generates images first)
npm run build   # generates images, then production build (includes type check + lint)
npm start
npm run images  # regenerate responsive images only (incremental)
```

## Where things live

| Path | Purpose |
| --- | --- |
| `src/config/site.ts` | **Single source of truth** for company facts, leadership, contact details (phone defined once; call and WhatsApp links derive from it) and navigation. Only confirmed facts go here. |
| `src/content/home.ts` | Homepage copy, section by section. Reads facts from `site.ts`. |
| `src/content/seeds.ts` | **Seed catalogue data**: the 11 varieties (slug, exact name, packaging image, descriptor, detail status), search helpers and catalogue copy. The grid, count, search, detail pages and static params all derive from it. |
| `src/content/about.ts` | About Us copy: story, leadership biographies, father–son section, approach, brand statement. |
| `src/content/images.ts` | Photo registry: file, alt text, credit; plus `leadershipPortraits` keyed by leader id. See `docs/IMAGE-CREDITS.md`. |
| `src/assets/images/{home,about}/` | Licensed (CC0) photography, statically imported (auto dimensions, blur placeholders, AVIF/WebP). |
| `src/assets/images/seeds/` | Official packaging images supplied by the company, one per variety, named by slug. Byte-for-byte unaltered. |
| `src/assets/images/leadership/` | Official company-supplied portraits of the MD and CEO (metadata stripped). |
| `src/app/globals.css` | Design tokens (`@theme`), intro animation, page entrance, scroll reveal, reduced-motion rules. |
| `public/brand/peanut-agri-seeds-logo.png` | Official logo (unaltered original, 1254×1254). `src/app/icon.png` / `apple-icon.png` are resized copies. |
| `src/components/brand/` | `BrandLogo` (logo with missing-asset fallback), `BrandLockup` (logo + name), `BrandIntro` + `intro-script.ts`. |
| `src/components/layout/` | `TopBar`, `SiteHeader`, `MobileNav`, `SiteFooter`. |
| `src/components/ui/` | `Container`, `ButtonLink` / `buttonClasses`, `Eyebrow`, `SectionHeading`. |
| `src/components/sections/` | Shared sections: `PageHero`, `ContactDetails`, `UpcomingSection`, `FieldLines`. |
| `src/components/sections/about/` | About page sections, in order: `AboutHero`, `CompanyStory`, `LeadershipProfiles`, `LeadershipBridge`, `ApproachSection`, `BrandStatement`, `AboutContact`. |
| `src/components/sections/seeds/` | Catalogue: `SeedsHero`, `SeedCatalogue` (client: search + grid), `SeedCard`, `PackagingImage`, `SeedsHelp`, and the variety page `SeedDetail`. |
| `src/components/sections/home/` | Homepage sections, in page order: `HomeHero`, `TrustStrip`, `CompanyIntro`, `SeedRangePreview`, `ValuesSection`, `QualityCommitment`, `DealerCta`, `ContactQuickActions`, plus `FloatingWhatsApp`. |
| `src/app/seeds/[slug]/page.tsx` | One statically generated page per variety (`generateStaticParams`, `dynamicParams = false`). Unknown slugs return 404. |
| `image-config.mjs` | Responsive image widths, shared by `next.config.ts`, the loader and the generator. |
| `scripts/optimize-images.mjs` | Build-time generator: writes `public/_img/<name>-<width>.webp` for every site image (not committed). |
| `src/lib/image-loader.ts` | Custom `next/image` loader that points srcsets at the generated files. |
| `src/middleware.ts` | Redirects any URL containing capital letters to lowercase (308). See Gotchas. |
| `src/app/{quality,dealer-enquiry,contact}` | Routes that still render `UpcomingSection` placeholders. Replace each when its module is built. |
| `docs/IMAGE-CREDITS.md` | Source and licence for every photograph. |

## Homepage notes (Phase 2)

- **Seed range:** categories are data in `seedRange.categories` (`src/content/home.ts`). Phase 4/5 can add varieties and real packaging images per category without touching the layout. The category photos are general crop imagery, not packaging.
- **Floating WhatsApp:** shown on the homepage only. It hides while any element marked `data-hide-floating-contact` is on screen (hero, contact section, footer) and whenever a link or button is underneath it.
- **Scroll reveal** (`.reveal-on-scroll`) uses CSS scroll-driven animations. Browsers without support, and visitors who prefer reduced motion, simply see the content.

## About page notes (Phase 3)

- Leadership facts (names, roles, MD/CEO abbreviations) live in `siteConfig.leadership`. Biographies are in `src/content/about.ts`, written only from facts the company supplied.
- Portraits: add or replace a leader photo in `leadershipPortraits`. Profiles use the native 3:4 ratio. If a new photo has a different ratio, update the `aspect-[3/4]` box in `LeadershipProfiles` and the thumbnail crop offsets in `LeadershipBridge`.
- The About WhatsApp link reuses `siteConfig.contact.whatsappHref`, i.e. `https://wa.me/917016017561` plus the pre-filled greeting.

## Seed catalogue notes (Phase 4)

- **Adding or editing a variety:** edit `seedVarieties` in `src/content/seeds.ts` and add its packaging file to `src/assets/images/seeds/<slug>.png`. Everything else follows automatically. Never change a published slug.
- **Phase 5 (verified details):** add the verified fields to `SeedVariety`, set `detailStatus: "published"` for each completed variety, and render those fields in `SeedDetail`. Until then, pages show an honest "being prepared" notice. No per-variety premium/hybrid classification is assigned until the company confirms it.
- **Search** is client-side. It compares upper-case letters and digits only, so "girnar 4", "Girnar-4" and "tj37" all match.
- **Packaging images:** displayed with `object-contain` on a stage whose colour (`#FDF6EA`) matches the images' own opaque background. They're served at quality 85 so the small package text stays sharp.

## Gotchas

- The company name ends with a full stop ("PVT. LTD."). Never place it at the end of a sentence followed by another period.
- **Lowercase URLs (`src/middleware.ts`):** on case-insensitive filesystems (macOS, Windows), Next.js cached the "not found" result for `/seeds/G20` on disk as `G20.html`, which is the same file as the real `g20.html`. That broke the real page until the cache was cleared. The middleware redirects uppercase paths before anything is rendered or cached. Don't remove it.
- **Images are pre-generated, not optimised at runtime.** Next.js's built-in on-the-fly optimiser (`/_next/image`) intermittently left an image variant stuck forever during rapid navigation, with both AVIF and WebP, until the server restarted. Stress tests reproduced it in roughly 1 to 4 of every 6 runs. `scripts/optimize-images.mjs` now writes WebP files at every configured width at build time, and `src/lib/image-loader.ts` serves them as static files (0 stalls in 8 runs). Quality per folder: photos 75, portraits 80, packaging 85, logo 90.
  - **New image folder:** add it to `sources` in the script.
  - **Basenames must be unique** across folders, because the loader maps by file name; the script fails the build on a duplicate.
- **Display-font numerals:** Cormorant renders old-style digits, so "G20" reads like "G2o". Use the `lining-nums` class on any heading that shows product codes or counts.
- `ButtonLink` always sets `inline-flex`, so a `hidden` class on it loses. Control a button's visibility with a wrapper element.

## Brand intro behaviour

- Plays once per browser session (`sessionStorage` key `pas-intro-seen`), ~3.5 s, with a Skip button and Escape key.
- An inline `<head>` script sets `<html data-intro="play|seen">` before first paint, so repeat visits never flash the overlay.
- The animation and the overlay's exit are CSS-only, so it hides itself even if JavaScript fails. Without JavaScript it is skipped (`<noscript>`), and it is skipped entirely for `prefers-reduced-motion`.

## Colour tokens

`forest-900` #173B2A · `forest-700` #28563A · `gold-400` #D9BD79 (on dark) · `gold-700` #7C6428 (gold text on light) · `cream` #F7F4EB · `paper` #FEF8EF (matches the logo background — use behind the logo) · `charcoal` #252923
