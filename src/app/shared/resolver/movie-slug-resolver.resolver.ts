import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MoviesService } from '@services/movies/movies.service';
import { Movie } from '@shared/state/movies/movies.models';
import { Optional } from '@shared/type-helpers';

export const movieSlugResolverResolver: ResolveFn<Optional<Movie>> = (
  route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  state, // required by test files
) => {
  const slug = route.params['slug'];
  const service = inject(MoviesService);

  return service.fetchMovie(slug);
};
