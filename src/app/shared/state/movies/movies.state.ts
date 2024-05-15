import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Replace } from './movies.actions';
import { INITIAL_STATE, Movie, MovieStateModel, Movies } from './movies.models';
import { Optional } from '@shared/type-helpers';

export const NAME = 'movies';

@State<MovieStateModel>({
  name: NAME,
  defaults: INITIAL_STATE,
})
@Injectable()
export class MoviesState {
  @Selector()
  static movies(state: MovieStateModel) {
    return state;
  }

  @Selector()
  static reduceMovieFn<T>(movies: MovieStateModel) {
    return (
      reduceFn: (prev: T, curr: Movie, index: number, array: Movies) => T,
      init: T,
    ) => {
      return movies?.reduce<T>(reduceFn, init);
    };
  }

  @Action(Replace)
  Replace(state: StateContext<MovieStateModel>, action: Replace) {
    return state.setState(action.newMovieList);
  }
}
