import path from "node:path";
import type { Page } from "@playwright/test";

// Playwright runs from the project root (where playwright.config.ts lives).
const axePath = path.join(process.cwd(), "node_modules", "axe-core", "axe.min.js");

/** Runs axe-core (all default rules) on the current page and returns "rule×count" strings. */
export async function axeViolations(page: Page) {
  await page.addScriptTag({ path: axePath });
  return page.evaluate(async () => {
    const axe = (window as unknown as { axe: { run: (ctx: Document, opts: object) => Promise<{ violations: { id: string; nodes: unknown[] }[] }> } }).axe;
    const result = await axe.run(document, { resultTypes: ["violations"] });
    return result.violations.map((v) => `${v.id}×${v.nodes.length}`);
  });
}
