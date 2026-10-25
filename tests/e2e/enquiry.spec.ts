import { NO_EMAIL_URL } from "../support/ports";
import { DEALER_MESSAGE, expect, fillEnquiry, formState, mockEmails, openContact, runTag, test } from "../support/fixtures";

const validBody = (overrides: Record<string, unknown> = {}) => ({
  name: "Api Tester", phone: "9876543210", location: "Keshod", variety: "general", quantity: "5", unit: "kg",
  message: "", website: "", elapsedMs: 5000, submissionKey: `api-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  ...overrides,
});
let client = 0;
/** A distinct client address per request keeps the per-client rate limits out of the way. */
const xff = () => ({ "x-forwarded-for": `10.60.${Math.floor(++client / 200)}.${(client % 200) + 1}` });

test.describe("Enquiry form prefill", () => {
  test("?type=dealer prefills the message only, within the limit", async ({ page }) => {
    expect(await openContact(page, "?type=dealer#enquiry")).toEqual({ message: DEALER_MESSAGE, variety: "" });
    expect(DEALER_MESSAGE.length).toBeLessThanOrEqual(1000);
    await expect(page.getByText(`${DEALER_MESSAGE.length} / 1,000 characters`)).toBeVisible();
  });

  test("variety preselection still works, alone and with ?type=dealer", async ({ page }) => {
    expect(await openContact(page, "?variety=no-39#enquiry")).toEqual({ message: "", variety: "no-39" });
    expect(await openContact(page, "?variety=441#enquiry")).toEqual({ message: "", variety: "441" });
    expect(await openContact(page, "?type=dealer&variety=g23#enquiry")).toEqual({ message: DEALER_MESSAGE, variety: "g23" });
    expect(await openContact(page, "?variety=T9&type=dealer#enquiry")).toEqual({ message: DEALER_MESSAGE, variety: "t-9" });
  });

  test("unknown or unsafe ?type values are ignored", async ({ page }) => {
    for (const type of ["unknown", "constructor", "__proto__", "toString", "DEALER"]) {
      expect(await openContact(page, `?type=${encodeURIComponent(type)}#enquiry`), type).toEqual({ message: "", variety: "" });
    }
    expect(await openContact(page, "#enquiry")).toEqual({ message: "", variety: "" });
  });

  test("text the visitor types is never overwritten, and a cleared message stays empty", async ({ page }) => {
    await openContact(page, "?type=dealer#enquiry");
    await page.fill('textarea[name="message"]', "My own business details.");
    await page.selectOption('select[name="variety"]', "general");
    await page.fill('input[name="name"]', "Prefill Check");
    await page.locator('input[name="location"]').focus();
    await page.waitForTimeout(600);
    expect((await formState(page)).message).toBe("My own business details.");
    await page.fill('textarea[name="message"]', "");
    await page.fill('input[name="location"]', "Keshod");
    await page.waitForTimeout(600);
    expect((await formState(page)).message).toBe("");
  });

  test("the message field stops typing at 1,000 characters", async ({ page }) => {
    await openContact(page, "#enquiry");
    const message = page.locator('textarea[name="message"]');
    await expect(message).toHaveAttribute("maxlength", "1000");
    await message.pressSequentially("x".repeat(1010), { delay: 0 });
    expect((await formState(page)).message).toHaveLength(1000);
  });
});

test.describe("Enquiry submission", () => {
  test("a dealer enquiry is delivered with its message; the next form starts blank", async ({ page }) => {
    await page.setExtraHTTPHeaders(xff());
    await openContact(page, "?type=dealer#enquiry");
    const name = `Dealer Tester ${runTag()}`;
    await fillEnquiry(page, name, "general");
    const before = (await mockEmails()).length;
    await page.click('button[type="submit"]');
    await expect(page.getByTestId("enquiry-reference")).toBeVisible({ timeout: 15_000 });
    const email = (await mockEmails()).slice(before).find((e) => e.subject === `New General Enquiry — ${name}`);
    expect(email, "email received by the mock provider").toBeTruthy();
    expect(email!.text).toContain(DEALER_MESSAGE);
    expect([email!.to].flat()).toContain("peanutagriseeds@gmail.com");
    expect(email!.usedFakeKey && email!.hasIdempotencyKey).toBe(true);
    // The preset applies to the first form only.
    await page.getByRole("button", { name: "Send another enquiry" }).click();
    await page.waitForTimeout(400);
    expect(await formState(page)).toEqual({ message: "", variety: "" });
  });

  test("a variety enquiry names the variety in the email", async ({ page }) => {
    await page.setExtraHTTPHeaders(xff());
    await openContact(page, "?variety=rembo#enquiry");
    const name = `Variety Tester ${runTag()}`;
    await fillEnquiry(page, name);
    const before = (await mockEmails()).length;
    await page.click('button[type="submit"]');
    await expect(page.getByTestId("enquiry-reference")).toBeVisible({ timeout: 15_000 });
    expect((await mockEmails()).slice(before).some((e) => e.subject === `New Seed Enquiry — REMBO — ${name}`)).toBe(true);
  });

  test("invalid input shows errors and sends nothing", async ({ page }) => {
    await openContact(page, "#enquiry");
    const before = (await mockEmails()).length;
    await page.waitForTimeout(1700);
    await page.click('button[type="submit"]');
    await expect(page.locator("form")).toContainText("Please enter your full name.");
    await expect(page.locator("form")).toContainText("Please select a seed variety, or choose General Enquiry.");
    await fillEnquiry(page, "Phone Tester", "441");
    await page.fill('input[name="phone"]', "12345");
    await page.click('button[type="submit"]');
    await expect(page.locator("form")).toContainText("valid 10-digit Indian mobile number");
    await expect(page.getByTestId("enquiry-reference")).toHaveCount(0);
    expect((await mockEmails()).length).toBe(before);
  });

  test("with email unconfigured the form reports failure honestly and keeps the text", async ({ browser }) => {
    // A separate page: the 503 from the unconfigured server is expected here.
    const context = await browser.newContext({ baseURL: NO_EMAIL_URL, reducedMotion: "reduce", extraHTTPHeaders: xff() });
    const page = await context.newPage();
    await openContact(page, "?type=dealer#enquiry");
    await fillEnquiry(page, "No Email Tester", "general");
    await page.click('button[type="submit"]');
    await expect(page.locator("#enquiry").getByRole("alert")).toContainText("We could not send your enquiry", { timeout: 15_000 });
    await expect(page.getByTestId("enquiry-reference")).toHaveCount(0);
    expect((await formState(page)).message).toBe(DEALER_MESSAGE);
    await context.close();
  });
});

test.describe("Enquiry endpoint protections", () => {
  test("server-side validation and spam defences", async ({ request }) => {
    const before = (await mockEmails()).length;
    const post = (data: unknown, headers: Record<string, string> = {}) =>
      request.post("/api/enquiry", { data: data as Record<string, unknown>, headers: { ...xff(), ...headers } });

    const tooLong = await post(validBody({ message: `${DEALER_MESSAGE} ${"x".repeat(1000)}` }));
    expect(tooLong.status()).toBe(400);
    expect((await tooLong.json()).fields?.message).toBeTruthy();

    const unknownVariety = await post(validBody({ variety: "no-40" }));
    expect(unknownVariety.status()).toBe(400);
    expect((await unknownVariety.json()).fields?.variety).toBeTruthy();

    expect((await post(validBody({ website: "https://spam.example" }))).status()).toBe(400); // honeypot
    expect((await post(validBody({ elapsedMs: 200 }))).status()).toBe(400); // filled too fast
    expect((await post(validBody(), { origin: "https://another-site.test" })).status()).toBe(403); // cross-site
    const notJson = await request.post("/api/enquiry", { data: "name=x", headers: { ...xff(), "content-type": "text/plain" } });
    expect(notJson.status()).toBe(415);

    expect((await mockEmails()).length, "no email for any rejected request").toBe(before);
  });

  test("the recipient and sender come from server configuration, not the request", async ({ request }) => {
    const before = (await mockEmails()).length;
    const name = `Recipient Tester ${runTag()}`;
    const res = await request.post("/api/enquiry", { data: validBody({ name, to: "someone@else.test", from: "x@y.test" }), headers: xff() });
    expect(res.status()).toBe(200);
    const email = (await mockEmails()).slice(before).find((e) => e.subject === `New General Enquiry — ${name}`);
    expect([email?.to].flat()).toEqual(["peanutagriseeds@gmail.com"]);
    expect(email?.text).toContain(name);
  });
});
