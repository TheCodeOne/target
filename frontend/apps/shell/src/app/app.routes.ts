import { loadRemoteModule } from '@angular-architects/native-federation';
import { Route } from '@angular/router';
import { NAVIGATION_ROUTES } from '@target/navigation';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: NAVIGATION_ROUTES.INPUTS,
  },
  {
    path: NAVIGATION_ROUTES.INPUTS,
    loadChildren: () => loadRemoteModule('mfeInputs', './mfe'),
  },
  {
    path: NAVIGATION_ROUTES.QUOTE,
    loadChildren: () => loadRemoteModule('mfeQuote', './mfe'),
  },
  {
    path: '**',
    redirectTo: NAVIGATION_ROUTES.INPUTS,
  },
];
