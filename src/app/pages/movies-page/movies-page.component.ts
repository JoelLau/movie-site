import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Params, Router, RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import {
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  take,
  takeUntil,
} from 'rxjs';
import { Refresh } from '@shared/state/movies/movies.actions';
import { Movie, Movies } from '@shared/state/movies/movies.models';
import { MoviesState } from '@shared/state/movies/movies.state';
import { Nullable } from '@shared/type-helpers';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    // Third-party
    NgxsFormPluginModule,
  ],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss',
})
export class MoviesPageComponent {
  movies?: Movies;
  genres?: Genres;

  destroyed$ = new Subject();

  form = this.getNewFormGroup();

  constructor(
    private readonly store: Store,
    private readonly router: Router,
  ) {
    this.refreshMoviesList();
    this.bindStoreToMovies();
    this.bindStoreToGenres();
    this.bindFormToQueryParam();
  }

  private getNewFormGroup(): FormGroup<{
    search: FormControl<Nullable<string>>;
    genres: FormControl<Nullable<string[]>>;
  }> {
    return new FormGroup({
      search: new FormControl(''),
      genres: new FormControl([] as string[]),
    });
  }

  refreshMoviesList() {
    this.store
      .dispatch(Refresh)
      .pipe(take(1))
      .subscribe(() => {
        console.log('refresh complete');
      });
  }

  bindStoreToMovies() {
    this.fetchMovies()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  bindFormToQueryParam() {
    this.fetchFilterChange()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(({ search, genres }) => {
        const queryParams: Params = {};
        if (search) {
          queryParams['search term'] = search;
        }
        if (genres.length) {
          queryParams['genres'] = genres.join(',');
        }

        this.router.navigate([], { queryParams });
      });
  }

  bindStoreToGenres() {
    this.fetchMovies()
      .pipe(
        map((movies) => {
          if (!movies) {
            return undefined;
          }

          const set = movies.reduce((prev, curr) => {
            return new Set([...prev, ...curr.genres]);
          }, new Set<string>());

          return Array.from(set).sort();
        }),
        takeUntil(this.destroyed$),
      )
      .subscribe((genres) => {
        this.genres = genres;
      });
  }

  fetchFilterChange() {
    return this.form.valueChanges.pipe(
      startWith({ search: undefined, genres: undefined }),
      map((x) => JSON.parse(JSON.stringify(x))),
      debounceTime(500),
      distinctUntilChanged(),
    );
  }

  fetchMovies() {
    const movieStore$ = this.store.select(MoviesState.all);
    const filters$ = this.fetchFilterChange();

    return combineLatest({
      movies: movieStore$,
      filters: filters$,
    }).pipe(
      map(({ movies, filters }) => {
        if (!movies || !filters) {
          return movies;
        }

        let filteredList = movies;

        if (filters?.search) {
          filteredList = filteredList.filter((movie) => {
            return [movie.title, movie.id]
              .join('|')
              .toLowerCase()
              .includes((filters.search ?? '').toLowerCase());
          });
        }

        if ((filters?.genres ?? []).length) {
          filteredList = filteredList.filter((movie) => {
            return (filters?.genres ?? []).find((genre: string) => {
              return movie.genres.has(genre);
            });
          });
        }

        return filteredList;
      }),
    );
  }

  trackMovieBy(_index: number, movie: Movie) {
    return movie?.id;
  }

  trackGenreBy(_index: number, genre: Genre) {
    return genre;
  }
}

export type Genres = Genre[];
export type Genre = string;
