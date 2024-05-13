import { Optional } from '@shared/type-helpers';

export const INITIAL_STATE: MovieStateModel = {
  movieList: undefined,
} as const;

export interface MovieStateModel {
  movieList: Optional<Movies>;
}

export type Movies = Movie[];

export interface Movie {
  id: string;
  slug: string;
  popularity: number;
  // ...
}
