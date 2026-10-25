import { defineConfig, devices } from "@playwright/test";
import { MOCK_EMAIL_KEY, MOCK_PORT, NO_EMAIL_PORT, PORT } from "./tests/support/ports";

/**
 * End-to-end regression tests against the production build (`npm run build` first).
 * Three local servers start automatically:
 *  - the site on :3100, sending enquiries to a local mock email provider (never a real one),
 *  - the mock provider on :3201,
 *  - the site on :3102 with email deliberately unconfigured (honest-failure checks).
 * Explicit env values override .env.local, so the real Resend key is never used.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 120_000,
  expect: { timeout: 10_000 },
  // One worker: enquiry tests share the mock provider and the per-process rate limiter.
  workers: 1,
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  reporter: [["list"]],
  outputDir: "test-results",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: `http://127.0.0.1:${PORT}`,
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  webServer: [
    {
      command: "node tests/support/mock-resend.mjs",
      url: `http://127.0.0.1:${MOCK_PORT}/__health`,
      env: { MOCK_RESEND_PORT: String(MOCK_PORT), MOCK_EXPECTED_KEY: MOCK_EMAIL_KEY },
      reuseExistingServer: false,
    },
    {
      command: `npx next start -p ${PORT}`,
      url: `http://127.0.0.1:${PORT}/`,
      env: {
        RESEND_API_KEY: MOCK_EMAIL_KEY,
        INQUIRY_FROM_EMAIL: "PEANUT AGRI SEEDS Website <website@mock-sender.test>",
        RESEND_API_BASE_URL: `http://127.0.0.1:${MOCK_PORT}`,
      },
      reuseExistingServer: false,
      timeout: 60_000,
    },
    {
      command: `npx next start -p ${NO_EMAIL_PORT}`,
      url: `http://127.0.0.1:${NO_EMAIL_PORT}/`,
      env: { RESEND_API_KEY: "", INQUIRY_FROM_EMAIL: "", RESEND_API_BASE_URL: "http://127.0.0.1:9" },
      reuseExistingServer: false,
      timeout: 60_000,
    },
  ],
});
