import { expect, test } from '@playwright/test';
import { mockMovieApiResponse } from '@utils/mock-response.util';
import { MoviesPage } from '@utils/pageobjects/movies-page.pom';

test('metadata', async ({ page }) => {
  const moviesPage = new MoviesPage(page);
  await moviesPage.visit();

  expect(await page.title()).toBe('Movies');
});

test('navigate from movies page', async ({ page }) => {
  mockMovieApiResponse(page);

  const moviesPage = new MoviesPage(page);
  await moviesPage.visit();

  const listItems = await moviesPage.getMovieListItems();
  const movie = listItems.first().getByRole('link');
  await movie.click();

  await page.waitForURL('**/movies/**');
  expect(page.url()).toContain('/movies/');
});
