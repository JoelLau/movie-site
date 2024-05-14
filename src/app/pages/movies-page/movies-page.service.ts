import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, switchMap } from 'rxjs';
import { MoviesPageFilters } from './movies-page-filters.state';
import { MoviesApiService } from '@services/movies-api/movies-api.service';
import { Replace } from '@shared/state/movies/movies.actions';
import { Movie, Movies } from '@shared/state/movies/movies.models';
import { MoviesState } from '@shared/state/movies/movies.state';

@Injectable({
  providedIn: 'root',
})
// facade for store
export class MoviesPageService {
  constructor(
    private readonly api: MoviesApiService,
    private readonly store: Store,
  ) {}

  fetchFilteredMovies(filter: MoviesPageFilters) {
    return this.api.fetchAll().pipe(
      switchMap((movies) => this.store.dispatch(new Replace(movies))),
      switchMap(() => this.store.select(MoviesState.reduceMovieFn<Movies>)),
      map((reduceMovieFn) => {
        return reduceMovieFn((prev, curr) => {
          if (evaluateMovie(curr, filter)) {
            prev.push(curr);
          }
          return prev;
        }, []);
      }),
    );
  }
}

function evaluateMovie(movie: Movie, filter: MoviesPageFilters): boolean {
  const searchKey = [movie.id, movie.title].join('|').toLowerCase();
  const searchTerm = filter.searchTerms.toLowerCase();
  if (!searchKey.includes(searchTerm)) {
    return false;
  }

  const genresHash = new Set(filter.genres);
  if (!movie.genres.find((genre) => genresHash.has(genre))) {
    return false;
  }

  return true;
}

// function makeUnique<T>(arr: T[]): T[] {
//   return Array.from(new Set(arr));
// }
