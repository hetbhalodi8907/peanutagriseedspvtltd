import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { COMPANY, expect, imageSlug, loadVisibleImages, openContact, test } from "../support/fixtures";
import { VARIETIES } from "../support/varieties";

const root = process.cwd();
const pad = (n: number) => String(n).padStart(2, "0");

test.describe("Catalogue data", () => {
  test("seeds.ts lists the 25 verified varieties in order, each with its own packaging file", () => {
    const source = readFileSync(path.join(root, "src/content/seeds.ts"), "utf8");
    const imports = Object.fromEntries([...source.matchAll(/^import (\w+) from "@\/assets\/images\/seeds\/([^"]+)";/gm)].map((m) => [m[1], m[2]]));
    const records = [...source.matchAll(/variety\("([^"]+)", "([^"]+)", (\w+)\)/g)].map((m) => ({ slug: m[1], name: m[2], file: imports[m[3]] }));
    expect(records).toEqual(VARIETIES.map(({ slug, name }) => ({ slug, name, file: `${slug}.png` })));
  });

  test("packaging files are the verified originals", () => {
    for (const { slug, sha256 } of VARIETIES) {
      const file = path.join(root, "src/assets/images/seeds", `${slug}.png`);
      expect(createHash("sha256").update(readFileSync(file)).digest("hex"), `${slug}.png`).toBe(sha256);
    }
  });
});

test.describe("Catalogue page", () => {
  test("25 cards in official order with their own packages, names and links", async ({ page }) => {
    await page.goto("/seeds");
    await expect(page.locator("#collection-heading")).toHaveText("25 Seed Varieties");
    await loadVisibleImages(page);
    const cards = page.locator("#varieties ul > li article");
    await expect(cards).toHaveCount(25);
    for (const [i, { slug, name }] of VARIETIES.entries()) {
      const card = cards.nth(i);
      await expect(card.locator("h3")).toHaveText(name);
      await expect(card.locator("p span")).toHaveText(pad(i + 1));
      await expect(card.locator("a")).toHaveAttribute("href", `/seeds/${slug}`);
      const img = card.locator("img");
      await expect(img).toHaveAttribute("alt", `${name} groundnut seed packaging by ${COMPANY}`);
      expect(imageSlug(await img.evaluate((el: HTMLImageElement) => el.currentSrc)), name).toBe(slug);
    }
  });

  test("search matches exact varieties and handles spaces, hyphens and case", async ({ page }) => {
    await page.goto("/seeds");
    const search = page.getByRole("searchbox", { name: "Search seed varieties" });
    const names = page.locator("#varieties ul > li h3");
    const cases: [string, string[]][] = [
      ["G23", ["G23"]], ["NO 39", ["NO-39"]], ["t9", ["T-9"]], ["441", ["441"]], ["NO-9", ["NO-9"]],
      ["rembo", ["REMBO"]], ["girnar 4", ["GIRNAR-4"]], ["special", ["PEANUT AGRI SEEDS SPECIAL"]],
      ["G4", ["G45", "G41"]], ["41", ["G41", "441"]],
    ];
    for (const [term, expected] of cases) {
      await search.fill(term);
      await expect(names, term).toHaveText(expected);
    }
    await search.fill("ZZZ");
    await expect(page.getByRole("heading", { name: "No varieties found" })).toBeVisible();
    await search.press("Escape");
    await expect(names).toHaveCount(25);
  });

  test("lowercase redirects and unknown varieties", async ({ request }) => {
    const redirect = await request.get("/seeds/NO-39", { maxRedirects: 0 });
    expect(redirect.status()).toBe(308);
    expect(redirect.headers().location).toMatch(/\/seeds\/no-39$/);
    expect((await request.get("/seeds/441")).status()).toBe(200);
    for (const slug of ["no-40", "g99", "4410", "not-a-variety"]) expect((await request.get(`/seeds/${slug}`)).status(), slug).toBe(404);
  });
});

test.describe("Variety pages", () => {
  test("all 25 pages: title, name, own package, notice, enquiry link, previous/next", async ({ page }) => {
    for (const [i, { slug, name }] of VARIETIES.entries()) {
      const prev = VARIETIES[(i - 1 + VARIETIES.length) % VARIETIES.length];
      const next = VARIETIES[(i + 1) % VARIETIES.length];
      await page.goto(`/seeds/${slug}`);
      await expect(page).toHaveTitle(`${name} Groundnut Seeds | ${COMPANY}`);
      await expect(page.locator("h1")).toHaveText(name);
      const img = page.locator('section[aria-labelledby="seed-heading"] img');
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      expect(imageSlug(await img.evaluate((el: HTMLImageElement) => el.currentSrc)), name).toBe(slug);
      await expect(page.getByText("Detailed information is being prepared")).toBeVisible();
      await expect(page.getByRole("link", { name: "Enquire About This Seed" })).toHaveAttribute("href", `/contact?variety=${slug}#enquiry`);
      const nav = page.locator('nav[aria-label="More varieties"] a');
      await expect(nav.nth(0)).toHaveAttribute("href", `/seeds/${prev.slug}`);
      await expect(nav.nth(1)).toHaveAttribute("href", `/seeds/${next.slug}`);
    }
  });

  test("each variety's enquiry link preselects that variety", async ({ page }) => {
    for (const { slug, name } of VARIETIES) {
      const state = await openContact(page, `?variety=${slug}#enquiry`);
      expect(state, name).toEqual({ message: "", variety: slug });
    }
    const options = await page.locator('select[name="variety"] option').evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value));
    expect(options.filter((v) => v && v !== "general")).toEqual(VARIETIES.map((v) => v.slug));
  });
});
