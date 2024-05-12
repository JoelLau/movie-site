import { test, expect } from '@playwright/test';

const HOMEPAGE_URL = '/';

test('window title', async ({ page }) => {
  await page.goto(HOMEPAGE_URL);

  expect(await page.title()).toBe('Movies');
});

test('page content', async ({ page }) => {
  await page.goto(HOMEPAGE_URL);

  expect(await page.content()).toContain('home-page works!');
});
