import { Route } from '@angular/router';
import { movieSlugResolverResolver } from '@shared/resolver/movie-slug-resolver.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent,
      ),
  },
  {
    path: 'movies',
    pathMatch: 'full',
    loadComponent: () =>
      import('@pages/movies-page/movies-page.component').then(
        (m) => m.MoviesPageComponent,
      ),
  },
  {
    path: 'movies/:slug',
    pathMatch: 'full',
    loadComponent: () =>
      import('@pages/movie-page/movie-page.component').then(
        (m) => m.MoviePageComponent,
      ),
    resolve: { movie: movieSlugResolverResolver },
  },
];
