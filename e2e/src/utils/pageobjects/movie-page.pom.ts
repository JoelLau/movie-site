import { Page } from '@playwright/test';

export class MoviesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit(slug: string) {
    await this.page.goto(`/movies/${slug}`);
  }
}
