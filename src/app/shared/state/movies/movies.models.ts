import { Nullable, Optional } from '@shared/type-helpers';

export const INITIAL_STATE: MovieStateModel = undefined;
export type MovieStateModel = Optional<Movies>;
export type Movies = Movie[];

export interface Movie {
  id: string;
  title: string;
  popularity: string;
  image: {
    url: string;
    title: string;
  };
  slug: string;
  runtime: string;
  released: string;
  genres: Genres;
  budget: Nullable<number>;
}

export type Genres = Genre[];
export type Genre = string;
