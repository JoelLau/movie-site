import { test, expect } from '@playwright/test';
import { MOVIES } from 'e2e/fixtures/movies';

const HOMEPAGE_URL = '/';

test('window title', async ({ page }) => {
  await page.goto(HOMEPAGE_URL);

  expect(await page.title()).toBe('Movies');
});

test('lists top 10 popular movies', async ({ page }) => {
  const mockResponse = MOVIES;

  await page.route('*/**/assets/movie.mock-data.json', async (route) => {
    await route.fulfill({ json: mockResponse });
  });

  await page.goto(HOMEPAGE_URL);

  const movieListItems = page.locator('.movie-list__item');
  const imageAlts = await movieListItems.evaluateAll((list) =>
    list.map((element) => element.querySelector('img')?.getAttribute('alt')),
  );

  expect(imageAlts).toStrictEqual([
    'The Shawshank Redemption',
    'The Godfather',
    'The Dark Knight',
    'The Godfather: Part II',
    '12 Angry Men',
    'The Lord of the Rings: The Return of the King',
    "Schindler's List",
    'Pulp Fiction',
    'The Lord of the Rings: The Fellowship of the Ring',
    'The Good, the Bad and the Ugly',
  ]);
});
