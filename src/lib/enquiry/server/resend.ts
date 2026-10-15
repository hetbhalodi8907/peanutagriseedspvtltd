import "server-only";
import type { EmailConfig } from "./config";
import type { EnquiryEmail } from "./email";

export type SendResult =
  | { ok: true; providerId: string | null }
  | {
      ok: false;
      kind: "auth" | "rejected" | "rate_limited" | "unavailable" | "network";
      status?: number;
      /** Resend's error name and message, for server logs only; never sent to the browser. */
      providerError?: string;
    };

/**
 * Sends one email through the Resend REST API (https://resend.com/docs/api-reference/emails/send-email).
 * Plain fetch, no SDK. The recipient and sender always come from server config, never from the request.
 * `idempotencyKey` makes retries of the same submission deliver at most one email.
 */
export async function sendWithResend(
  config: EmailConfig,
  email: EnquiryEmail,
  idempotencyKey: string,
  timeoutMs = 10_000,
): Promise<SendResult> {
  let response: Response;
  try {
    response = await fetch(`${config.baseUrl}/emails`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
      signal: AbortSignal.timeout(timeoutMs),
      cache: "no-store",
    });
  } catch {
    return { ok: false, kind: "network" };
  }

  if (response.ok) {
    const body = (await response.json().catch(() => null)) as { id?: unknown } | null;
    return { ok: true, providerId: typeof body?.id === "string" ? body.id : null };
  }

  const status = response.status;
  // Resend errors look like { name: "validation_error", message: "..." }. Its 403s are usually
  // sender restrictions (unverified domain, or the shared test sender used for a recipient
  // other than the account owner), not bad keys, so keep its explanation for diagnosis.
  const error = (await response.json().catch(() => null)) as { name?: unknown; message?: unknown } | null;
  const providerError = [error?.name, error?.message]
    .filter((part): part is string => typeof part === "string")
    .join(": ")
    .slice(0, 300) || undefined;

  if (status === 401) return { ok: false, kind: "auth", status, providerError };
  if (status === 429) return { ok: false, kind: "rate_limited", status, providerError };
  if (status >= 500) return { ok: false, kind: "unavailable", status, providerError };
  return { ok: false, kind: "rejected", status, providerError }; // 403/422: sender/domain/key restrictions
}
