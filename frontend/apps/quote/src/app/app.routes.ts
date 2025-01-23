import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/quote',
  },
  {
    path: 'quote',
    children: [],
  },
  {
    path: '**',
    redirectTo: '/quote',
  },
];
