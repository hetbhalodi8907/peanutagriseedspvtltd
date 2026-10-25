# PEANUT AGRI SEEDS PVT. LTD. — Website

_Our Culture Is Agriculture._

Repository: [hetbhalodi8907/peanutagriseedspvtltd](https://github.com/hetbhalodi8907/peanutagriseedspvtltd)

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4. No animation library — the intro is pure CSS.

## Run

```bash
npm install
npm run dev     # http://localhost:3000 (generates images first)
npm run build   # generates images, then production build (includes type check + lint)
npm start
npm run images  # regenerate responsive images only (incremental)
npx tsc --noEmit  # type check
npm run lint      # ESLint
```

**Before launching, read [docs/LAUNCH-READINESS.md](docs/LAUNCH-READINESS.md)**: the deployment requirements, environment variables (`SITE_URL`, Resend, `TRUSTED_PROXY_HOPS`), smoke test, rollback and open launch blockers.

The enquiry form needs email settings: copy `.env.example` to `.env.local` and see [docs/INQUIRY-EMAIL-SETUP.md](docs/INQUIRY-EMAIL-SETUP.md). The site works without them, but the form will report that enquiries cannot be sent.

## Tests

End-to-end regression tests (Playwright) live in `tests/` and run against the production build.

```bash
npx playwright install chromium   # once per machine: the test browser
npm test                          # production build, then all tests
npm run test:e2e                  # tests only, against the existing build
```

- **Never sends real email.** The tests start their own servers: the site on port 3100 wired to a local mock email provider (`tests/support/mock-resend.mjs`, port 3201) with a fake key, and a second copy on 3102 with email unconfigured. These values override `.env.local`. Ports 3100, 3102 and 3201 must be free.
- **What's covered:**
  - `tests/e2e/quality-dealer.spec.ts`: Quality and Dealer Enquiry content, metadata, links, previews, navigation, layout at 320–1920px, accessibility and keyboard focus.
  - `tests/e2e/enquiry.spec.ts`: prefill (`?type=dealer`, `?variety=`), protection of typed text, limits, submissions, honest failure, endpoint protections.
  - `tests/e2e/catalogue.spec.ts`: the 25 varieties, verified image mapping, search, variety pages, preselection.
  - `tests/e2e/site.spec.ts`: every page at three widths (axe accessibility scan), contact details, About portraits, logo intro, storage and security headers.
- **Verified catalogue:** `tests/support/varieties.ts` holds the official order, names and SHA-256 of each packaging file. When a variety is added or a package replaced, update it together with `src/content/seeds.ts`, after checking the name printed on the package.
- Output from failed runs goes to `test-results/` (git-ignored).

## Where things live

| Path | Purpose |
| --- | --- |
| `src/config/site.ts` | **Single source of truth** for company facts, leadership, contact details (phone defined once; call and WhatsApp links derive from it) and navigation. Only confirmed facts go here. |
| `src/content/home.ts` | Homepage copy, section by section. Reads facts from `site.ts`. |
| `src/content/seeds.ts` | **Seed catalogue data**: all 25 varieties (slug, exact name, packaging image, descriptor, detail status), search helpers and catalogue copy. The grid, count, search, detail pages and static params all derive from it. |
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
| `src/components/sections/` | Shared sections: `PageHero`, `SplitHero` (inner-page hero with a framed photo), `ContactDetails`, `FieldLines`. |
| `src/components/sections/about/` | About page sections, in order: `AboutHero`, `CompanyStory`, `LeadershipProfiles`, `LeadershipBridge`, `ApproachSection`, `BrandStatement`, `AboutContact`. |
| `src/components/sections/seeds/` | Catalogue: `SeedsHero`, `SeedCatalogue` (client: search + grid), `SeedCard`, `PackagingImage`, `SeedsHelp`, `SeedPreviewGrid` (small linked package previews used on other pages), and the variety page `SeedDetail`. |
| `src/components/sections/home/` | Homepage sections, in page order: `HomeHero`, `TrustStrip`, `CompanyIntro`, `SeedRangePreview`, `ValuesSection`, `QualityCommitment`, `DealerCta`, `ContactQuickActions`, plus `FloatingWhatsApp`. |
| `src/app/seeds/[slug]/page.tsx` | One statically generated page per variety (`generateStaticParams`, `dynamicParams = false`). Unknown slugs return 404. |
| `image-config.mjs` | Responsive image widths, shared by `next.config.ts`, the loader and the generator. |
| `scripts/optimize-images.mjs` | Build-time generator: writes `public/_img/<name>-<width>.webp` for every site image (not committed). |
| `src/lib/image-loader.ts` | Custom `next/image` loader that points srcsets at the generated files. |
| `src/middleware.ts` | Redirects any URL containing capital letters to lowercase (308). See Gotchas. |
| `src/app/quality/page.tsx`, `src/content/quality.ts` | Quality page: hero, philosophy, four principles, a product preview from the catalogue, closing contact band. Sections in `src/components/sections/quality/`. |
| `src/app/dealer-enquiry/page.tsx`, `src/content/dealer.ts` | Dealer Enquiry page: hero, who can enquire, the three-step enquiry process, a collection preview, contact actions. Sections in `src/components/sections/dealer/`. Enquiries go through the Contact page form (`/contact?type=dealer#enquiry`). |
| `src/content/showcase.ts` | `pickSeedVarieties()`: chooses varieties by slug for page previews, always in catalogue order; an unknown slug fails the build. |
| `src/app/api/enquiry/route.ts`, `src/lib/enquiry/` | Enquiry endpoint and its validation, email, Resend and rate-limit modules. See the email setup guide. |
| `src/content/contact.ts` | Contact page copy (hero, hours, location, explore links). |
| `src/lib/business-hours.ts` | Formats `siteConfig.factoryHours` for the Contact page, the footer and the structured data. |
| `src/components/sections/contact/` | Contact page sections: `ContactHero`, `ContactActionList`, `FactoryHours`, `FactoryLocation`, `ContactExplore`, `LocalBusinessJsonLd`, plus `EnquiryForm`. |
| `src/components/sections/contact/EnquiryForm.tsx` | The enquiry form on `/contact` (`?variety=<name or slug>` preselects a variety; `?type=dealer` starts the optional message). |
| `docs/INQUIRY-EMAIL-SETUP.md` | Email provider, environment variables, deployment, live-delivery check, troubleshooting. |
| `src/lib/seo.ts` | `SITE_URL` handling and `pageMetadata()` (titles, descriptions, canonical, Open Graph/Twitter) used by every page. |
| `src/app/robots.ts`, `src/app/sitemap.ts` | `robots.txt` and `sitemap.xml` (the sitemap is empty until `SITE_URL` is set). |
| `src/app/privacy/page.tsx` | Factual Privacy Notice (owner/legal review pending). |
| `docs/LAUNCH-READINESS.md` | Phase 8 audit results, launch blockers, deployment checklist, rollback. |
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

## Enquiry form notes (Phase 6)

- **Hosting:** the site now has one server route (`/api/enquiry`), so it must be hosted with a Node server or serverless functions, not a static export. All pages remain statically generated.
- **Shared validation:** the browser form and the server use the same rules (`src/lib/enquiry/schema.ts`). The variety dropdown and server validation both come from `seedVarietyOptions` in `src/content/seeds.ts`.
- **Variety links:** variety pages link to `/contact?variety=<slug>`; `seedEnquiryHref()` builds the URL.
- **Dealer links:** the Dealer Enquiry page links to `/contact?type=dealer#enquiry` (`dealerEnquiryHref`). The form then starts the optional message with the dealership text from `enquiryTypeMessages` (`src/content/contact.ts`): once, on first load, only while the message is empty, and within the normal message limit. No variety is preselected, and there is no separate dealer form or email flow.

## Quality and Dealer Enquiry pages (Task 04)

- Copy lives in `src/content/quality.ts` and `src/content/dealer.ts`; company facts and the variety count come from `siteConfig` and `seedVarieties`, and previewed packages from the catalogue (`pickSeedVarieties`).
- Keep both pages to what the company has confirmed: no inspection, testing, grading or certification claims, and no dealer benefits, margins, territories, guaranteed supply or response times.
- The hero photos are general CC0 crop imagery (see `docs/IMAGE-CREDITS.md`), never presented as the company's own fields or factory.

## Contact page notes (Phase 7)

- **Factory hours** live only in `siteConfig.factoryHours` (Monday–Saturday 08:00–20:00, Sunday 09:00–14:00, IST). The Contact page table, the hero's "At a glance" panel, the footer summary and the LocalBusiness JSON-LD all read from it, so they cannot drift. Each day appears in exactly one entry. There is deliberately no "Open now" indicator.
- **Location:** "Find Us on Google Maps" uses `factoryMapsHref`, a Maps *address search* built from the exact supplied address. There are no coordinates or pin, because none have been verified against the premises, and no embedded map (it would load third-party scripts and cookies). If the company later confirms an exact Maps place, replace the link in `site.ts`.
- **Page order:** hero → enquiry form (`#enquiry`) with direct contact actions → hours (`#hours`) → location (`#location`) → Continue Exploring. Variety pages link to `/contact?variety=<slug>#enquiry`; the anchor id is `ENQUIRY_ANCHOR` in `site.ts`.
- **Structured data:** the JSON-LD has no `url`/`logo` yet; add them once the production domain is known (SEO phase).

## Launch audit notes (Phase 8)

- **Security headers** are set in `next.config.ts` for every response. The CSP is production-only, because `next dev` needs eval, and it allows `'unsafe-inline'` scripts for Next's static-page bootstrap. If you add any external script, font, image or API, extend the CSP or it will be blocked. `X-Powered-By` is disabled.
- **`SITE_URL`** is read at build time and validated. Without it, the site publishes no canonical or social URLs and an empty sitemap. New pages should export `pageMetadata({ title, description, path })` and be added to `sitemap.ts` if they are not in `mainNav`.
- **Rate-limit identity** uses the right-most trusted `X-Forwarded-For` entry (`TRUSTED_PROXY_HOPS`).
- **Image widths** (`image-config.mjs`) now include 480. Catalogue `sizes` describe the rendered package, not the card.

## Gotchas

- The company name ends with a full stop ("PVT. LTD."). Never place it at the end of a sentence followed by another period.
- **Lowercase URLs (`src/middleware.ts`):** on case-insensitive filesystems (macOS, Windows), Next.js cached the "not found" result for `/seeds/G20` on disk as `G20.html`, which is the same file as the real `g20.html`. That broke the real page until the cache was cleared. The middleware redirects uppercase paths before anything is rendered or cached. Don't remove it.
- **Images are pre-generated, not optimised at runtime.** Next.js's built-in on-the-fly optimiser (`/_next/image`) intermittently left an image variant stuck forever during rapid navigation, with both AVIF and WebP, until the server restarted. Stress tests reproduced it in roughly 1 to 4 of every 6 runs. `scripts/optimize-images.mjs` now writes WebP files at every configured width at build time, and `src/lib/image-loader.ts` serves them as static files (0 stalls in 8 runs). Quality per folder: photos 75, portraits 80, packaging 85, logo 90.
  - **New image folder:** add it to `sources` in the script.
  - **Basenames must be unique** across folders, because the loader maps by file name; the script fails the build on a duplicate.
- **Display-font numerals:** Cormorant renders old-style digits, so "G20" reads like "G2o". Use the `lining-nums` class on any heading that shows product codes or counts.
- `ButtonLink` always sets `inline-flex`, so a `hidden` class on it loses. Control a button's visibility with a wrapper element.

## Brand intro behaviour

- Plays on **every full page load**: a new tab, a reload, or a direct visit to any page. It lasts ~3.5 s and has a Skip button and Escape key. No browser storage is used.
- It does **not** replay on client-side navigation: it lives in the root layout, which stays mounted across route changes.
- An inline `<head>` script sets `<html data-intro="play|skip">` before first paint (`skip` = the visitor prefers reduced motion).
- The animation and the overlay's exit are CSS-only, so it hides itself even if JavaScript fails. Without JavaScript it is skipped (`<noscript>`), and it is skipped entirely for `prefers-reduced-motion`.

## Colour tokens

`forest-900` #173B2A · `forest-700` #28563A · `gold-400` #D9BD79 (on dark) · `gold-700` #7C6428 (gold text on light) · `cream` #F7F4EB · `paper` #FEF8EF (matches the logo background — use behind the logo) · `charcoal` #252923
