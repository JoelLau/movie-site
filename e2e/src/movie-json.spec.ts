import { test, expect } from '@playwright/test';

test('responds with 200 OK', async ({ request }) => {
  const response = await request.get('/assets/movie.mock-data.json');
  expect(response.ok).toBeTruthy();
});
