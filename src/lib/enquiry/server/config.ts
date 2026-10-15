import "server-only";
import { siteConfig } from "@/config/site";

/**
 * Email delivery configuration, read from server-side environment variables only.
 * Never import this file from client components (enforced by "server-only").
 */
export type EmailConfig = {
  apiKey: string;
  from: string;
  to: string;
  baseUrl: string;
};

/** The only permitted destination. INQUIRY_TO_EMAIL must match it (or be unset). */
export const OFFICIAL_ENQUIRY_EMAIL = siteConfig.contact.email;

const DEFAULT_BASE_URL = "https://api.resend.com";

// "Company Name <enquiries@example.com>" or "enquiries@example.com"
const SENDER_PATTERN = /^(?:[^<>\r\n]{1,100} <)?[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>?$/;

export function readEmailConfig(env: NodeJS.ProcessEnv = process.env):
  | { ok: true; config: EmailConfig }
  | { ok: false; problems: string[] } {
  const problems: string[] = [];

  const apiKey = env.RESEND_API_KEY?.trim() ?? "";
  if (!apiKey) problems.push("RESEND_API_KEY is not set");

  const from = env.INQUIRY_FROM_EMAIL?.trim() ?? "";
  if (!from) problems.push("INQUIRY_FROM_EMAIL is not set");
  else if (!SENDER_PATTERN.test(from)) problems.push("INQUIRY_FROM_EMAIL is not a valid sender address");

  const to = env.INQUIRY_TO_EMAIL?.trim() || OFFICIAL_ENQUIRY_EMAIL;
  if (to.toLowerCase() !== OFFICIAL_ENQUIRY_EMAIL.toLowerCase())
    problems.push(`INQUIRY_TO_EMAIL must be ${OFFICIAL_ENQUIRY_EMAIL}`);

  // Optional override, used only to point automated tests at a local mock provider.
  const baseUrl = (env.RESEND_API_BASE_URL?.trim() || DEFAULT_BASE_URL).replace(/\/+$/, "");
  try {
    const url = new URL(baseUrl);
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol !== "https:" && !local) problems.push("RESEND_API_BASE_URL must use https");
  } catch {
    problems.push("RESEND_API_BASE_URL is not a valid URL");
  }

  if (problems.length > 0) return { ok: false, problems };
  return { ok: true, config: { apiKey, from, to: OFFICIAL_ENQUIRY_EMAIL, baseUrl } };
}
