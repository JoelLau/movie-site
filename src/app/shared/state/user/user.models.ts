import { Movies } from '../movies/movies.models';

export interface UserStateModel {
  movieVisitHistory: Movies;
}

export const STATE_NAME = 'user';
export const INITIAL_STATE: UserStateModel = {
  movieVisitHistory: [],
};
