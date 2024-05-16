import { Page } from '@playwright/test';

export class HomePage {
  public URL = '/';

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    return await this.page.goto(this.URL);
  }

  async getPopularMovieListItems() {
    return this.page.locator('.movie-list__item');
  }
}
