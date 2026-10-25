import type { Page } from "@playwright/test";
import { axeViolations } from "../support/a11y";
import { COMPANY, DEALER_MESSAGE, expect, formState, imageSlug, loadVisibleImages, test } from "../support/fixtures";
import { bySlug } from "../support/varieties";

const QUALITY_PREVIEW = ["g20", "g22", "g23"];
const DEALER_PREVIEW = ["g20", "tj-37", "girnar-4", "red-cherry", "peanut-agri-seeds-special", "no-39", "sweta", "rembo"];
const UNSUPPORTED_QUALITY_CLAIMS = /certif|laborator|lab-tested|germination|yield|guarantee|\bISO\b|award|testimonial/i;
const UNSUPPORTED_DEALER_CLAIMS = /margin|discount|credit|exclusive|profit|guarantee|authori[sz]ed dealer|within \d+|response time/i;

const section = (page: Page, headingId: string) => page.locator(`section[aria-labelledby="${headingId}"]`);
const mainText = async (page: Page) => (await page.locator("main").innerText()).replace(/\s+/g, " ");

async function expectMetadata(page: Page, title: string, description: string) {
  await expect(page).toHaveTitle(title);
  for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
    await expect(page.locator(selector)).toHaveAttribute("content", description);
  }
}

/** Preview tiles: exact names, own package image, alt text and link, in catalogue order. */
async function expectPreview(page: Page, headingId: string, slugs: string[]) {
  const tiles = section(page, headingId).locator("li:has(img)");
  await expect(tiles).toHaveCount(slugs.length);
  for (const [i, slug] of slugs.entries()) {
    const { name } = bySlug(slug);
    const tile = tiles.nth(i);
    await expect(tile.locator("a")).toHaveAttribute("href", `/seeds/${slug}`);
    await expect(tile.locator("a")).toContainText(name);
    const img = tile.locator("img");
    await expect(img).toHaveAttribute("alt", `${name} groundnut seed packaging by ${COMPANY}`);
    expect(imageSlug(await img.evaluate((el: HTMLImageElement) => el.currentSrc))).toBe(slug);
    expect(await img.evaluate((el) => getComputedStyle(el).objectFit)).toBe("contain");
  }
}

test.describe("Quality page", () => {
  test("content, metadata and calls to action", async ({ page }) => {
    const response = await page.goto("/quality");
    expect(response?.status()).toBe(200);
    await expectMetadata(page, `Seed Quality Approach | ${COMPANY}`,
      `Discover the quality-focused approach of ${COMPANY}, serving the agricultural market with premium groundnut seed products.`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("Quality Is in Every Detail.");

    const hero = section(page, "quality-page-heading");
    await expect(hero.locator("p").first()).toHaveText("OUR APPROACH TO QUALITY", { useInnerText: true }); // displayed upper-case
    await expect(hero).toContainText("Experience, Care, and a Commitment to Agriculture.");
    await expect(hero).toContainText(`At ${COMPANY}, our approach is guided by 25 years in the agricultural market, a focus on premium groundnut seed products, and attention to detail in serving farmers and business partners.`);
    await expect(hero).toContainText("Our Culture Is Agriculture.");
    await expect(hero.getByRole("link", { name: "Explore Our Seeds" })).toHaveAttribute("href", "/seeds");
    await expect(hero.getByRole("link", { name: "Talk to Our Team" })).toHaveAttribute("href", "/contact");

    const philosophy = section(page, "philosophy-heading");
    await expect(philosophy.locator("h2")).toHaveText("Built on Attention to Detail.");
    await expect(philosophy).toContainText("We believe that trust is built through clear communication, careful attention, and consistent business practices.");
    await expect(section(page, "principles-heading").locator("h3")).toHaveText(["Experience in Agriculture", "Attention to Detail", "Product Clarity", "Customer Relationships"]);

    const products = section(page, "quality-products-heading");
    await expect(products.locator("h2")).toHaveText("Know the Variety. Make an Informed Enquiry.");
    await loadVisibleImages(page);
    await expectPreview(page, "quality-products-heading", QUALITY_PREVIEW);
    await expect(products.getByRole("link", { name: "View All 25 Varieties" })).toHaveAttribute("href", "/seeds");

    const contact = section(page, "quality-contact-heading");
    await expect(contact.locator("h2")).toHaveText("Have Questions About Our Seed Range?");
    await expect(contact).toContainText(`Connect with ${COMPANY} to discuss your product requirements and receive further information about the varieties you are interested in.`);
    await expect(contact.getByRole("link", { name: "Enquire Now" })).toHaveAttribute("href", "/contact#enquiry");
    const whatsapp = contact.getByRole("link", { name: /Chat on WhatsApp/ });
    await expect(whatsapp).toHaveAttribute("href", /^https:\/\/wa\.me\/917016017561/);
    await expect(whatsapp).toHaveAttribute("target", "_blank");
    await expect(whatsapp).toHaveAttribute("rel", /noopener/);

    const text = await mainText(page);
    expect(text).not.toMatch(/This section is being prepared|In preparation/);
    expect(text.match(UNSUPPORTED_QUALITY_CLAIMS)).toBeNull();
  });

  test("preview cards open the matching variety pages", async ({ page }) => {
    for (const slug of QUALITY_PREVIEW) {
      await page.goto("/quality");
      await section(page, "quality-products-heading").locator(`a[href="/seeds/${slug}"]`).click();
      await expect(page).toHaveURL(`/seeds/${slug}`);
      await expect(page.locator("h1")).toHaveText(bySlug(slug).name);
    }
  });
});

test.describe("Dealer Enquiry page", () => {
  test("content, metadata and calls to action", async ({ page }) => {
    const response = await page.goto("/dealer-enquiry");
    expect(response?.status()).toBe(200);
    await expectMetadata(page, `Become a Seed Dealer | ${COMPANY}`,
      `Contact ${COMPANY} to discuss groundnut seed dealership, distribution, retail, and bulk-buying requirements.`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("Grow With PEANUT AGRI SEEDS.");

    const hero = section(page, "dealer-page-heading");
    await expect(hero.locator("p").first()).toHaveText("BUSINESS ENQUIRIES", { useInnerText: true });
    await expect(hero).toContainText("Let's Explore New Business Opportunities in Agriculture.");
    await expect(hero).toContainText(`Are you a seed dealer, retailer, distributor, or bulk buyer? Connect with ${COMPANY} to discuss your business requirements, the varieties you are interested in, and potential opportunities to work together.`);
    await expect(hero).toContainText("Our Culture Is Agriculture.");
    await expect(hero.getByRole("link", { name: "Discuss a Dealership" })).toHaveAttribute("href", "/contact?type=dealer#enquiry");
    await expect(hero.getByRole("link", { name: "Explore Our Varieties" })).toHaveAttribute("href", "/seeds");

    const audiences = section(page, "audiences-heading");
    await expect(audiences.locator("li")).toHaveText(["Agricultural seed retailers", "Groundnut seed dealers", "Distributors and wholesalers", "Agricultural-input businesses", "Bulk purchasers"]);
    await expect(audiences).toContainText("Sending an enquiry does not confirm a dealership, a territory or any supply arrangement.");

    const process = section(page, "process-heading");
    await expect(process.locator("h3")).toHaveText(["Share Your Requirements", "Discuss Your Needs", "Review the Next Steps"]);
    await expect(process).toContainText("Any commercial arrangements, product availability, packing options, or dealership terms must be confirmed directly with the company.");
    await expect(process).toContainText("This is an enquiry process, not an automatic dealer approval.");

    await loadVisibleImages(page);
    await expectPreview(page, "dealer-collection-heading", DEALER_PREVIEW);
    await expect(section(page, "dealer-collection-heading").getByRole("link", { name: "View All 25 Varieties" })).toHaveAttribute("href", "/seeds");

    const contact = section(page, "dealer-contact-heading");
    await expect(contact.getByRole("link", { name: "Discuss a Dealership" })).toHaveAttribute("href", "/contact?type=dealer#enquiry");
    await expect(contact.locator('a[href="tel:+917016017561"]')).toHaveCount(1);
    await expect(contact.locator('a[href^="https://wa.me/917016017561"][target="_blank"]')).toHaveCount(1);
    await expect(contact.locator('a[href="mailto:peanutagriseeds@gmail.com"]')).toHaveCount(1);

    const text = await mainText(page);
    expect(text).not.toMatch(/This section is being prepared|In preparation/);
    expect(text.match(UNSUPPORTED_DEALER_CLAIMS)).toBeNull();
  });

  test("collection cards open the matching variety pages", async ({ page }) => {
    for (const slug of DEALER_PREVIEW) {
      await page.goto("/dealer-enquiry");
      await section(page, "dealer-collection-heading").locator(`a[href="/seeds/${slug}"]`).click();
      await expect(page).toHaveURL(`/seeds/${slug}`);
      await expect(page.locator("h1")).toHaveText(bySlug(slug).name);
    }
  });

  test("both Discuss a Dealership buttons open the form with the dealer message and no variety", async ({ page }) => {
    for (const headingId of ["dealer-page-heading", "dealer-contact-heading"]) {
      await page.goto("/dealer-enquiry");
      await section(page, headingId).getByRole("link", { name: "Discuss a Dealership" }).click();
      await expect(page).toHaveURL("/contact?type=dealer#enquiry");
      await expect(page.locator('textarea[name="message"]')).toHaveValue(DEALER_MESSAGE);
      expect((await formState(page)).variety).toBe("");
    }
  });
});

test.describe("Navigation to the new pages", () => {
  test("homepage, header, footer and catalogue links", async ({ page }) => {
    const cases: [string, string, string, string][] = [
      ["/", 'main a:has-text("Discover Our Quality Approach")', "/quality", "Quality Is in Every Detail."],
      ["/", 'main a:has-text("Become a Dealer")', "/dealer-enquiry", "Grow With PEANUT AGRI SEEDS."],
      ["/", 'header a[href="/quality"]', "/quality", "Quality Is in Every Detail."],
      ["/", 'header a[href="/dealer-enquiry"]', "/dealer-enquiry", "Grow With PEANUT AGRI SEEDS."],
      ["/", 'footer a[href="/quality"]', "/quality", "Quality Is in Every Detail."],
      ["/", 'footer a[href="/dealer-enquiry"]', "/dealer-enquiry", "Grow With PEANUT AGRI SEEDS."],
      ["/seeds", 'main a:has-text("Become a Dealer")', "/dealer-enquiry", "Grow With PEANUT AGRI SEEDS."],
      ["/contact", 'main a[href="/dealer-enquiry"]', "/dealer-enquiry", "Grow With PEANUT AGRI SEEDS."],
    ];
    for (const [from, selector, to, heading] of cases) {
      await page.goto(from);
      await page.locator(selector).first().click();
      await expect(page).toHaveURL(to);
      await expect(page.locator("h1")).toHaveText(heading);
    }
    await expect(page.locator('header a[href="/dealer-enquiry"]')).toHaveAttribute("aria-current", "page");
  });

  test("mobile menu reaches both pages", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const [href, heading] of [["/quality", "Quality Is in Every Detail."], ["/dealer-enquiry", "Grow With PEANUT AGRI SEEDS."]]) {
      await page.goto("/");
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.locator(`[aria-label="Site navigation"] nav a[href="${href}"]`).click();
      await expect(page).toHaveURL(href);
      await expect(page.locator("h1")).toHaveText(heading);
    }
  });
});

test.describe("Layout and accessibility of the new pages", () => {
  for (const width of [320, 375, 768, 1024, 1280, 1920]) {
    test(`responsive at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ["/quality", "/dealer-enquiry"]) {
        await page.goto(route);
        await loadVisibleImages(page);
        const layout = await page.evaluate(() => {
          const main = document.querySelector("main")!;
          const clipped = [...main.querySelectorAll("h1, h2, h3, p, li, a, dt, dd, button")]
            .filter((el) => el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1)
            .map((el) => el.textContent!.trim().slice(0, 40));
          const levels = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((h) => Number(h.tagName[1]));
          const heroLinks = [...main.querySelector("section")!.querySelectorAll("a")].map((a) => a.getBoundingClientRect());
          const overlapping = heroLinks.some((a, i) => heroLinks.some((b, j) => j > i && a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1));
          return {
            overflow: document.documentElement.scrollWidth - innerWidth,
            clipped,
            h1: levels.filter((l) => l === 1).length,
            skippedLevels: levels.filter((l, i) => i > 0 && l > levels[i - 1] + 1).length,
            overlapping,
            stretched: [...main.querySelectorAll("img")].filter((img) => !["cover", "contain"].includes(getComputedStyle(img).objectFit)).length,
          };
        });
        expect(layout, `${route} at ${width}px`).toEqual({ overflow: 0, clipped: [], h1: 1, skippedLevels: 0, overlapping: false, stretched: 0 });
        if (width === 320 || width === 1280) expect(await axeViolations(page), `${route} at ${width}px`).toEqual([]);
      }
    });
  }

  test("keyboard focus is visible and reaches the hero call to action", async ({ page }) => {
    for (const [route, cta] of [["/quality", "Explore Our Seeds"], ["/dealer-enquiry", "Discuss a Dealership"]]) {
      await page.goto(route);
      let reached = false;
      for (let i = 0; i < 25 && !reached; i++) {
        await page.keyboard.press("Tab");
        const focus = await page.evaluate(() => {
          const el = document.activeElement as HTMLElement, style = getComputedStyle(el);
          return { text: el.textContent!.replace(/\s+/g, " ").trim(), visible: style.outlineStyle !== "none" && parseFloat(style.outlineWidth) >= 2 };
        });
        expect(focus.visible, `focus ring on "${focus.text}"`).toBe(true);
        reached = focus.text.startsWith(cta);
      }
      expect(reached, `${route}: Tab reaches "${cta}"`).toBe(true);
    }
  });
});
