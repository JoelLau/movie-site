import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, combineLatest, map, startWith, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MoviesPageFilters } from './movies-page.models';
import { MoviesApiService } from '@services/movies-api/movies-api.service';
import { Replace } from '@shared/state/movies/movies.actions';
import { Movie, Movies } from '@shared/state/movies/movies.models';
import { MoviesState } from '@shared/state/movies/movies.state';

@Injectable({
  providedIn: 'root',
})
// facade for store
// TODO: clean and refactor this class is full of spaghetti
export class MoviesPageService {
  constructor(
    private readonly api: MoviesApiService,
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  private fetchQueryFilters(): Observable<MoviesPageFilters> {
    return this.activatedRoute.queryParams.pipe(
      startWith(this.activatedRoute.snapshot.queryParams),
      map((params): MoviesPageFilters => {
        const queryParams: MoviesPageFilters = {
          searchTerms: '',
          genres: [],
        };

        if (params['searchTerms']) {
          queryParams.searchTerms = params['searchTerms'];
        }

        const genreParam = params['genres'] ?? [];
        if (genreParam.length > 0) {
          queryParams.genres = genreParam.split(',');
        }

        return queryParams;
      }),
    );
  }

  fetchFilteredMovies() {
    const reducer$ = this.api.fetchAll().pipe(
      switchMap((movies) => this.store.dispatch(new Replace(movies))),
      switchMap(() => this.store.select(MoviesState.reduceMovieFn<Movies>)),
    );

    const filters$ = this.fetchQueryFilters();
    return combineLatest({ reducer: reducer$, filters: filters$ }).pipe(
      map(({ reducer, filters }) => {
        return reducer((prev, curr) => {
          if (evaluateMovie(curr, filters)) {
            prev.push(curr);
          }
          return prev;
        }, []);
      }),
    );
  }

  fetchFilteredGenres() {
    return this.fetchFilteredMovies().pipe(
      map((movies) => {
        return Array.from(
          new Set(movies?.flatMap((movie) => movie.genres)),
        ).sort();
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
  if (
    filter.genres.length &&
    !movie.genres.find((genre) => genresHash.has(genre))
  ) {
    return false;
  }

  return true;
}

// function makeUnique<T>(arr: T[]): T[] {
//   return Array.from(new Set(arr));
// }
