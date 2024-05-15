import { Genres } from '@shared/state/movies/movies.models';

export interface MoviesPageFilters {
  searchTerms: string;
  genres: Genres;
}
