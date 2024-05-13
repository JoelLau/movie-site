import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { INITIAL_STATE, MovieStateModel } from './movies-state.models';
import { ReplaceAll } from './movies.actions';

@State<MovieStateModel>({
  name: 'movies',
  defaults: INITIAL_STATE,
})
@Injectable()
export class MoviesState {
  @Selector()
  static all(state: MovieStateModel) {
    return state?.movieList;
  }

  @Action(ReplaceAll)
  replaceAll(ctx: StateContext<MovieStateModel>, action: ReplaceAll) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      movieList: action.newMovies,
    });
  }
}
