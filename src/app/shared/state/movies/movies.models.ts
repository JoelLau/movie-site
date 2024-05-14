import { Optional } from '@shared/type-helpers';

export const INITIAL_STATE: MovieStateModel = {
  movieList: undefined,
  filterParams: {
    search: '',
    genres: [],
  },
} as const;

export interface MovieStateModel {
  movieList: Optional<Movies>;
  filterParams: MovieFilterParams;
}

export type Movies = Movie[];

export interface Movie {
  id: string;
  title: string;
  popularity: number;
  image: {
    url: string;
    title: string;
  };
  slug: string;
  runtime: string;
  released: string;
  genres: Set<string>;
  budget: number;
}

export interface MovieFilterParams {
  search: string;
  genres: string[];
}
