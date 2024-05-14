import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
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
import { Movie } from '@shared/state/movies/movies.models';
import { MoviesState } from '@shared/state/movies/movies.state';
import { Nullable } from '@shared/type-helpers';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [
    // Angular-specific
    CommonModule,
    RouterModule,
    NgxsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss',
})
export class MoviesPageComponent {
  movies?: Movie[];

  destroyed$ = new Subject();

  form = this.getNewFormGroup();

  constructor(private readonly store: Store) {
    this.refreshMoviesList();
    this.bindStoreToMovies();
  }

  private getNewFormGroup(): FormGroup<{
    search: FormControl<Nullable<string>>;
  }> {
    return new FormGroup({
      search: new FormControl(''),
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

  fetchMovies() {
    const movieStore$ = this.store.select(MoviesState.all);
    const formValues$ = this.form.valueChanges.pipe(
      startWith({ search: undefined }),
      distinctUntilChanged(),
      debounceTime(500),
    );

    return combineLatest({
      movies: movieStore$,
      filters: formValues$,
    }).pipe(
      map(({ movies, filters }) => {
        if (!movies || !filters.search) {
          return movies;
        }

        let filtered = movies;
        if (filters?.search) {
          filtered = filtered.filter((movie) => {
            return [movie.title, movie.id]
              .join('|')
              .toLowerCase()
              .includes((filters.search ?? '').toLowerCase());
          });
        }

        return filtered;
      }),
    );
  }

  trackMovieBy(_index: number, movie: Movie) {
    return movie?.id;
  }
}
