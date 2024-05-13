import { Route } from '@angular/router';

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
];
