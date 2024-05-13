import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map, tap } from 'rxjs';
import { INITIAL_STATE, MovieStateModel } from './movies.models';
import { Refresh } from './movies.actions';
import { MoviesApiService } from '@services/movies-api.service';

@State<MovieStateModel>({
  name: 'movies',
  defaults: INITIAL_STATE,
})
@Injectable()
export class MoviesState {
  constructor(private readonly moviesApi: MoviesApiService) {}

  @Selector()
  static all(state: MovieStateModel) {
    return state?.movieList;
  }

  @Action(Refresh)
  Refresh({ patchState }: StateContext<MovieStateModel>) {
    return this.moviesApi.fetchAll().pipe(
      map((raws) => {
        return raws.map((raw) => {
          return {
            id: raw.id,
            slug: raw.slug,
            popularity: parseFloat(raw.popularity),
          };
        });
      }),
      tap((movies) => {
        patchState({
          movieList: movies,
        });
      }),
    );
  }
}
