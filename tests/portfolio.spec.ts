import { expect, test, type Page } from '@playwright/test';
import { portfolio } from '../src/data/portfolio';

const projects = portfolio.projects.filter((project) => project.type === 'project');
const viewports = [
  { width: 1440, height: 1000 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 320, height: 568 },
  { width: 844, height: 390 },
];

async function unlock(page: Page) {
  await page.getByRole('button', { name: /Swipe up to unlock/ }).click();
  await expect(page.getByRole('region', { name: 'iPad home screen' })).toBeVisible();
}

async function expectFixedDocument(page: Page) {
  const layout = await page.evaluate(() => ({
    x: window.scrollX,
    y: window.scrollY,
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    viewportWidth: innerWidth,
    viewportHeight: innerHeight,
  }));
  expect(layout.x).toBe(0);
  expect(layout.y).toBe(0);
  expect(layout.width).toBeLessThanOrEqual(layout.viewportWidth);
  expect(layout.height).toBeLessThanOrEqual(layout.viewportHeight);
  const frame = (await page.locator('.ipad-frame').boundingBox())!;
  expect(frame.x).toBeGreaterThanOrEqual(0);
  expect(frame.y).toBeGreaterThanOrEqual(0);
  expect(frame.y + frame.height).toBeLessThanOrEqual(layout.viewportHeight + 1);
  expect(frame.x + frame.width).toBeLessThanOrEqual(layout.viewportWidth + 1);
}

for (const viewport of viewports) {
  test(`apps fit ${viewport.width}x${viewport.height} and scroll only inside the iPad`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('./');
    await expect(page).toHaveTitle(portfolio.seo.title);
    await expect(page.getByRole('region', { name: 'iPad lock screen' })).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath('lock.png') });
    await unlock(page);
    await expect(page.getByRole('region', { name: 'iPad home screen' })).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath('home.png') });
    await expectFixedDocument(page);

    await page.getByRole('button', { name: 'Portfolio', exact: true }).click();
    await expect(page.locator('#portfolio-heading')).toBeFocused();
    const feed = page.getByRole('region', { name: 'Project reels' });
    await expect(feed).toBeVisible();
    await expect(page.locator('.project-reel')).toHaveCount(projects.length);
    await page.screenshot({ path: testInfo.outputPath('portfolio.png') });
    if (projects.length) {
      await page.locator(`#open-project-${projects[0].id}`).click();
      await expect(page.locator('#detail-heading')).toBeFocused();
      const details = page.locator('.case-study-content');
      await expect(
        details.getByRole('heading', { name: projects[0].title, exact: true }),
      ).toBeVisible();
      await page.screenshot({ path: testInfo.outputPath('case-study.png') });
      await details.evaluate((element) => {
        element.scrollTop = element.scrollHeight;
      });
      await page.getByRole('button', { name: 'Back to reels', exact: true }).click();
      await expect(page.locator(`#open-project-${projects[0].id}`)).toBeFocused();
    }
    if (projects.length > 1) {
      await page.getByRole('button', { name: 'Next project' }).click();
      await expect(page.locator('.reel-counter')).toContainText('02');
      const top = await feed.evaluate((element) => element.scrollTop);
      expect(top).toBeGreaterThan(0);
      await page.getByRole('button', { name: 'Home', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Portfolio', exact: true })).toBeFocused();
      await page.getByRole('button', { name: 'Portfolio', exact: true }).click();
      await expect.poll(() => feed.evaluate((element) => element.scrollTop)).toBeCloseTo(top, 0);
      await page.locator(`#open-project-${projects[1].id}`).click();
      await page.keyboard.press('Escape');
      await expect(page.locator(`#open-project-${projects[1].id}`)).toBeFocused();
      // On short screens, reaching the case-study button scrolls within the reel.
      const beforeLock = await feed.evaluate((element) => element.scrollTop);
      await page.getByRole('button', { name: 'Lock screen', exact: true }).click();
      await unlock(page);
      await page.getByRole('button', { name: 'Portfolio', exact: true }).click();
      await expect
        .poll(() => feed.evaluate((element) => element.scrollTop))
        .toBeCloseTo(beforeLock, 0);
    }
    await page.getByRole('button', { name: 'Home', exact: true }).click();

    for (const app of ['Resume', 'Skills', 'Contact']) {
      await page.getByRole('button', { name: app, exact: true }).click();
      await expect(page.locator(`#${app.toLowerCase()}-heading`)).toBeFocused();
      const content = page.getByRole('region', { name: `${app} content` });
      await page.screenshot({ path: testInfo.outputPath(`${app.toLowerCase()}.png`) });
      await content.evaluate((element) => {
        element.scrollTop = element.scrollHeight;
      });
      const saved = await content.evaluate((element) => element.scrollTop);
      await expectFixedDocument(page);
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: app, exact: true })).toBeFocused();
      await page.getByRole('button', { name: app, exact: true }).click();
      expect(await content.evaluate((element) => element.scrollTop)).toBeCloseTo(saved, 0);
      await page.getByRole('button', { name: 'Home', exact: true }).click();
    }
    await page.reload();
    await expect(page.getByRole('region', { name: 'iPad lock screen' })).toBeVisible();
    await expectFixedDocument(page);
    expect(errors).toEqual([]);
  });
}

test('keyboard navigation, reduced motion, metadata, and deployed media', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to iPad content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: /Swipe up to unlock/ })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('button', { name: 'Portfolio', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  const feed = page.getByRole('region', { name: 'Project reels' });
  await feed.focus();
  if (projects.length > 1) {
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('.reel-counter')).toContainText('02');
    await page.keyboard.press('ArrowUp');
    await expect(page.locator('.reel-counter')).toContainText('01');
  }
  const firstImage = feed.locator('img').first();
  if (await firstImage.count()) {
    await expect(firstImage).toHaveJSProperty('complete', true);
    expect(
      await firstImage.evaluate((element: HTMLImageElement) => element.naturalWidth),
    ).toBeGreaterThan(0);
    expect(await firstImage.getAttribute('src')).toContain(`${process.env.BASE_PATH || '/'}media/`);
  }
  const response = await page.request.get('./');
  expect(await response.text()).toContain('property="og:title"');
  const shareImage = await page.request.get(portfolio.seo.image);
  expect(shareImage.ok()).toBe(true);
  if (process.env.SITE_URL) {
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${process.env.SITE_URL}/`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      `${process.env.SITE_URL}/${portfolio.seo.image}`,
    );
  }
  const wallpaper = page.locator('.wallpaper>img');
  expect(await wallpaper.getAttribute('src')).toContain(`${process.env.BASE_PATH || '/'}media/`);
  await expect(wallpaper).toHaveJSProperty('complete', true);
  await expectFixedDocument(page);
});

test('vertical wheel and horizontal touch navigation stay inside the device', async ({ page }) => {
  test.skip(
    projects.length < 2 || projects[0].media.length < 2,
    'Needs two projects and a multi-asset first project.',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await unlock(page);
  await page.getByRole('button', { name: 'Portfolio', exact: true }).click();
  const track = page.locator('.project-reel').first().locator('.carousel-track');
  const box = (await track.boundingBox())!;
  const cdp = await page.context().newCDPSession(page);
  const y = box.y + box.height / 2;
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: box.x + box.width - 30, y }],
  });
  for (let step = 1; step <= 8; step++) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: box.x + box.width - 30 - ((box.width - 60) * step) / 8, y }],
    });
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await expect(page.getByRole('button', { name: 'Show slide 2' })).toHaveAttribute(
    'aria-current',
    'true',
  );
  await page.mouse.move(box.x + box.width / 2, y);
  await page.mouse.wheel(0, 750);
  await expect.poll(() => page.locator('.reel-counter').textContent()).not.toMatch(/^01/);
  await expectFixedDocument(page);
});

test('enlarged text keeps app controls and the last content reachable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await unlock(page);
  await page.addStyleTag({ content: ':root { font-size: 200%; }' });
  for (const app of ['Portfolio', 'Resume', 'Skills', 'Contact']) {
    await page.getByRole('button', { name: app, exact: true }).click();
    const active = page.locator('.app-panel:not([hidden])');
    const scroller = active.locator('.screen-scroll, .reel-feed').first();
    await scroller.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    const overflow = await scroller.evaluate(
      (element) => element.scrollWidth - element.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
    await expectFixedDocument(page);
    await page.getByRole('button', { name: 'Home', exact: true }).click();
  }
});

test('lock screen isolates controls, supports mouse drag and relocks', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('button', { name: 'Portfolio', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Home', exact: true })).toHaveCount(0);
  const lockScreen = page.getByRole('region', { name: 'iPad lock screen' });
  const bounds = (await lockScreen.boundingBox())!;
  const x = bounds.x + bounds.width / 2;
  const y = bounds.y + bounds.height * 0.6;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x, y - 35, { steps: 5 });
  await page.mouse.up();
  await expect(lockScreen).toBeVisible();
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x, y - 125, { steps: 8 });
  await page.mouse.up();
  await expect(lockScreen).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Portfolio', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Open Resume', exact: true }).click();
  await expect(page.locator('#resume-heading')).toBeFocused();
  await page.getByRole('button', { name: 'Home', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Open Resume', exact: true })).toBeFocused();
  await page.getByRole('button', { name: 'Lock screen', exact: true }).click();
  await expect(lockScreen).toBeVisible();
  await expect(page.getByRole('button', { name: /Swipe up to unlock/ })).toBeFocused();
  await page.keyboard.press('Space');
  await expect(page.getByRole('region', { name: 'iPad home screen' })).toBeVisible();
  await expectFixedDocument(page);
});

test('touch swipe unlocks, while horizontal and cancelled gestures do not', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const lock = page.getByRole('region', { name: 'iPad lock screen' });
  const box = (await lock.boundingBox())!;
  const cdp = await page.context().newCDPSession(page);
  const x = box.x + box.width / 2,
    y = box.y + box.height * 0.6;
  const gesture = async (dx: number, dy: number, cancel = false) => {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    for (let step = 1; step <= 8; step++) {
      await cdp.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: x + (dx * step) / 8, y: y + (dy * step) / 8 }],
      });
    }
    await cdp.send('Input.dispatchTouchEvent', {
      type: cancel ? 'touchCancel' : 'touchEnd',
      touchPoints: [],
    });
  };
  await gesture(110, -10);
  await expect(lock).toBeVisible();
  await gesture(0, -120, true);
  await expect(lock).toBeVisible();
  await gesture(0, -130);
  await expect(lock).toHaveCount(0);
  await expectFixedDocument(page);
});

test('wallpaper failure still leaves a usable lock screen', async ({ page }) => {
  await page.route('**/media/ipad-wallpaper.svg', (route) => route.abort());
  await page.goto('./');
  await expect(page.locator('.wallpaper>img')).toHaveCount(0);
  await expect(page.getByRole('region', { name: 'iPad lock screen' })).toBeVisible();
  await unlock(page);
  await expect(page.getByRole('button', { name: 'Skills', exact: true })).toBeVisible();
});

test('configured media frames preserve proportions on desktop and phone', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
    { width: 320, height: 568 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('./');
    await unlock(page);
    await page.getByRole('button', { name: 'Portfolio', exact: true }).click();
    for (const detail of [false, true]) {
      if (detail) await page.locator(`#open-project-${projects[0].id}`).click();
      const carousel = page
        .locator(detail ? '.case-study-content > .carousel' : '.project-reel .carousel')
        .first();
      // Exercise the responsive CSS contract for each supported configuration.
      for (const ratio of [9 / 16, 1, 16 / 9, 4 / 5]) {
        await carousel.evaluate((element, value) => {
          element.classList.add('carousel-sized');
          (element as HTMLElement).style.setProperty('--media-ratio', String(value));
        }, ratio);
        const box = (await carousel.locator('.carousel-track').boundingBox())!;
        expect(box.width / box.height).toBeCloseTo(ratio, 2);
        expect(box.width).toBeLessThan(viewport.width);
        if (!detail && viewport.width < 680) {
          const frame = (await carousel.boundingBox())!;
          const caption = (await page.locator('.reel-caption').first().boundingBox())!;
          expect(frame.y + frame.height).toBeLessThanOrEqual(caption.y + 1);
        }
        if (await carousel.getByRole('button', { name: 'Next slide' }).count()) {
          await carousel.getByRole('button', { name: 'Next slide' }).click();
          await expect(carousel.getByRole('button', { name: 'Show slide 2' })).toHaveAttribute(
            'aria-current',
            'true',
          );
          await carousel.getByRole('button', { name: 'Previous slide' }).click();
        }
        await expectFixedDocument(page);
      }
    }
  }
});
