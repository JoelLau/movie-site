import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, startWith, switchMap } from 'rxjs';
import { MoviesApiService } from '@services/movies-api/movies-api.service';
import { Replace } from '@shared/state/movies/movies.actions';
import { MoviesState } from '@shared/state/movies/movies.state';
import { UserState } from '@shared/state/user/user.state';
import { Optional } from '@shared/type-helpers';
import { Movies } from '@shared/state/movies/movies.models';

@Injectable({
  providedIn: 'root',
})
// facade for store
export class MoviesService {
  constructor(
    private readonly api: MoviesApiService,
    private readonly store: Store,
  ) {}

  fetchMovie(slug?: string) {
    return this.api.fetchAll().pipe(
      switchMap((movies) => this.store.dispatch(new Replace(movies))),
      switchMap(() => this.store.select(MoviesState.findMovieBySlugFn)),
      map((findMovieBySlug) => findMovieBySlug(slug ?? '')),
    );
  }

  fetchMovieList() {
    return this.api.fetchAll().pipe(
      switchMap((movies) => this.store.dispatch(new Replace(movies))),
      switchMap(() => this.store.select(MoviesState.movies)),
      map((movies) => movies?.slice()), // creates mutable copy
    );
  }

  fetchXMostPopularMovies(x: number) {
    return this.fetchMovieList().pipe(
      map((movies) => sortByPopularity(movies)),
      map((movies) => getFirstX(movies, x)),
    );
  }

  fetchLastXVisitedMovies(x: number) {
    return this.store.select(UserState.movieVisitHistory).pipe(
      startWith(this.store.selectSnapshot(UserState.movieVisitHistory)),
      map((movies) => {
        const returnable: Movies = [];

        for (let i = 0; i < movies.length && returnable.length < x; i++) {
          const exists = returnable.find(({ id }) => id === movies[i].id);
          if (!exists) {
            returnable.push(movies[i]);
          }
        }
        return returnable;
      }),
    );
  }
}

function sortByPopularity(movies: Optional<Movies>): Optional<Movies> {
  return movies?.sort(
    (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity),
  );
}

function getFirstX(movies: Optional<Movies>, x: number): Optional<Movies> {
  return movies?.slice(0, x);
}
