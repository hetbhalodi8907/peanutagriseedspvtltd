import "server-only";
import { randomInt } from "node:crypto";
import { siteConfig } from "@/config/site";
import { describeQuantity, type ValidEnquiry } from "../schema";

const IST = "Asia/Kolkata";
const REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O, 1/I

/** e.g. PAS-20261015-7K2Q9M */
export function createReference(now = new Date()) {
  const ymd = new Intl.DateTimeFormat("en-CA", { timeZone: IST, year: "numeric", month: "2-digit", day: "2-digit" })
    .format(now)
    .replaceAll("-", "");
  const suffix = Array.from({ length: 6 }, () => REFERENCE_ALPHABET[randomInt(REFERENCE_ALPHABET.length)]).join("");
  return `PAS-${ymd}-${suffix}`;
}

export const formatSubmittedAt = (date: Date) =>
  `${new Intl.DateTimeFormat("en-IN", { timeZone: IST, dateStyle: "medium", timeStyle: "short" }).format(date)} IST`;

/** Escapes text for safe inclusion in HTML. Submitted text is never rendered as markup. */
export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export type EnquiryEmail = { subject: string; text: string; html: string };

/**
 * Builds the notification email. All values come from validated data; the subject
 * uses single-line, control-character-free fields, so input cannot inject headers.
 */
export function buildEnquiryEmail(data: ValidEnquiry, reference: string, submittedAt: Date): EnquiryEmail {
  const enquiryType = data.variety ? "Seed variety enquiry" : "General enquiry";
  const varietyLabel = data.variety ? data.variety.name : "General Enquiry / Not Sure Yet";
  const quantity = `${describeQuantity(data)} (${data.unit.label})`;
  const when = formatSubmittedAt(submittedAt);
  const subject = data.variety
    ? `New Seed Enquiry — ${data.variety.name} — ${data.name}`
    : `New General Enquiry — ${data.name}`;

  const rows: Array<[string, string]> = [
    ["Reference", reference],
    ["Submitted", when],
    ["Enquiry type", enquiryType],
    ["Customer name", data.name],
    ["Mobile number", data.phoneDisplay],
    ["Village / city", data.location],
    ["Seed variety", varietyLabel],
    ["Required quantity", quantity],
  ];

  const footer = `The customer did not provide an email address. Please respond by phone or WhatsApp. Sent from the enquiry form on the ${siteConfig.name} website.`;

  const text = [
    `New enquiry from the ${siteConfig.name} website`,
    "",
    ...rows.map(([label, value]) => `${`${label}:`.padEnd(19)} ${value}`),
    "",
    "Additional message:",
    data.message || "(none)",
    "",
    `Call: tel:${data.phone}`,
    `WhatsApp: https://wa.me/${data.phone.slice(1)}`,
    "",
    "—",
    footer,
  ].join("\n");

  const cell = "padding:10px 12px;border-bottom:1px solid #e7e1d2;vertical-align:top;font-size:15px;line-height:1.5";
  const html = `<!doctype html>
<html><body style="margin:0;padding:24px 12px;background:#f7f4eb;font-family:Arial,Helvetica,sans-serif;color:#252923">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e7e1d2;border-radius:6px;overflow:hidden">
<div style="background:#173b2a;padding:20px 24px;color:#f7f4eb">
<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d9bd79">${escapeHtml(enquiryType)}</div>
<div style="font-size:20px;font-weight:bold;margin-top:6px">${escapeHtml(subject)}</div>
</div>
<table role="presentation" style="width:100%;border-collapse:collapse">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="${cell};width:38%;color:#5b6157;font-weight:bold">${escapeHtml(label)}</td><td style="${cell}">${escapeHtml(value)}</td></tr>`,
  )
  .join("\n")}
<tr><td style="${cell};color:#5b6157;font-weight:bold">Additional message</td><td style="${cell};white-space:pre-wrap">${data.message ? escapeHtml(data.message) : "<em>(none)</em>"}</td></tr>
</table>
<div style="padding:18px 24px">
<a href="tel:${escapeHtml(data.phone)}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 16px;background:#173b2a;color:#f7f4eb;text-decoration:none;border-radius:4px;font-size:14px">Call ${escapeHtml(data.phoneDisplay)}</a>
<a href="https://wa.me/${escapeHtml(data.phone.slice(1))}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 16px;border:1px solid #173b2a;color:#173b2a;text-decoration:none;border-radius:4px;font-size:14px">WhatsApp</a>
<p style="font-size:13px;color:#5b6157;line-height:1.5;margin:12px 0 0">${escapeHtml(footer)}</p>
</div></div></body></html>`;

  return { subject, text, html };
}
