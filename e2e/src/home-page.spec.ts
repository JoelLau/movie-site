import { expect, test } from '@playwright/test';
import { getImageAlts } from '@utils/img-alts.util';
import { mockMovieApiResponse } from '@utils/mock-response.util';
import { HomePage } from '@utils/pageobjects/home-page.pom';

test('metadata', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.visit();

  expect(await page.title()).toBe('Movies');
});

test('lists top 10 popular movies', async ({ page }) => {
  mockMovieApiResponse(page);

  const homePage = new HomePage(page);
  await homePage.visit();

  await page.waitForResponse('*/**/assets/movie.mock-data.json');

  const listItems = await homePage.getPopularMovieListItems();
  const imageAlts = await getImageAlts(listItems);

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
