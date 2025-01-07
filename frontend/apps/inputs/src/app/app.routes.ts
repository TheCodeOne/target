import { Route } from '@angular/router';
import { FEATURE_INPUT_ROUTES } from '@target/input-lib';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inputs',
  },
  {
    path: 'inputs',
    children: FEATURE_INPUT_ROUTES,
  },
  {
    path: '**',
    redirectTo: '/inputs',
  },
];
