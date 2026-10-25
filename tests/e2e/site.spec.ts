import type { Page } from "@playwright/test";
import { axeViolations } from "../support/a11y";
import { expect, loadVisibleImages, test } from "../support/fixtures";
import { VARIETIES } from "../support/varieties";

const ROUTES = ["/", "/about", "/seeds", ...VARIETIES.map((v) => `/seeds/${v.slug}`), "/contact", "/privacy", "/quality", "/dealer-enquiry"];

test.describe("Every page", () => {
  for (const viewport of [{ width: 390, height: 844 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }]) {
    test(`loads cleanly at ${viewport.width}px`, async ({ page }) => {
      test.setTimeout(300_000);
      await page.setViewportSize(viewport);
      for (const route of ROUTES) {
        const response = await page.goto(route);
        expect(response?.status(), route).toBe(200);
        await loadVisibleImages(page);
        const state = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - innerWidth,
          h1: document.querySelectorAll("h1").length,
        }));
        expect(state, route).toEqual({ overflow: 0, h1: 1 });
        if (viewport.width !== 768) expect(await axeViolations(page), route).toEqual([]);
      }
    });
  }

  test("security headers, robots, sitemap and 404", async ({ request }) => {
    const headers = (await request.get("/quality")).headers();
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    for (const path of ["/robots.txt", "/sitemap.xml"]) expect((await request.get(path)).status(), path).toBe(200);
    expect((await request.get("/this-page-does-not-exist")).status()).toBe(404);
    const upper = await request.get("/Quality", { maxRedirects: 0 });
    expect(upper.status()).toBe(308);
    expect(upper.headers().location).toMatch(/\/quality$/);
  });
});

test.describe("Homepage and contact details", () => {
  test("homepage calls to action", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByText("Our Culture Is Agriculture.").first()).toBeVisible();
    for (const [name, href] of [["Explore Our Seeds", "/seeds"], ["Explore All Varieties", "/seeds"], ["Discover Our Quality Approach", "/quality"], ["Become a Dealer", "/dealer-enquiry"]]) {
      await expect(page.locator("main").getByRole("link", { name }).first(), name).toHaveAttribute("href", href);
    }
  });

  test("contact page: phone, WhatsApp, email, address, hours and map link", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator('a[href="tel:+917016017561"]').first()).toBeVisible();
    await expect(page.locator('a[href^="https://wa.me/917016017561"]').first()).toBeVisible();
    await expect(page.locator('a[href="mailto:peanutagriseeds@gmail.com"]').first()).toBeVisible();
    await expect(page.locator("main")).toContainText("Keshod–Veraval Highway");
    await expect(page.locator("main")).toContainText("Sondarada");
    for (const time of ["08:00", "20:00", "09:00", "14:00"]) await expect(page.locator(`main time[datetime="${time}"]`).first()).toBeAttached();
    await expect(page.locator('a[href*="google.com/maps/search"]').first()).toBeVisible();
    await expect(page.getByText("See all 25 groundnut seed varieties.")).toBeVisible();
  });
});

test.describe("About page leadership", () => {
  test("each leader shows their own portrait", async ({ page }) => {
    await page.goto("/about");
    await loadVisibleImages(page);
    const portrait = async (selector: string) => page.locator(selector).first().evaluate((img: HTMLImageElement) => ({ src: img.currentSrc, alt: img.alt }));
    const md = await portrait('article[aria-labelledby="leader-md"] img');
    const ceo = await portrait('article[aria-labelledby="leader-ceo"] img');
    expect(md.src).toMatch(/\/_img\/yogesh-bhalodi-managing-director-\d+\.webp$/);
    expect(ceo.src).toMatch(/\/_img\/het-bhalodi-chief-executive-officer-\d+\.webp$/);
    expect(ceo.alt).toBe("Mr Het Bhalodi, Chief Executive Officer of PEANUT AGRI SEEDS PVT. LTD.");
    // Father-and-son cards: pair each thumbnail with the text of its own card.
    const cards = await page.locator('section[aria-labelledby="bridge-heading"] img').evaluateAll((imgs) =>
      imgs.map((img) => ({ src: (img as HTMLImageElement).currentSrc, card: img.closest("div")!.textContent! })),
    );
    expect(cards).toHaveLength(2);
    expect(cards.find((c) => c.card.includes("Mr Het Bhalodi"))?.src).toMatch(/het-bhalodi-chief-executive-officer/);
    expect(cards.find((c) => c.card.includes("Mr Yogesh Bhalodi"))?.src).toMatch(/yogesh-bhalodi-managing-director/);
  });
});

test.describe("Logo intro", () => {
  test.use({ reducedMotion: "no-preference" });
  const overlay = (page: Page) =>
    page.evaluate(() => {
      const el = document.querySelector(".brand-intro");
      if (!el) return "absent";
      const s = getComputedStyle(el);
      return s.display === "none" || s.visibility === "hidden" || s.opacity === "0" ? "hidden" : "visible";
    });

  test("plays on a full load, finishes, is not replayed by in-site navigation, replays on reload", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect.poll(() => page.evaluate(() => document.documentElement.dataset.intro)).toBe("play");
    expect(await overlay(page)).toBe("visible");
    await expect.poll(() => overlay(page), { timeout: 8_000 }).not.toBe("visible");
    await page.locator('header a[href="/quality"]').click();
    await expect(page).toHaveURL("/quality");
    expect(await overlay(page)).not.toBe("visible");
    await page.reload({ waitUntil: "domcontentloaded" });
    expect(await overlay(page)).toBe("visible");
  });

  test("Skip and Escape close it", async ({ page }) => {
    await page.goto("/dealer-enquiry", { waitUntil: "domcontentloaded" });
    await page.locator(".brand-intro__skip").click();
    await expect.poll(() => overlay(page), { timeout: 2_000 }).not.toBe("visible");
    await page.goto("/seeds/441", { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Escape");
    await expect.poll(() => overlay(page), { timeout: 2_000 }).not.toBe("visible");
  });
});

test.describe("Reduced motion and privacy", () => {
  test("reduced motion skips the intro", async ({ page }) => {
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.dataset.intro)).toBe("skip");
    await expect(page.locator(".brand-intro")).toBeHidden();
  });

  test("no cookies or browser storage are used", async ({ page, context }) => {
    for (const route of ["/", "/quality", "/dealer-enquiry", "/seeds/441", "/about", "/contact?type=dealer#enquiry"]) await page.goto(route);
    expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length, cookie: document.cookie }))).toEqual({ local: 0, session: 0, cookie: "" });
    expect(await context.cookies()).toEqual([]);
  });
});
