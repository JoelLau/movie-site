import { test, expect } from '@playwright/test';

const MOCK_MOVIE_API = '/assets/movie.mock-data.json';

test('window title', async ({ request }) => {
  const response = await request.get(MOCK_MOVIE_API);

  expect(response.ok).toBeTruthy();
});
