import { Page } from '@playwright/test';

export class MoviesPage {
  public URL = '/movies';

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto(this.URL);
  }

  async getMovieListItems() {
    return this.page.locator('.movie-list__item');
  }

  async getMovieSearchBar() {
    return this.page.getByRole('textbox', { name: /search/i });
  }

  async getGenreFilter() {
    return this.page.getByRole('listbox', { name: /genres/i });
  }

  async fillMoviesSearch(search: string) {
    const searchBar = await this.getMovieSearchBar();

    // search is debounced
    return searchBar.fill(search, { timeout: 500 });
  }
}
