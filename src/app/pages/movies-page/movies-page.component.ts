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
import { BaseLayoutComponent } from '@layouts/base-layout/base-layout.component';
import { MoviesService } from '@services/movies/movies.service';
import {
  Genre,
  Genres,
  Movie,
  Movies,
} from '@shared/state/movies/movies.models';
import { TypedFormGroup } from '@shared/type-helpers';

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

    // Custom
    BaseLayoutComponent,
  ],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss',
})
export class MoviesPageComponent implements OnDestroy {
  readonly DEBOUNCE_TIME = 500;

  movies?: Movies;
  lastVisitedMovies?: Movies;
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
    private readonly moviesService: MoviesService,
  ) {
    // ====
    // TL;DR: form -> queryParams -> filtered items
    //
    // 1. forms initialise (once) with query param values
    // 2. changes to form values actively update queryParams
    // 3. use latest values from queryParams + stored movies list:
    //    - this.movies
    //    - this.genres
    //

    this.bindFormToQueryParams();
    this.autoUpdateMovies();
    this.autoUpdateGenres();
    this.autoUpdateLastVisitedMovies();
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

  autoUpdateLastVisitedMovies() {
    return this.moviesService.fetchLastXVisitedMovies(5).subscribe((movies) => {
      this.lastVisitedMovies = movies;
    });
  }

  trackMovieBy(_index: number, movie: Movie) {
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
