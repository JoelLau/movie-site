import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { Movie } from '@shared/state/movies/movies.models';
import { MoviesState } from '@shared/state/movies/movies.state';
import { Optional } from '@shared/type-helpers';

export const movieSlugResolverResolver: ResolveFn<Optional<Movie>> = (
  route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  state, // required by test files
) => {
  const store = inject(Store);
  const slug = route.params['slug'];
  return store
    .select(MoviesState.findMovieBySlugFn)
    .pipe(map((findMovieBySlug) => findMovieBySlug(slug)));
};
