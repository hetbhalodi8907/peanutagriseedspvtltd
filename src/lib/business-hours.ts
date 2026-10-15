import { siteConfig } from "@/config/site";

/** Week order used for display (Monday first). */
export const WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type Weekday = (typeof WEEK)[number];

type HoursEntry = (typeof siteConfig.factoryHours)[number];

/** "08:00" → "8:00 AM", "20:00" → "8:00 PM" */
export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

/** "8:00 AM–8:00 PM" */
export const formatRange = (entry: Pick<HoursEntry, "opens" | "closes">) =>
  `${formatTime(entry.opens)}–${formatTime(entry.closes)}`;

/** One row per weekday, Monday to Sunday, from the central schedule. */
export function weeklyHours() {
  return WEEK.map((day) => {
    const entry = siteConfig.factoryHours.find((e) => (e.days as readonly string[]).includes(day));
    return { day, opens: entry?.opens ?? null, closes: entry?.closes ?? null, label: entry ? formatRange(entry) : "Closed" };
  });
}

/** Compact summary, e.g. [{ days: "Mon–Sat", hours: "8:00 AM–8:00 PM" }, { days: "Sun", hours: "9:00 AM–2:00 PM" }] */
export function hoursSummary({ short = false } = {}) {
  const abbreviate = (day: string) => (short ? day.slice(0, 3) : day);
  return siteConfig.factoryHours.map((entry) => ({
    days: entry.days.length > 1 ? `${abbreviate(entry.days[0])}–${abbreviate(entry.days[entry.days.length - 1])}` : abbreviate(entry.days[0]),
    hours: formatRange(entry),
  }));
}
