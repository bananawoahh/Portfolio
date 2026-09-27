import { defineConfig } from '@playwright/test';

const base = process.env.BASE_PATH || '/';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: `http://127.0.0.1:4173${base}`,
    browserName: 'chromium',
    headless: true,
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : undefined,
  },
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: `http://127.0.0.1:4173${base}`,
    reuseExistingServer: !process.env.CI,
  },
});
