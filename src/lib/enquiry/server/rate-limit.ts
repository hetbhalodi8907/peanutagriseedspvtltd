import "server-only";

/**
 * In-memory sliding-window rate limiting.
 *
 * LIMITATION: state lives in this server process. It is effective for a single
 * long-running `next start` instance. On serverless or multi-instance hosting each
 * instance keeps its own counters (and loses them on cold start), so treat it as a
 * basic safeguard; use a shared store (e.g. Redis/Upstash) for strict limits.
 */
export class SlidingWindowLimiter {
  private hits = new Map<string, number[]>();

  constructor(
    private readonly limit: number,
    private readonly windowMs: number,
  ) {}

  /** Records an attempt for `key` and reports whether it is within the limit. */
  take(key: string, now = Date.now()): { ok: true } | { ok: false; retryAfterSeconds: number } {
    const recent = (this.hits.get(key) ?? []).filter((t) => now - t < this.windowMs);
    if (recent.length >= this.limit) {
      this.hits.set(key, recent);
      return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((recent[0] + this.windowMs - now) / 1000)) };
    }
    recent.push(now);
    this.hits.set(key, recent);
    if (this.hits.size > 5000) this.prune(now);
    return { ok: true };
  }

  private prune(now: number) {
    for (const [key, times] of this.hits) if (times.every((t) => now - t >= this.windowMs)) this.hits.delete(key);
  }
}

const TEN_MINUTES = 10 * 60 * 1000;

/** Any POST to the endpoint, per client. Blunts hammering with junk requests. */
export const requestLimiter = new SlidingWindowLimiter(30, TEN_MINUTES);
/** Valid enquiries that would send an email, per client. */
export const sendLimiter = new SlidingWindowLimiter(5, TEN_MINUTES);
/** Valid enquiries across all clients. Backstop if client identity is spoofed. */
export const globalSendLimiter = new SlidingWindowLimiter(100, TEN_MINUTES);

/**
 * Number of trusted proxies in front of the app that append to X-Forwarded-For
 * (TRUSTED_PROXY_HOPS, default 1). The visitor's IP is the entry that many places from
 * the RIGHT: entries further left were supplied by the client and can be forged.
 *   Vercel / one reverse proxy (nginx `proxy_add_x_forwarded_for`): 1
 *   CDN in front of a reverse proxy: 2
 */
function trustedProxyHops() {
  const hops = Number.parseInt(process.env.TRUSTED_PROXY_HOPS ?? "1", 10);
  return Number.isFinite(hops) && hops >= 1 && hops <= 10 ? hops : 1;
}

/**
 * Client identity for rate limiting, from the right-most trusted X-Forwarded-For entry
 * (else X-Real-IP). Phase 8 fix: previously the left-most entry was used, which a client
 * could forge even behind a proxy. If `next start` is exposed directly with no proxy, the
 * whole header is client-controlled; the global send cap remains the backstop.
 */
export function clientKey(headers: Headers, hops = trustedProxyHops()) {
  const chain = (headers.get("x-forwarded-for") ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  if (chain.length > 0) return chain[Math.max(0, chain.length - hops)];
  return headers.get("x-real-ip")?.trim() || "unknown";
}
