import { seedVarietyOptions } from "@/content/seeds";
import { validateEnquiry } from "@/lib/enquiry/schema";
import { readEmailConfig } from "@/lib/enquiry/server/config";
import { buildEnquiryEmail, createReference } from "@/lib/enquiry/server/email";
import { clientKey, globalSendLimiter, requestLimiter, sendLimiter } from "@/lib/enquiry/server/rate-limit";
import { sendWithResend } from "@/lib/enquiry/server/resend";

/**
 * POST /api/enquiry: validates an enquiry and emails it to the company via Resend.
 * Success is returned only after the provider accepts the email.
 * Logs contain a reference and outcome only, never the customer's name or number.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8 * 1024;
/** A person cannot complete the form faster than this; faster submissions are automated. */
const MIN_FILL_MS = 1500;
const SUBMISSION_KEY = /^[A-Za-z0-9-]{16,64}$/;
const DUPLICATE_TTL_MS = 30 * 60 * 1000;

/** Submission keys seen recently, so a double click or retry never sends two emails. */
const submissions = new Map<string, { state: "pending" | "sent"; reference: string; at: number }>();

const json = (status: number, body: object, headers: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

const log = (event: string, fields: Record<string, unknown>) =>
  console[event === "enquiry_sent" ? "info" : "warn"](JSON.stringify({ event, ...fields }));

async function readBody(request: Request) {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) return null;
  const text = await request.text();
  return new TextEncoder().encode(text).length > MAX_BODY_BYTES ? null : text;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host) {
    let sameOrigin = false;
    try {
      sameOrigin = new URL(origin).host === host;
    } catch {}
    if (!sameOrigin) return json(403, { ok: false, error: "forbidden" });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return json(415, { ok: false, error: "unsupported" });

  const client = clientKey(request.headers);
  const allowed = requestLimiter.take(client);
  if (!allowed.ok) return json(429, { ok: false, error: "rate_limited" }, { "Retry-After": String(allowed.retryAfterSeconds) });

  const text = await readBody(request);
  if (text === null) return json(413, { ok: false, error: "too_large" });

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "invalid_request" });
  }

  // Spam defences: hidden honeypot field must stay empty; humans take a moment to fill the form.
  const elapsed = typeof body.elapsedMs === "number" ? body.elapsedMs : 0;
  if ((typeof body.website === "string" && body.website.trim() !== "") || elapsed < MIN_FILL_MS) {
    log("enquiry_rejected_spam", { honeypot: Boolean(body.website), fastFill: elapsed < MIN_FILL_MS });
    return json(400, { ok: false, error: "rejected" });
  }

  const result = validateEnquiry(body, seedVarietyOptions);
  if (!result.ok) return json(400, { ok: false, error: "validation", fields: result.errors });

  const config = readEmailConfig();
  if (!config.ok) {
    log("enquiry_not_configured", { problems: config.problems });
    return json(503, { ok: false, error: "unavailable" });
  }

  const now = Date.now();
  for (const [key, entry] of submissions) if (now - entry.at > DUPLICATE_TTL_MS) submissions.delete(key);
  const submissionKey =
    typeof body.submissionKey === "string" && SUBMISSION_KEY.test(body.submissionKey) ? body.submissionKey : null;
  const previous = submissionKey ? submissions.get(submissionKey) : undefined;
  if (previous?.state === "sent") return json(200, { ok: true, reference: previous.reference, duplicate: true });
  if (previous?.state === "pending") return json(409, { ok: false, error: "in_progress" });

  for (const limiter of [sendLimiter, globalSendLimiter]) {
    const ok = limiter.take(limiter === sendLimiter ? client : "global");
    if (!ok.ok) return json(429, { ok: false, error: "rate_limited" }, { "Retry-After": String(ok.retryAfterSeconds) });
  }

  const reference = createReference();
  if (submissionKey) submissions.set(submissionKey, { state: "pending", reference, at: now });

  const email = buildEnquiryEmail(result.data, reference, new Date(now));
  const sent = await sendWithResend(config.config, email, `enquiry-${submissionKey ?? reference}`);

  if (!sent.ok) {
    if (submissionKey) submissions.delete(submissionKey); // allow a genuine retry
    log("enquiry_failed", { reference, kind: sent.kind, status: sent.status, providerError: sent.providerError });
    return json(502, { ok: false, error: "delivery_failed" });
  }

  if (submissionKey) submissions.set(submissionKey, { state: "sent", reference, at: now });
  log("enquiry_sent", { reference, variety: result.data.variety?.slug ?? "general", providerId: sent.providerId });
  return json(200, { ok: true, reference });
}
