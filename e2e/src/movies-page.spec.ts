import { test, expect } from '@playwright/test';

const MOVIESPAGE_URL = '/movies';

test('window title', async ({ page }) => {
  await page.goto(MOVIESPAGE_URL);

  expect(await page.title()).toBe('Movies');
});

test('page content', async ({ page }) => {
  await page.goto(MOVIESPAGE_URL);

  expect(await page.content()).toContain('movies-page works!');
});

test('navigate from home page', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: /movies/i }).click();
  expect(page.url()).toContain(MOVIESPAGE_URL);
});
