import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export const NAME = 'moviespage_filter';
export const INITIAL_STATE: MoviesPageFiltersStateModel = {
  searchTerms: '',
  genres: [],
};

export class Replace {
  static readonly type = '[Movie Page Filters] Replace';
  constructor(public newFilters: MoviesPageFilters) {}
}

@State<MoviesPageFiltersStateModel>({
  name: NAME,
  defaults: INITIAL_STATE,
})
@Injectable()
export class MoviesPageFiltersState {
  @Selector()
  static filters(state: MoviesPageFiltersStateModel) {
    return state;
  }

  @Action(Replace)
  Replace(state: StateContext<MoviesPageFiltersStateModel>, action: Replace) {
    return state.setState(action.newFilters);
  }
}

export type MoviesPageFiltersStateModel = MoviesPageFilters;
export interface MoviesPageFilters {
  searchTerms: string;
  genres: string[];
}
