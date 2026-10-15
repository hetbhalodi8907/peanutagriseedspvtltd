import "server-only";
import type { EmailConfig } from "./config";
import type { EnquiryEmail } from "./email";

export type SendResult =
  | { ok: true; providerId: string | null }
  | { ok: false; kind: "auth" | "rejected" | "rate_limited" | "unavailable" | "network"; status?: number };

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
  if (status === 401 || status === 403) return { ok: false, kind: "auth", status };
  if (status === 429) return { ok: false, kind: "rate_limited", status };
  if (status >= 500) return { ok: false, kind: "unavailable", status };
  return { ok: false, kind: "rejected", status }; // e.g. 422 unverified sender domain
}
