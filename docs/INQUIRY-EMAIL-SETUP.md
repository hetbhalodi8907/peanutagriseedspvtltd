# Enquiry form: email delivery setup

The enquiry form on `/contact` emails every valid enquiry to **peanutagriseeds@gmail.com** through [Resend](https://resend.com).

> **Status:** the integration is built and tested against a mock provider. **Live delivery has not been tested yet**, because no Resend credentials were available during development. Complete the steps below, then send a test enquiry (step 5) before launch.

## 1. How it works

```
Browser (/contact)                      Server (/api/enquiry)                       Resend
──────────────────                      ─────────────────────                       ──────
EnquiryForm validates in the browser ─► same-origin, JSON, size (8 KB) checks
(same rules as the server)              per-client request limit (30 / 10 min)
                                        honeypot + minimum fill time
                                        full validation (src/lib/enquiry/schema.ts)
                                        email configuration present?   ── no ─► 503
                                        duplicate submission?          ── yes ─► same reference
                                        send limits (5 / client, 100 total per 10 min)
                                        build email (plain text + escaped HTML) ──► POST /emails
◄── success + reference ──────────────  only after Resend accepts  ◄──────────── 200 { id }
◄── error message ────────────────────  502 if Resend fails or is unreachable
```

- **Static pages unchanged:** pages remain statically generated. Only `/api/enquiry` runs on the server (a Next.js route handler on the Node.js runtime), so the site must be hosted with a Node server or serverless functions, not as a pure static export.
- **Fixed sender and recipient:** they come from server configuration. Fields such as `to`, `from` or `subject` in a request are ignored.
- **API key stays on the server:** `src/lib/enquiry/server/*` imports `server-only`, so the build fails if any of it is ever imported into browser code.
- **No duplicate emails:** each form fill sends a `submissionKey`, which is also used as Resend's `Idempotency-Key`. Double clicks and retries therefore produce at most one email.
- **Nothing stored:** enquiries are not saved to a database, files or browser storage. Server logs record only the reference, outcome and variety, never the name or phone number.

| File | Purpose |
| --- | --- |
| `src/app/contact/page.tsx` | Contact page with the form |
| `src/components/sections/contact/EnquiryForm.tsx` | Form UI, browser validation, submission states |
| `src/lib/enquiry/schema.ts` | Shared validation rules (browser and server) |
| `src/app/api/enquiry/route.ts` | Endpoint: security checks, validation, sending |
| `src/lib/enquiry/server/config.ts` | Reads and checks environment variables |
| `src/lib/enquiry/server/email.ts` | Subject, text and HTML body; reference IDs |
| `src/lib/enquiry/server/resend.ts` | Resend REST call (no SDK dependency) |
| `src/lib/enquiry/server/rate-limit.ts` | In-memory rate limits |

## 2. Environment variables

Set these in the hosting provider's environment settings. For local work, put them in `.env.local`, which git ignores. A template is in `.env.example`.

| Variable | Required | Value |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | API key from Resend → API Keys. Use "Sending access" only. |
| `INQUIRY_FROM_EMAIL` | Yes | Sender on a verified domain, e.g. `PEANUT AGRI SEEDS Website <enquiries@yourdomain.com>` |
| `INQUIRY_TO_EMAIL` | Recommended | `peanutagriseeds@gmail.com`. **Any other value is rejected** and the form returns "could not send". If unset, it defaults to this address. |
| `TRUSTED_PROXY_HOPS` | If not 1 | Number of proxies that append to `X-Forwarded-For` (default 1: Vercel or one reverse proxy; 2: CDN + reverse proxy). Used to identify visitors for rate limiting. |
| `RESEND_API_BASE_URL` | No | Testing only: points the server at a local mock provider. Leave unset in production. |

Never commit real values. Never prefix these with `NEXT_PUBLIC_`, which would expose them to the browser.

## 3. Set up the sender with Resend

1. Create a Resend account. If possible, sign up with **peanutagriseeds@gmail.com**; see the note below.
2. **Recommended for production: verify the company's domain.** In Resend go to **Domains → Add domain** (for example `peanutagriseeds.com`, once the domain exists), then add the DNS records Resend shows (SPF/DKIM, and optionally DMARC) at the domain registrar. Wait for the status to show **Verified**. Then set:
   `INQUIRY_FROM_EMAIL=PEANUT AGRI SEEDS Website <enquiries@peanutagriseeds.com>`
3. **Testing before a domain exists:** Resend's shared sender `onboarding@resend.dev` can only deliver to the email address that owns the Resend account. If the account is registered to peanutagriseeds@gmail.com, you can test with:
   `INQUIRY_FROM_EMAIL=PEANUT AGRI SEEDS Website <onboarding@resend.dev>`
   This is not suitable as the long-term production sender.
4. A Gmail address (`@gmail.com`) **cannot** be used as the sender, because you cannot verify gmail.com in Resend.

## 4. Local testing

```bash
cp .env.example .env.local   # then fill in real values
npm run dev                  # http://localhost:3000/contact
```

- **Without credentials,** submitting a valid enquiry shows "We could not send your enquiry at this time…", and the server log shows `enquiry_not_configured` with the missing variable names. This is expected; the form never shows success unless Resend accepted the email.
- **Automated tests** use a local mock of the Resend API via `RESEND_API_BASE_URL`. They confirm the request the server would send (recipient, subject, body, headers), but **they do not prove that a real email arrives**.

## 5. Verify live delivery (required before launch)

1. Deploy (or run `npm run build && npm start`) with real `RESEND_API_KEY` and `INQUIRY_FROM_EMAIL`.
2. Open `/contact`, fill the form with clearly marked test data (e.g. name "Test Enquiry"), and submit. Note the reference shown, e.g. `PAS-20261015-7K2Q9M`.
3. Check **peanutagriseeds@gmail.com**, including the Spam and Promotions folders, for the subject `New Seed Enquiry — <variety> — Test Enquiry`.
4. In the Resend dashboard → **Emails**, the message should show as *Delivered*.
5. If it landed in Spam, mark it "Not spam" and add the sender to Gmail contacts. A verified domain with DKIM and DMARC improves deliverability.

## 6. Deploying securely

- **Hosting:** the site must run with a Node.js server (`next start`) or on a platform with Next.js serverless functions (e.g. Vercel, Netlify, AWS Amplify). A pure static export would drop `/api/enquiry`.
- **Secrets:** add the environment variables in the host's secret settings, then redeploy so the server picks them up.
- **Proxy:** put the server behind HTTPS and a proxy/CDN that sets `X-Forwarded-For`, and set `TRUSTED_PROXY_HOPS` to the number of proxies; rate limiting relies on it (see Limitations).
- **Full launch checklist:** [LAUNCH-READINESS.md](LAUNCH-READINESS.md).
- **Key rotation:** rotate the API key in Resend if it is ever exposed, and update the environment variable.

## 7. Responses and troubleshooting

| Visitor sees | HTTP | Server log event | Likely cause and fix |
| --- | --- | --- | --- |
| Success with reference | 200 | `enquiry_sent` | Resend accepted the email. If it isn't in the inbox, check Spam and the Resend dashboard. |
| "Please correct the highlighted fields" | 400 | — | Invalid input. Each field shows its own message. |
| "Could not send… call or WhatsApp" | 503 | `enquiry_not_configured` (lists problems) | A variable is missing or invalid, or `INQUIRY_TO_EMAIL` is not peanutagriseeds@gmail.com. Set it and redeploy. |
| Same | 502 | `enquiry_failed` with `kind: auth` (status 401) | API key wrong or revoked. Create a new key and update `RESEND_API_KEY`. |
| Same | 502 | `kind: rejected` (status 403/422/400); `providerError` gives Resend's reason | **403** usually means a sender restriction: `onboarding@resend.dev` can only deliver to the email address that owns the Resend account, or the API key is limited to a domain other than the sender's. Verify a domain and use it as the sender (step 3), or create the Resend account with peanutagriseeds@gmail.com. **422** means the sender domain is not verified. |
| Same | 502 | `kind: rate_limited` | Resend account sending limit reached. Wait, or upgrade the Resend plan. |
| Same | 502 | `kind: network` / `unavailable` | Resend unreachable, timed out (10 s), or down. Check the host's outbound network and status.resend.com. |
| "Several enquiries in a short time" | 429 | — | Per-client or global limit reached. Wait 10 minutes. |
| Generic failure | 400 / 403 / 413 / 415 | `enquiry_rejected_spam` for spam | Honeypot filled, submitted too fast, cross-origin request, request too large, or wrong content type. |

## 8. Limitations

- **Rate limits are per server process (in memory).** They work for a single `next start` instance. On serverless or multi-instance hosting, each instance keeps separate counters, which reset on cold start. For strict limits, back them with a shared store (e.g. Upstash Redis).
- **Client identity comes from `X-Forwarded-For`.** Since Phase 8 the right-most trusted entry is used (`TRUSTED_PROXY_HOPS`), so forged left-hand entries are ignored. If `next start` is exposed directly with no proxy, the whole header is client-controlled. Always deploy behind a proxy; the global cap (100 enquiries per 10 minutes) remains the backstop.
- **Duplicate tracking is also in memory.** Across instances, Resend's own idempotency key still prevents duplicate emails for 24 hours.
- **The honeypot and minimum fill time stop simple bots, not determined attackers.** If spam becomes a problem, add a CAPTCHA such as Cloudflare Turnstile (privacy-friendly, mostly invisible).
- **No automatic reply to customers,** because the form does not collect customer email addresses. The company replies by phone or WhatsApp.
- **The form requires JavaScript.** Without it, visitors see the phone and WhatsApp alternatives.
