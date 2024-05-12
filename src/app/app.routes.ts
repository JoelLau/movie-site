import { Route } from '@angular/router';

export const appRoutes: Route[] = [{
  path: '',
  pathMatch: 'full',
  loadComponent: () => import('./pages/home-page.component').then(m => m.HomePageComponent)
}];
