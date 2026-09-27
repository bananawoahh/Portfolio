// Render the original SVG source to the PNG format expected by social previews.
// Run: npm run social-card (after installing Playwright Chromium).
import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  const svg = await readFile(new URL('../public/media/social-card.svg', import.meta.url), 'utf8');
  await page.setContent(
    `<style>html,body{margin:0;width:1200px;height:630px;overflow:hidden}svg{display:block}</style>${svg}`,
  );
  await page.screenshot({
    path: fileURLToPath(new URL('../public/media/social-card.png', import.meta.url)),
  });
} finally {
  await browser.close();
}
