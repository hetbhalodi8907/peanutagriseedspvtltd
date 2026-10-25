# Launch readiness: PEANUT AGRI SEEDS PVT. LTD. website

_Our Culture Is Agriculture._

Phase 8 audit, 15 October 2026 (branch `phase-8-launch-audit`). This document records what was checked, what was fixed, and what must still happen before the public launch.

> **Verdict:** the **code** is ready for a production deployment. The **website is not yet ready for public launch**: live email delivery is unverified, and the production domain (`SITE_URL`) and hosting have not been set up. See [Required before public launch](#required-before-public-launch).

---

## 1. Status at a glance

### Ready (verified in this audit)

- **Pages:** all public pages load, unknown URLs return 404 (with `noindex`), and uppercase URLs redirect to lowercase.
- **Branding:**
  - The official logo is unaltered.
  - The animated intro (skip, Escape, reduced motion; plays on every full page load, never on client-side navigation) works.
  - Desktop and mobile navigation work.
- **About:** the MD and CEO profiles use the correct supplied portraits.
- **Seed catalogue:**
  - All 25 varieties are present (11 from Phase 4, 14 added in Phase 9), with correct packaging images, search, detail pages, previous/next links and 404s.
  - The "Detailed information is being prepared" notices remain (Phase 5 deferred).
- **Contact:**
  - The enquiry form validates in the browser and on the server, prefills from all 25 variety pages, and never shows a false success.
  - Call, WhatsApp, email and Maps links are correct.
  - Hours are correct (Mon–Sat 8:00 AM–8:00 PM, Sun 9:00 AM–2:00 PM) and shared by the page, footer and structured data.
- **Security:**
  - Security headers are in place, and `X-Powered-By` is removed.
  - The API key is server-only, and no source maps are shipped.
  - Request limits, honeypot, duplicate protection and the fixed recipient all work.
- **Accessibility:** axe-core reports 0 violations on every page type (desktop and mobile, including form errors and the open menu). Lighthouse Accessibility scores 100 on the four main pages.
- **SEO:**
  - Unique titles and descriptions on every page.
  - Open Graph and Twitter text tags.
  - `robots.txt` and `sitemap.xml`.
  - Canonical and social URLs once `SITE_URL` is set (verified with a test build).
- **Privacy:** no cookies, analytics, trackers or third-party requests. A factual Privacy Notice is linked from the footer and the form.

### Required before public launch

| # | Item | Why it blocks launch |
| --- | --- | --- |
| 1 | **Configure Resend and verify live delivery** (§4) | Without it the form reports "could not send" to every visitor. No real email has ever been sent. |
| 2 | **Choose hosting that runs Node.js / server functions** (§6) | `/api/enquiry` is a server route; a static-only host would remove the form's backend. |
| 3 | **Set `SITE_URL` to the real domain for the production build** (§5) | Without it there are no canonical URLs, no social image URLs and an empty sitemap. |
| 4 | **Serve over HTTPS behind a proxy that sets `X-Forwarded-For`**, and set `TRUSTED_PROXY_HOPS` to match (§3) | Needed for HSTS and for rate limits to identify visitors correctly. |
| 5 | **Owner review of the Privacy Notice** (`/privacy`) (§7) | It describes the site's technical behaviour only. Retention periods and legal wording need the company's input or legal review. |

### Recommended improvements (not blocking)

- **Plan an upgrade to Next.js 16.** It resolves a dependency advisory that doesn't affect this site (§3).
- **Shared rate-limit store:** if hosting is serverless or multi-instance, use Upstash/Redis so limits are shared (§3).
- **Spam:** add Cloudflare Turnstile only if spam appears.
- **Verify the factory's exact Google Maps place** and switch the button from address search to that place.
- **Placeholder pages:** done. `/quality` and `/dealer-enquiry` have real content (Task 04); no placeholder pages remain.
- **Social image:** approve the official logo, or supply a dedicated 1200×630 image.
- **Performance:**
  - Consider a shorter or skippable-by-default intro if first-visit LCP matters more than the brand moment (§8).
  - Drop legacy-browser polyfills through a browserslist setting.

### Deferred by owner

- **Phase 5 (verified technical seed information):** no germination, yield, duration, disease-resistance, seed-rate, oil-content or hybrid-classification data has been added, and none should be until the company supplies it.

---

## 2. Baseline and method

Run before any Phase 8 change, on commit `a946386` (Phase 7):

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | Passed |
| `npm run lint` | Passed (0 problems) |
| `npm run build` | Passed: 22 static pages + `/api/enquiry` |
| Browser regression suites (Phases 1, 2, 3, 4, 6, 7) | 190 / 190 checks passed, no unexpected console output |
| axe-core 4.10.3 | **42 violation instances** (4 rules), all pre-existing |
| Lighthouse 12.8.2 | See §8 |

- **Stack:** Next.js 15.5.28 (latest 15.x), React 19.1.0, TypeScript 5.9.3, Tailwind CSS 4.3.3, sharp 0.35.5, Node.js 20.19.0 (development).
- **Test environment:** browser suites run in headless Chrome via Playwright against `next start`. Email is tested against a local mock of the Resend API.

---

## 3. Security review

This was an internal code and configuration review with automated checks. **It was not an external penetration test.**

| Area | Finding | Action |
| --- | --- | --- |
| Security headers | None were sent | **Fixed:** CSP (production), HSTS (production), `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, on every response |
| Server fingerprint | `X-Powered-By: Next.js` | **Fixed:** removed |
| Rate-limit identity | The left-most `X-Forwarded-For` entry was used, which a client can forge even behind a proxy | **Fixed:** uses the right-most trusted entry (`TRUSTED_PROXY_HOPS`, default 1). Tested: rotating forged entries no longer dodge the limit |
| Recipient / sender | Fixed in server config; request fields `to`/`from`/`cc`/`subject` are ignored | Verified (tests) |
| Header injection / HTML | Single-line fields strip line breaks; messages are HTML-escaped and treated as plain text | Verified (tests) |
| API key exposure | Absent from all client files, rendered pages and error responses; no source maps shipped; no `NEXT_PUBLIC_` secrets; never in git history | Verified |
| Request hygiene | Same-origin check, JSON-only, 8 KB body limit, honeypot, minimum fill time, duplicate protection, generic error messages | Verified (tests) |
| Open redirect | The lowercase redirect keeps the same host | Verified (tests) |
| Unsafe HTML | The only `dangerouslySetInnerHTML` uses are the static intro boot script and escaped JSON-LD | Reviewed |
| External links | `target="_blank"` links use `rel="noopener noreferrer"` | Verified |

### Dependencies (`npm audit`)

| Severity | Package | Path | Assessment |
| --- | --- | --- | --- |
| High (reported as moderate via `next`) | `postcss` 8.4.31 bundled inside `next` | production | Advisories need attacker-controlled CSS; this site processes only its own CSS at build time. **Not exploitable here.** The only fix offered is Next.js 16 (breaking); 15.5.28 is already the newest 15.x. **Not changed.** Plan the Next 16 upgrade. |
| High | `braces`, `micromatch`, `fast-glob` via `eslint-config-next` | development only | Run only on developer machines during linting, never on the website. Not changed. |

### Rate limiting: limitations

- **Per process:** limits are held in server memory. They work for a single `next start` instance, but are **not shared** across serverless functions or multiple instances, and they reset on restart. Use a shared store for strict limits.
- **Client identity:** this depends on the proxy. Set `TRUSTED_PROXY_HOPS` to the number of proxies that append to `X-Forwarded-For`: Vercel or one nginx proxy = 1, CDN + nginx = 2. If `next start` is exposed directly with no proxy, the header is entirely client-controlled; the global cap (100 enquiries per 10 minutes) remains the backstop. **Don't expose `next start` directly.**

### Content Security Policy

`script-src` allows `'unsafe-inline'` because Next.js's static pages use inline bootstrap scripts; nonces would force every page to render dynamically. Everything else is restricted to the site's own origin, with `frame-ancestors 'none'` and `object-src 'none'`. A 0-violation test covers browsing every page and submitting the form.

---

## 4. Email delivery: three separate milestones

| Milestone | Status |
| --- | --- |
| 1. Code and mock-provider tests pass | **Done.** 57 enquiry tests: validation, injection, duplicates, provider failures, rate limits, missing configuration. |
| 2. Email provider configured (`RESEND_API_KEY`, verified sender domain, `INQUIRY_FROM_EMAIL`) | **Not done.** No credentials were available. |
| 3. Real delivery verified (a test enquiry seen in peanutagriseeds@gmail.com) | **Not done.** No real email has been sent. |

The setup instructions in [INQUIRY-EMAIL-SETUP.md](INQUIRY-EMAIL-SETUP.md) were reviewed and remain accurate. Until milestone 2 is complete, the form shows "We could not send your enquiry at this time…" with call and WhatsApp alternatives, never a false success (tested).

---

## 5. SEO

- **Titles and descriptions:** unique on all 18 public pages. Variety pages use their exact names ("G20 Groundnut Seeds | PEANUT AGRI SEEDS PVT. LTD."). Three thin descriptions were improved with verified facts only.
- **404:** "Page Not Found" title and `noindex`. Unknown varieties return 404 and never appear in the sitemap.
- **`SITE_URL` (new):** the production origin, read **at build time**. It is validated: invalid, non-https, localhost/IP and placeholder values (`example.com`, `your-…`) fail the build with a clear message. **Until it is set:**
  - no canonical, `og:url` or social image URL is published;
  - `sitemap.xml` is a valid, empty sitemap, and `robots.txt` has no Sitemap line;
  - nothing points at an invented domain.
- **With `SITE_URL` set** (verified with a test build on a reserved `.example` domain, never committed):
  - self-referencing canonical, `og:url`, `og:image` and `twitter:image` on every page;
  - a sitemap of exactly the 32 public pages, including all 25 varieties (re-checked in Phase 9 on the development server with a reserved `.test` domain);
  - `robots.txt` with Sitemap and Host lines;
  - LocalBusiness JSON-LD gains `url` and `logo`.
- **`robots.txt`:** allows everything except `/api/`.
- **Social image:** the official logo (1254×1254, opaque cream background), with a `summary` Twitter card. Owner approval is recommended, or supply a dedicated 1200×630 image.
- **Structured data:** LocalBusiness with verified details only: name, slogan, phone, email, street/locality/region/country, and the two hours entries from `siteConfig.factoryHours`. No postal code, coordinates, ratings or reviews.

---

## 6. Deployment

### Requirements

- **Node.js ≥ 18.18** (`engines` in `package.json`; developed and tested on 20.19.0). Use Node 20 LTS.
- **Server runtime:** `next start` on a Node server behind an HTTPS reverse proxy, or a platform with Next.js server functions (e.g. Vercel). **A static export is not supported**, because it would drop `/api/enquiry`.
- **sharp:** the image generator needs a native binary for the build machine's platform. `npm ci` installs it automatically.

### Environment variables

| Variable | When | Required | Value |
| --- | --- | --- | --- |
| `RESEND_API_KEY` | runtime | Yes | Resend API key (sending access) |
| `INQUIRY_FROM_EMAIL` | runtime | Yes | Sender on a Resend-verified domain |
| `INQUIRY_TO_EMAIL` | runtime | Recommended | `peanutagriseeds@gmail.com` (any other value is rejected) |
| `SITE_URL` | **build time** | Yes, for launch | e.g. `https://www.<company-domain>`; no trailing path |
| `TRUSTED_PROXY_HOPS` | runtime | If not 1 | Proxies that append to `X-Forwarded-For` (default 1) |

`SITE_URL` is baked into the static pages, so it must be set **before `npm run build`**. On Vercel, set it for the Production environment. Never prefix any of these with `NEXT_PUBLIC_`. See `.env.example`.

### Build and run (actual package scripts)

```bash
npm ci                 # install exact locked dependencies
npx tsc --noEmit       # type check (no package script; run directly)
npm run lint           # ESLint
npm run build          # runs `npm run images` first (prebuild), then `next build`
npm start              # next start (use PORT=… or -p to change the port)
```

`npm run images` generates `public/_img/*.webp` (21 images × 13 widths). It is incremental, so unchanged files are skipped, and the output is git-ignored.

### Post-deploy smoke test

1. Open `/`: the logo intro plays once and can be skipped; the menu works on a phone.
2. Open `/seeds`: 25 packages are visible; search "tj37" shows TJ-37 and "no 39" shows NO-39; open a variety page.
3. On a variety page, "Enquire About This Seed" opens the form with that variety selected.
4. Submit a clearly marked **test** enquiry (with the owner's permission). The reference shown must arrive at peanutagriseeds@gmail.com, and the Resend dashboard should show *Delivered*.
5. Tap the Call, WhatsApp, Email and "Find Us on Google Maps" links on a phone.
6. Check `https://<domain>/robots.txt` and `/sitemap.xml` (18 URLs on the real domain), and view the page source for `<link rel="canonical">`.
7. Check the response headers: `content-security-policy`, `strict-transport-security`, and no `x-powered-by`.
8. Run Lighthouse on the live URL and record the results.

### Rollback

- **Code:** every phase is a git commit on its own branch (Phase 1 `4b7d39e` … Phase 7 `a946386`). Redeploy the previous good commit.
- **Vercel:** use "Instant Rollback" to the previous deployment.
- **Node server:** `git checkout <previous-commit> && npm ci && npm run build && npm start`, or keep the previous release directory and switch the proxy back to it.
- **Email:** removing `RESEND_API_KEY` safely disables sending. The form then shows its "could not send" message with phone and WhatsApp alternatives.

---

## 7. Privacy and trust

- **No tracking:** no cookies, analytics, advertising trackers or third-party requests (verified on all pages and during a form submission). No browser storage (cookies, localStorage or sessionStorage) is used.
- **Data collected:** only name, mobile, village/city, variety, quantity and an optional message. No customer email address is collected.
- **Delivery:** enquiries are emailed via Resend to the company inbox and are not stored in a database. Server logs contain a reference and outcome, never names or numbers.
- **`/privacy` (new):** a factual notice of the above, linked from the footer and the form. **It makes no legal assurances.** Retention periods, data-request handling and jurisdiction-specific wording need owner or legal review before launch.
- **Content:** no product specifications, prices, yield claims, certifications, statistics or unsupported history. The Maps button remains an address search.

---

## 8. Performance

Lighthouse 12.8.2 with default mobile emulation and simulated throttling, run against a local production server (not a live CDN). Live results will differ.

| Page | Perf before → after | A11y before → after | Best practices | SEO | LCP before → after | CLS | TBT | Page weight |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 87 → 90 | 100 → 100 | 100 | 100 | 4.1 s → 3.6 s | 0.014 | 0 ms | 664 → 677 KiB |
| `/about` | 89 → 89 | 100 → 100 | 100 | 100 | 3.8 s → 3.8 s | 0.014 | 0 ms | — |
| `/seeds` | 90 → 90 | 96 → 100 | 100 | 100 | 3.7 s → 3.7 s | 0.014 | 0 ms | **916 → 639 KiB** |
| `/contact` | 93 → 93 | 97 → 100 | 100 | 100 | 3.2 s → 3.2 s | 0.014 | 0 ms | — |

**Changes made:**
- **Catalogue image hints:** the `sizes` hints for catalogue packages were corrected (they described the card rather than the contained package), and a 480px width was added. The result is −30% bytes on the mobile catalogue, with labels still sharp (checked visually).
- **Intro logo priority:** the intro logo now requests `fetchpriority="high"`.
- **About hero:** its image hint was tightened.

**Remaining observations:**
- **Intro and LCP:** on first visits, LCP is dominated by the **animated logo intro** fading in (it is the LCP element on three of four pages). Returning visitors in the same session skip it. This is the owner-requested brand moment; shortening it is a product decision.
- **CSS:** Tailwind's single CSS file is render-blocking (normal for Next.js; FCP is 0.9 s).
- **Polyfills:** Next.js includes legacy-browser polyfills (minor).
- **No layout shift or blocking work:** CLS is 0.014 and TBT is 0 ms on all pages.
- **Static pages:** all pages are statically generated; `/api/enquiry` is the only server route. There are no third-party scripts.

---

## 9. Accessibility

axe-core 4.10.3 (WCAG 2.0/2.1/2.2 A and AA rules plus best practices) was run on 10 page types × desktop/mobile, plus the form's error state and the open mobile menu.

| Rule | Before | Fix | After |
| --- | --- | --- | --- |
| `color-contrast` (serious) | 15 page/states | Small grey labels raised from 55–60% to 70% opacity; decorative numerals moved to the accessible gold (`gold-700`); mobile-menu numerals made fully opaque | 0 |
| `region` | 21 | The top contact bar is now a labelled `<aside>` landmark | 0 |
| `landmark-unique` | 2 | The About brand-statement section was renamed "Our purpose" | 0 |
| `landmark-complementary-is-top-level` | 4 | The contact panel inside `<main>` became a labelled section | 0 |
| Label in name (Lighthouse) | Header logo link | The visible text now forms the accessible name (+ "home") | Passed |

Also verified by the suites:
- keyboard order on the form and the hero call-to-action;
- visible focus rings;
- the mobile menu's focus trap, Escape and scroll lock;
- live-region status messages and field-error associations;
- a single `h1` and no skipped heading levels;
- touch targets of at least 44px on the Contact page;
- reduced-motion behaviour;
- alt text on all images (decorative ones are empty).

Automated tools catch only some accessibility issues. **No claim of full WCAG conformance is made.** A manual screen-reader pass (NVDA/VoiceOver) is recommended before launch.

---

## 10. Assets and provenance

[IMAGE-CREDITS.md](IMAGE-CREDITS.md) was reviewed and is unchanged.
- **CC0 photos:** credits and sources are listed; they are never captioned as the company's own fields or factory.
- **Portraits:** the supplied MD and CEO originals are correctly assigned (tested) and unaltered apart from documented resizing and metadata removal.
- **Packaging:** the 25 packaging files are byte-identical to the supplied originals and correctly mapped (tested, including a pixel comparison of the images the site actually serves). Their C2PA provenance (AI-generated) remains documented.
- **Logo:** the supplied original.
