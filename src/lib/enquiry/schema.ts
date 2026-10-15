/**
 * Enquiry form rules, shared by the browser form and the /api/enquiry route so
 * both validate identically. Pure functions only: no secrets, no server APIs.
 *
 * The variety list is passed in (from src/content/seeds.ts on the server) rather
 * than imported here, so the client bundle never pulls in packaging image data.
 */

export type VarietyOption = { slug: string; name: string };

export const GENERAL_ENQUIRY = { value: "general", label: "General Enquiry / Not Sure Yet" } as const;

export const QUANTITY_UNITS = [
  { value: "kg", label: "Kilograms (kg)", singular: "kg", plural: "kg", maxDecimals: 2, max: 1_000_000 },
  { value: "bags", label: "Bags", singular: "bag", plural: "bags", maxDecimals: 0, max: 100_000 },
  { value: "quintals", label: "Quintals", singular: "quintal", plural: "quintals", maxDecimals: 2, max: 10_000 },
  { value: "tonnes", label: "Metric tonnes", singular: "metric tonne", plural: "metric tonnes", maxDecimals: 3, max: 1_000 },
] as const;

export type QuantityUnit = (typeof QUANTITY_UNITS)[number];
export type QuantityUnitValue = QuantityUnit["value"];

export const LIMITS = {
  name: { min: 2, max: 80 },
  location: { min: 2, max: 80 },
  message: { max: 1000 },
  quantityChars: 12,
  phoneChars: 20,
} as const;

export type EnquiryField = "name" | "phone" | "location" | "variety" | "quantity" | "unit" | "message";
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

/** Raw form values exactly as typed. */
export type EnquiryValues = Record<EnquiryField, string>;

export type ValidEnquiry = {
  name: string;
  /** E.164, e.g. +919876543210 */
  phone: string;
  /** Readable, e.g. +91 98765 43210 */
  phoneDisplay: string;
  location: string;
  /** null = general enquiry */
  variety: VarietyOption | null;
  quantity: number;
  /** Indian-grouped display, e.g. "1,00,000" or "2.5" */
  quantityDisplay: string;
  unit: QuantityUnit;
  message: string;
};

export const emptyEnquiry = (): EnquiryValues => ({
  name: "",
  phone: "",
  location: "",
  variety: "",
  quantity: "",
  unit: "kg",
  message: "",
});

// Control characters except tab (\u0009), newline (\u000A) and carriage return (\u000D).
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Single-line text: no control characters or line breaks, whitespace collapsed. */
const cleanLine = (value: string) => value.normalize("NFC").replace(CONTROL_CHARS, "").replace(/\s+/g, " ").trim();

/** Multi-line text: keeps line breaks, removes control characters, limits blank lines. */
const cleanMultiline = (value: string) =>
  value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS, "")
    .replace(/[^\S\n]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

// Letters (any script, incl. Gujarati/Hindi), combining marks, spaces and . ' ’ -
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u;
// As above plus digits and , ( ) / &
const LOCATION_PATTERN = /^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N} .,'’()/&-]*$/u;

/**
 * Indian mobile numbers, with or without +91 / 0091 / 91 / a leading 0.
 * Only spaces, hyphens, dots and brackets are stripped; anything else is rejected,
 * never "corrected" into a different number. Returns the 10-digit number or null.
 */
export function parseIndianMobile(raw: string): string | null {
  if (raw.length > LIMITS.phoneChars) return null;
  const compact = raw.replace(/[\s\-().]/g, "");
  const match = /^(?:\+91|0091|91|0)?([6-9]\d{9})$/.exec(compact);
  return match ? match[1] : null;
}

const formatQuantity = (value: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 3 }).format(value);

export const unitFor = (value: string) => QUANTITY_UNITS.find((unit) => unit.value === value);

/** "500 kg", "1 bag", "20 bags", "2.5 quintals" */
export const describeQuantity = (data: Pick<ValidEnquiry, "quantity" | "quantityDisplay" | "unit">) =>
  `${data.quantityDisplay} ${data.quantity === 1 ? data.unit.singular : data.unit.plural}`;

/** Match a ?variety= value (official name like "G20" / "RED CHERRY", or a slug like "red-cherry"). */
export function matchVarietyParam(param: string | null | undefined, options: readonly VarietyOption[]) {
  if (!param || param.length > 60) return null;
  const key = param.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!key) return null;
  const hit = options.find(
    (option) =>
      option.name.toUpperCase().replace(/[^A-Z0-9]/g, "") === key || option.slug.toUpperCase().replace(/[^A-Z0-9]/g, "") === key,
  );
  return hit ? hit.slug : null;
}

const asString = (value: unknown) => (typeof value === "string" ? value : "");

/**
 * Validates untrusted input (form state or a JSON request body).
 * Never trusts the variety name sent by the client: only a known slug is accepted.
 */
export function validateEnquiry(
  input: unknown,
  options: readonly VarietyOption[],
): { ok: true; data: ValidEnquiry } | { ok: false; errors: EnquiryErrors } {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const errors: EnquiryErrors = {};

  const name = cleanLine(asString(raw.name).slice(0, 200));
  if (!name) errors.name = "Please enter your full name.";
  else if (name.length < LIMITS.name.min || name.length > LIMITS.name.max)
    errors.name = `Please enter a name between ${LIMITS.name.min} and ${LIMITS.name.max} characters.`;
  else if (!NAME_PATTERN.test(name)) errors.name = "Please use letters only (spaces, full stops, hyphens and apostrophes are fine).";

  const phoneRaw = asString(raw.phone).trim();
  const mobile = phoneRaw ? parseIndianMobile(phoneRaw) : null;
  if (!phoneRaw) errors.phone = "Please enter your mobile number.";
  else if (!mobile) errors.phone = "Please enter a valid 10-digit Indian mobile number, with or without +91.";

  const location = cleanLine(asString(raw.location).slice(0, 200));
  if (!location) errors.location = "Please enter your village, town or city.";
  else if (location.length < LIMITS.location.min || location.length > LIMITS.location.max)
    errors.location = `Please enter between ${LIMITS.location.min} and ${LIMITS.location.max} characters.`;
  else if (!LOCATION_PATTERN.test(location)) errors.location = "Please use letters, numbers and common punctuation only.";

  const varietyValue = asString(raw.variety).trim();
  const variety = varietyValue === GENERAL_ENQUIRY.value ? null : options.find((option) => option.slug === varietyValue);
  if (!varietyValue || variety === undefined) errors.variety = "Please select a seed variety, or choose General Enquiry.";

  const unit = unitFor(asString(raw.unit).trim());
  if (!unit) errors.unit = "Please choose a unit.";

  const quantityRaw = asString(raw.quantity).trim();
  let quantity = Number.NaN;
  if (!quantityRaw) errors.quantity = "Please enter the quantity you need.";
  else if (quantityRaw.length > LIMITS.quantityChars || !/^\d+(\.\d+)?$/.test(quantityRaw))
    errors.quantity = "Please enter a number only, for example 500 or 2.5 (no commas or units).";
  else {
    quantity = Number(quantityRaw);
    const decimals = quantityRaw.split(".")[1]?.length ?? 0;
    if (!Number.isFinite(quantity) || quantity <= 0) errors.quantity = "Please enter a quantity greater than zero.";
    else if (unit && decimals > unit.maxDecimals)
      errors.quantity = unit.maxDecimals === 0 ? "Bags must be a whole number." : `Please use at most ${unit.maxDecimals} decimal places.`;
    else if (unit && quantity > unit.max)
      errors.quantity = `Please enter up to ${formatQuantity(unit.max)} ${unit.plural}, or describe larger requirements in your message.`;
  }

  const message = cleanMultiline(asString(raw.message).slice(0, LIMITS.message.max * 2));
  if (message.length > LIMITS.message.max)
    errors.message = `Please keep your message under ${formatQuantity(LIMITS.message.max)} characters.`;

  if (Object.keys(errors).length > 0 || !mobile || !unit || variety === undefined) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      phone: `+91${mobile}`,
      phoneDisplay: `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`,
      location,
      variety,
      quantity,
      quantityDisplay: formatQuantity(quantity),
      unit,
      message,
    },
  };
}

/** Order in which fields appear, used to focus the first invalid one. */
export const FIELD_ORDER: EnquiryField[] = ["name", "phone", "location", "variety", "quantity", "unit", "message"];
