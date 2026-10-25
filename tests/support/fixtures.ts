import { expect, test as base, type Page } from "@playwright/test";
import { MOCK_URL } from "./ports";

export const COMPANY = "PEANUT AGRI SEEDS PVT. LTD.";
export const DEALER_MESSAGE = `I am interested in discussing a dealership or distribution opportunity with ${COMPANY} My business details and requirements are provided below.`;

/**
 * `page` fails the test on console errors/warnings, uncaught page errors, failed requests
 * or 4xx/5xx responses. (page.waitForFunction is avoided throughout: the production CSP
 * blocks eval. Use expect.poll with page.evaluate instead.)
 */
export const test = base.extend({
  page: async ({ page }, runTest) => {
    const problems: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error" || m.type() === "warning") problems.push(`console ${m.type()}: ${m.text()}`);
    });
    page.on("pageerror", (e) => problems.push(`page error: ${e.message}`));
    page.on("response", (r) => {
      if (r.status() >= 400) problems.push(`HTTP ${r.status()} ${r.url()}`);
    });
    page.on("requestfailed", (r) => {
      if (r.failure()?.errorText !== "net::ERR_ABORTED") problems.push(`request failed: ${r.url()}`);
    });
    await runTest(page);
    expect(problems, "console and network problems").toEqual([]);
  },
});
export { expect };

/** Scroll each displayed image into view and wait until it has loaded (images are lazy). */
export async function loadVisibleImages(page: Page) {
  const images = page.locator("img");
  for (let i = 0; i < (await images.count()); i++) {
    const img = images.nth(i);
    if (!(await img.evaluate((el) => el.getClientRects().length > 0))) continue; // hidden: never requested
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

/** "/_img/no-39-640.webp" → "no-39" (the generated file name starts with the variety slug). */
export const imageSlug = (url: string | null | undefined) => (url ?? "").split("/").pop()!.replace(/-\d+\.webp$/, "");

export const formState = (page: Page) =>
  page.evaluate(() => ({
    message: document.querySelector<HTMLTextAreaElement>('textarea[name="message"]')?.value,
    variety: document.querySelector<HTMLSelectElement>('select[name="variety"]')?.value,
  }));

/** Wait for the one-time prefill after hydration, then read the form. */
export async function openContact(page: Page, query: string) {
  await page.goto(`/contact${query}`);
  await expect(page.locator('textarea[name="message"]')).toBeVisible();
  await page.waitForTimeout(400);
  return formState(page);
}

export type MockEmail = { subject: string; to: string | string[]; text: string; usedFakeKey: boolean; hasIdempotencyKey: boolean };
export const mockEmails = async (): Promise<MockEmail[]> => (await fetch(`${MOCK_URL}/__emails`)).json();

/** Letters-only suffix, so names stay valid for the form (names may not contain digits). */
export const runTag = () => Date.now().toString(36).replace(/[^a-z]/g, "").slice(-5).toUpperCase() || "RUN";

/** Fill the enquiry form with valid details (the variety is left as-is unless given). */
export async function fillEnquiry(page: Page, name: string, variety?: string) {
  await page.fill('input[name="name"]', name);
  await page.fill('input[name="phone"]', "9876543210");
  await page.fill('input[name="location"]', "Keshod");
  if (variety) await page.selectOption('select[name="variety"]', variety);
  await page.fill('input[name="quantity"]', "50");
  await page.waitForTimeout(1700); // the server rejects forms completed in under 1.5 s
}
