"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import {
  emptyEnquiry,
  FIELD_ORDER,
  GENERAL_ENQUIRY,
  LIMITS,
  matchVarietyParam,
  QUANTITY_UNITS,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
  type VarietyOption,
} from "@/lib/enquiry/schema";
import { cn } from "@/lib/cn";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; reference: string }
  | { kind: "error"; message: string };

const MESSAGES = {
  fix: "Please correct the highlighted fields and try again.",
  failed: "We could not send your enquiry at this time. Please try again or contact us directly by phone or WhatsApp.",
  rateLimited:
    "You have sent several enquiries in a short time. Please wait a few minutes and try again, or contact us directly by phone or WhatsApp.",
};

const newSubmissionKey = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;

type EnquiryFormProps = {
  varieties: VarietyOption[];
  /** Starting text for the optional message on ?type=<key> links, e.g. { dealer: "…" }. */
  typeMessages?: Readonly<Record<string, string>>;
};

/**
 * Customer enquiry form. Validates in the browser with the same rules as the server,
 * then POSTs to /api/enquiry. Shows success only after the server confirms the
 * email provider accepted the enquiry; on failure the entered values are kept.
 */
export function EnquiryForm({ varieties, typeMessages }: EnquiryFormProps) {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [honeypot, setHoneypot] = useState("");

  const inFlight = useRef(false);
  const submissionKey = useRef(newSubmissionKey());
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const prefilled = useRef(false);
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  // Prefill from the link, once, on the initial form only. ?variety= (official name or slug)
  // preselects a variety; ?type= (e.g. dealer) starts the optional message but never replaces
  // anything already typed. Unknown values are ignored.
  useEffect(() => {
    if (prefilled.current) return;
    prefilled.current = true;
    const params = new URLSearchParams(window.location.search);
    const slug = matchVarietyParam(params.get("variety"), varieties);
    const type = params.get("type") ?? "";
    const preset =
      typeMessages && Object.hasOwn(typeMessages, type) && typeof typeMessages[type] === "string"
        ? typeMessages[type].slice(0, LIMITS.message.max)
        : "";
    if (!slug && !preset) return;
    setValues((current) => ({
      ...current,
      ...(slug ? { variety: slug } : {}),
      ...(preset && !current.message ? { message: preset } : {}),
    }));
  }, [varieties, typeMessages]);

  useEffect(() => {
    if (status.kind === "success") successRef.current?.focus();
  }, [status.kind]);

  const fieldError = (field: EnquiryField, next: EnquiryValues) => {
    const result = validateEnquiry(next, varieties);
    return result.ok ? undefined : result.errors[field];
  };

  const update = (field: EnquiryField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Re-check live only once a field has been visited, so errors don't appear while typing for the first time.
    if (touched[field] || errors[field]) setErrors((current) => ({ ...current, [field]: fieldError(field, next) }));
    if (field === "unit" && (touched.quantity || errors.quantity))
      setErrors((current) => ({ ...current, quantity: fieldError("quantity", next) }));
    if (status.kind === "error") setStatus({ kind: "idle" });
  };

  const blur = (field: EnquiryField) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: fieldError(field, values) }));
  };

  const focusFirstError = (found: EnquiryErrors) => {
    const first = FIELD_ORDER.find((field) => found[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return; // ignore double clicks / repeated Enter presses

    const checked = validateEnquiry(values, varieties);
    if (!checked.ok) {
      setErrors(checked.errors);
      setTouched(Object.fromEntries(FIELD_ORDER.map((field) => [field, true])));
      setStatus({ kind: "error", message: MESSAGES.fix });
      focusFirstError(checked.errors);
      return;
    }

    inFlight.current = true;
    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypot,
          submissionKey: submissionKey.current,
          elapsedMs: Date.now() - startedAt.current,
        }),
        signal: AbortSignal.timeout(25_000),
      });
      const body = (await response.json().catch(() => null)) as
        | { ok?: boolean; reference?: string; error?: string; fields?: EnquiryErrors }
        | null;

      if (response.ok && body?.ok && body.reference) {
        setStatus({ kind: "success", reference: body.reference });
      } else if (response.status === 400 && body?.error === "validation" && body.fields) {
        setErrors(body.fields);
        setStatus({ kind: "error", message: MESSAGES.fix });
        focusFirstError(body.fields);
      } else if (response.status === 429) {
        setStatus({ kind: "error", message: MESSAGES.rateLimited });
      } else {
        setStatus({ kind: "error", message: MESSAGES.failed });
      }
    } catch {
      setStatus({ kind: "error", message: MESSAGES.failed });
    } finally {
      inFlight.current = false;
    }
  };

  const reset = () => {
    setValues(emptyEnquiry());
    setErrors({});
    setTouched({});
    setHoneypot("");
    submissionKey.current = newSubmissionKey();
    startedAt.current = Date.now();
    setStatus({ kind: "idle" });
  };

  const { contact } = siteConfig;
  const submitting = status.kind === "submitting";

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-sm border border-forest-700/25 bg-forest-900/[0.04] p-7 sm:p-10">
        <span className="flex size-12 items-center justify-center rounded-full bg-forest-900 text-gold-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-6" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 ref={successRef} tabIndex={-1} className="mt-6 font-display text-3xl font-semibold text-forest-900 outline-none">
          Enquiry sent
        </h3>
        <p className="mt-4 max-w-xl leading-relaxed text-charcoal/80">
          Thank you for contacting {siteConfig.name} Your enquiry has been submitted successfully. Our team will review your
          requirements.
        </p>
        <p className="mt-5 text-sm text-charcoal/70">
          Your enquiry reference:{" "}
          <strong className="inline-block whitespace-nowrap font-mono text-base tracking-wider text-forest-900" data-testid="enquiry-reference">
            {status.reference}
          </strong>
        </p>
        <button type="button" onClick={reset} className={buttonClasses("outline-dark", "md", "mt-8")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting} className="space-y-6">
      <noscript>
        <p className="rounded-sm border border-gold-600/50 bg-paper p-4 text-sm text-charcoal/80">
          This form needs JavaScript. Please call us on {contact.phoneDisplay} or message us on WhatsApp.
        </p>
      </noscript>

      <Field id={id("name")} label="Full Name" error={errors.name}>
        <input
          {...control(id("name"), errors.name)}
          name="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name.max}
          placeholder="Enter your full name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => blur("name")}
        />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id={id("phone")} label="Mobile Number" error={errors.phone} hint="10-digit number, with or without +91">
          <input
            {...control(id("phone"), errors.phone, true)}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phoneChars}
            placeholder="Enter your mobile number"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
          />
        </Field>
        <Field id={id("location")} label="Village / City" error={errors.location}>
          <input
            {...control(id("location"), errors.location)}
            name="location"
            type="text"
            autoComplete="address-level2"
            maxLength={LIMITS.location.max}
            placeholder="Enter your village, town or city"
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
            onBlur={() => blur("location")}
          />
        </Field>
      </div>

      <Field id={id("variety")} label="Interested Seed Variety" error={errors.variety}>
        <Select
          {...control(id("variety"), errors.variety)}
          name="variety"
          value={values.variety}
          onChange={(e) => update("variety", e.target.value)}
          onBlur={() => blur("variety")}
        >
          <option value="" disabled>
            Select a seed variety
          </option>
          {varieties.map((variety) => (
            <option key={variety.slug} value={variety.slug}>
              {variety.name}
            </option>
          ))}
          <option value={GENERAL_ENQUIRY.value}>{GENERAL_ENQUIRY.label}</option>
        </Select>
      </Field>

      <fieldset>
        <legend className="text-sm font-semibold text-forest-900">
          Required Quantity <RequiredMark />
        </legend>
        <div className="mt-2 grid grid-cols-1 gap-3 min-[420px]:grid-cols-[1fr_11rem]">
          <div>
            <label htmlFor={id("quantity")} className="sr-only">
              Quantity
            </label>
            <input
              {...control(id("quantity"), errors.quantity, false, errors.quantity ? `${id("quantity")}-error` : undefined)}
              name="quantity"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              maxLength={LIMITS.quantityChars}
              placeholder="Enter the quantity you need"
              value={values.quantity}
              onChange={(e) => update("quantity", e.target.value)}
              onBlur={() => blur("quantity")}
            />
          </div>
          <div>
            <label htmlFor={id("unit")} className="sr-only">
              Unit
            </label>
            <Select
              {...control(id("unit"), errors.unit, false, errors.unit ? `${id("unit")}-error` : undefined)}
              name="unit"
              value={values.unit}
              onChange={(e) => update("unit", e.target.value)}
              onBlur={() => blur("unit")}
            >
              {QUANTITY_UNITS.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <FieldError id={`${id("quantity")}-error`} message={errors.quantity} />
        <FieldError id={`${id("unit")}-error`} message={errors.unit} />
      </fieldset>

      <Field
        id={id("message")}
        label="Additional Message (Optional)"
        optional
        error={errors.message}
        hint={`${values.message.length.toLocaleString("en-IN")} / ${LIMITS.message.max.toLocaleString("en-IN")} characters`}
      >
        <textarea
          {...control(id("message"), errors.message, true)}
          name="message"
          rows={5}
          maxLength={LIMITS.message.max}
          placeholder="Tell us any additional requirements, preferred variety, destination details or questions."
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => blur("message")}
          className={cn(inputClasses(Boolean(errors.message)), "h-auto min-h-36 py-3 leading-relaxed")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive technology; automated scripts tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div role="alert" aria-live="assertive" className="empty:hidden">
        {status.kind === "error" && (
          <div className="rounded-sm border border-[#e3b8b0] bg-[#fbf1ee] p-4 text-sm leading-relaxed text-[#7a2418] sm:p-5">
            <p className="font-semibold">{status.message}</p>
            {status.message !== MESSAGES.fix && (
              <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                <a href={contact.phoneHref} className="inline-flex items-center gap-2 font-semibold underline underline-offset-4">
                  <PhoneIcon className="size-4" />
                  Call {contact.phoneDisplay}
                </a>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold underline underline-offset-4"
                >
                  <WhatsAppIcon className="size-4" />
                  WhatsApp us<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-forest-900/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-charcoal/70 sm:max-w-xs">
          <span aria-hidden="true">*</span> Required fields. Your details are emailed to our team only to respond to this enquiry
          and are not stored on this website.{" "}
          <Link href="/privacy" className="font-semibold text-forest-900 underline underline-offset-4">
            Privacy Notice
          </Link>
        </p>
        <button
          type="submit"
          disabled={submitting}
          className={buttonClasses("forest", "lg", "w-full shrink-0 sm:w-auto")}
        >
          {submitting ? (
            <>
              <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-cream/30 border-t-cream" />
              Sending…
            </>
          ) : (
            <>
              Send Enquiry
              <ArrowRightIcon className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/* ----------------------------------------------------------------------------- */

function inputClasses(invalid: boolean) {
  return cn(
    "block h-12 w-full rounded-md border bg-white px-4 text-base text-charcoal shadow-[inset_0_1px_2px_rgb(23_59_42/0.05)] transition-colors placeholder:text-charcoal/40 hover:border-forest-900/40 disabled:opacity-60",
    invalid ? "border-[#b4533f] focus:border-[#b4533f]" : "border-forest-900/20 focus:border-forest-700",
  );
}

function control(controlId: string, error: string | undefined, hasHint = false, describedBy?: string) {
  const ids = describedBy ?? [hasHint ? `${controlId}-hint` : null, error ? `${controlId}-error` : null].filter(Boolean).join(" ");
  return {
    id: controlId,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": ids || undefined,
    className: inputClasses(Boolean(error)),
  } as const;
}

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true" className="text-gold-700">
        *
      </span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm leading-snug text-[#9b2c1c]">
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-forest-900">
        {label} {!optional && <RequiredMark />}
      </label>
      <div className="mt-2">{children}</div>
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-charcoal/70">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select {...props} className={cn(className, "appearance-none pr-11")}>
        {children}
      </select>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-forest-700"
      >
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
