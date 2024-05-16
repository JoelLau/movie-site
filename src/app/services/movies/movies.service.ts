import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, switchMap } from 'rxjs';
import { MoviesApiService } from '@services/movies-api/movies-api.service';
import { Replace } from '@shared/state/movies/movies.actions';
import { MoviesState } from '@shared/state/movies/movies.state';

@Injectable({
  providedIn: 'root',
})
// facade for store
export class MoviesService {
  constructor(
    private readonly api: MoviesApiService,
    private readonly store: Store,
  ) {}

  fetchMovieList() {
    return this.api.fetchAll().pipe(
      switchMap((movies) => this.store.dispatch(new Replace(movies))),
      switchMap(() => this.store.select(MoviesState.movies)),
      map((movies) => movies?.slice()), // creates mutable copy
    );
  }

  fetchMovie(slug?: string) {
    return this.api.fetchAll().pipe(
      switchMap((movies) => this.store.dispatch(new Replace(movies))),
      switchMap(() => this.store.select(MoviesState.findMovieBySlugFn)),
      map((findMovieBySlug) => findMovieBySlug(slug ?? '')),
    );
  }
}
