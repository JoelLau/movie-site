import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  startWith,
  takeUntil,
} from 'rxjs';
import { MoviesPageFilters } from './movies-page.models';
import { MoviesPageService } from './movies-page.service';
import { TypedFormGroup } from '@shared/type-helpers';
import {
  Genre,
  Genres,
  Movie,
  Movies,
} from '@shared/state/movies/movies.models';

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
export class MoviesPageComponent implements OnDestroy {
  readonly DEBOUNCE_TIME = 500;

  movies?: Movies;
  genres?: Genres;

  destroyed$ = new Subject();

  // Avoid direct access!
  // prefer `this.formValues$` instead
  form: TypedFormGroup<MoviesPageFilters> = createFiltersForm(
    this.activatedRoute.snapshot.queryParams,
  );
  formValues$ = this.form.valueChanges.pipe(
    distinctUntilChanged(),
    debounceTime(this.DEBOUNCE_TIME),
    takeUntil(this.destroyed$),
  );

  queryParams$ = this.activatedRoute.queryParams.pipe(
    startWith(this.activatedRoute.snapshot.queryParams),
  );

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly moviesPageService: MoviesPageService,
  ) {
    // ====
    // TL;DR: form -> queryParams -> filtered items
    //
    // 1. forms initialise (once) with query param values
    // 2. changes to form values actively update `queryParams`
    // 3. changes to `queryParams` actively update changes to:
    //    - filtered list of movies
    //    - filtered list of genres
    //
    this.bindFormToQueryParams();
    this.autoUpdateMovies();
    this.autoUpdateGenres();
  }

  bindFormToQueryParams() {
    this.formValues$.subscribe((values) => {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: serializeFilter(values),
      });
    });
  }

  autoUpdateMovies() {
    return this.moviesPageService.fetchFilteredMovies().subscribe((movies) => {
      this.movies = movies;
    });
  }
  autoUpdateGenres() {
    return this.moviesPageService.fetchFilteredGenres().subscribe((genres) => {
      this.genres = genres;
    });
  }

  trackMovieBy(_index: number, movie?: Movie) {
    return movie?.id;
  }

  trackGenreBy(_index: number, genre: Genre) {
    return genre;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

const nonNullable = true;

function createFiltersForm(params: Params) {
  const form = new FormGroup({
    searchTerms: new FormControl<string>('', { nonNullable }),
    genres: new FormControl<string[]>([], { nonNullable }),
  });

  if (params['searchTerms']) {
    form.controls.searchTerms.setValue(params['searchTerms']);
  }

  if (params['genres']) {
    form.controls.genres.setValue(params['genres'].split(','));
  }

  return form;
}

function serializeFilter({
  searchTerms,
  genres,
}: Partial<MoviesPageFilters>): Params {
  const queryParams: Params = {};

  if (searchTerms) {
    queryParams['searchTerms'] = searchTerms;
  }

  if ((genres ?? []).length > 0) {
    queryParams['genres'] = genres?.join(',');
  }

  return queryParams;
}
