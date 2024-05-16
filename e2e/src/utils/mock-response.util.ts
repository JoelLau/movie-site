import { Page } from '@playwright/test';
import { MOCK_MOVIES } from '@mocks/movies';

export async function mockMovieApiResponse(page: Page) {
  return await mockApiResponse(
    page,
    '*/**/assets/movie.mock-data.json',
    MOCK_MOVIES,
  );
}

export async function mockApiResponse(
  page: Page,
  route: string | RegExp,
  json?: unknown,
) {
  await page.route(route, async (route) => {
    await route.fulfill({ json });
  });
}
