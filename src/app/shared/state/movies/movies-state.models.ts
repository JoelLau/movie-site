export interface MoviesState {
  // use `undefined` represents loading state
  movies: Movies | undefined;
}

export const INITIAL_STATE = {
  movies: undefined,
} as const;

export type Movies = Movie;

export interface Movie {
  id: string;
  slug: string;
  popularity: number;
  // ...
}
