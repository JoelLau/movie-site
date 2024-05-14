import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { Subject } from 'rxjs';
import { MoviesPageFilters, NAME } from './movies-page-filters.state';
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
  readonly FORMSTATE_KEY = NAME;

  movies?: Movies;
  genres?: Genres;

  destroyed$ = new Subject();

  // Avoid direct access!
  // use `MoviesPageService.fetchFilters()` instead
  form: TypedFormGroup<MoviesPageFilters> = createFiltersForm();

  constructor(
    private readonly moviesService: MoviesPageService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
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
  }

  bindFormToQueryParams() {
    this.form.valueChanges.pipe().subscribe(({ searchTerms, genres }) => {
      const queryParams: Params = {};

      if (searchTerms) {
        queryParams['searchTerms'] = searchTerms;
      }

      if ((genres ?? []).length > 0) {
        queryParams['genres'] = genres?.join(',');
      }

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams,
      });
    });
  }

  createNewFiltersForm() {
    const form = createFiltersForm();

    // set form fields (once)
    const queryParams = this.activatedRoute.snapshot.queryParams;

    if (queryParams['searchTerms']) {
      form.patchValue({ searchTerms: queryParams['searchTerms'] });
    }

    if (queryParams['genres']) {
      form.patchValue({ genres: queryParams['genres'].split(',') });
    }

    return form;
  }

  // store filter changes to url
  // bindQueryParams() {
  //   const filter$ = this.form.valueChanges.pipe(
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //   );

  //   return filter$
  //     .pipe(
  //       map(({ genres, ...rest }) => {
  //         const queryParams: Params = { ...rest };

  //         // genre requires remapping
  //         const genreArr = genres ?? [];
  //         if (genreArr.length > 0) {
  //           queryParams['genres'] = genreArr.join(',');
  //         }

  //         return queryParams;
  //       }),
  //     )
  //     .subscribe((queryParams) => {
  //       this.router.navigate([], {
  //         relativeTo: this.activatedRoute,
  //         queryParams,
  //       });
  //     });
  // }

  // bindFilterState() {
  //   return this.activatedRoute.queryParams.subscribe(() => {
  //     console.log('filter updated');
  //   });
  // }

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

function createFiltersForm() {
  const nonNullable = true;

  return new FormGroup({
    searchTerms: new FormControl<string>('', { nonNullable }),
    genres: new FormControl<string[]>([], { nonNullable }),
  });
}
