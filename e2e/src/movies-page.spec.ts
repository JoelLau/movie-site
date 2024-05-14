import { test, expect } from '@playwright/test';
import { MOVIES } from 'e2e/fixtures/movies';

const MOVIESPAGE_URL = '/movies';

test('window title', async ({ page }) => {
  await page.goto(MOVIESPAGE_URL, { waitUntil: 'domcontentloaded' });

  expect(await page.title()).toBe('Movies');
});

test('navigate from home page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.getByRole('link', { name: /movies/i }).click();
  await page.waitForURL(/movies/i);
  expect(page.url()).toContain(MOVIESPAGE_URL);
});

test('search for movies', async ({ page }) => {
  const mockResponse = MOVIES;

  await page.route('*/**/assets/movie.mock-data.json', async (route) => {
    await route.fulfill({ json: mockResponse });
  });

  await page.goto(MOVIESPAGE_URL, { waitUntil: 'domcontentloaded' });

  await page
    .getByRole('textbox', { name: /search movies/i })
    .fill('The Lord of the Rings');

  // wait for debounce to happen
  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(500);

  const movieListItems = page.locator('.movie-list__item');
  const imageAlts = await movieListItems.evaluateAll((list) =>
    list.map((element) => element.querySelector('img')?.getAttribute('alt')),
  );

  expect(imageAlts).toStrictEqual([
    'The Lord of the Rings: The Return of the King',
    'The Lord of the Rings: The Fellowship of the Ring',
    'The Lord of the Rings: The Two Towers',
  ]);
});
