import { URL } from 'url';
import { expect, test } from '@playwright/test';
import { getImageAlts } from '@utils/img-alts.util';
import { mockMovieApiResponse } from '@utils/mock-response.util';
import { HomePage } from '@utils/pageobjects/home-page.pom';
import { MoviesPage } from '@utils/pageobjects/movies-page.pom';
import { getListboxOptionContent } from '@utils/option-names.util';

test('metadata', async ({ page }) => {
  const moviesPage = new MoviesPage(page);
  await moviesPage.visit();

  expect(await page.title()).toBe('Movies');
});

test('navigate from home page', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.visit();

  const moviesPage = new MoviesPage(page);
  await page.getByRole('link', { name: /movies/i }).click();
  await page.waitForURL(/movies/i);

  expect(page.url()).toContain(moviesPage.URL);
});

test('search for movies', async ({ page }) => {
  mockMovieApiResponse(page);

  const moviesPage = new MoviesPage(page);
  await moviesPage.visit();

  await moviesPage.fillMoviesSearch('dog');
  await page.waitForURL('**/movies?searchTerms**');

  // query params should update
  let searchParams = new URL(page.url()).searchParams;
  expect(searchParams.has('searchTerms')).toBeTruthy();
  expect(searchParams.get('searchTerms')).toStrictEqual('dog');

  // list of genre filter options should update
  const genreFilter = await moviesPage.getGenreFilter();
  const options = await getListboxOptionContent(genreFilter);
  expect(options).toStrictEqual([
    'Select a Genre',
    'Biography',
    'Crime',
    'Drama',
    'Family',
    'Thriller',
  ]);

  // list of rendered items should update
  const listItems = await moviesPage.getMovieListItems();
  const imageAlts = await getImageAlts(listItems);
  expect(imageAlts).toStrictEqual(['Reservoir Dogs', "Hachi: A Dog's Tale"]);

  // click on a filter
  await genreFilter.selectOption('Crime');
  await page.waitForURL('**/movies?**genres**');

  // query params should update
  searchParams = new URL(page.url()).searchParams;
  expect(searchParams.has('genres')).toBeTruthy();
  expect(searchParams.get('genres')).toStrictEqual('Crime');
});
