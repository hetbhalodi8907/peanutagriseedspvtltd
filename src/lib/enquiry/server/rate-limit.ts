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
 * Client identity for rate limiting: first x-forwarded-for entry, else x-real-ip.
 * Behind a trusted proxy/CDN this is the visitor's IP. When `next start` is exposed
 * directly, clients can forge x-forwarded-for, which is why the global cap exists.
 */
export function clientKey(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}
