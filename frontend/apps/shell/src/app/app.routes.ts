import { loadRemoteModule } from '@angular-architects/native-federation';
import { Route } from '@angular/router';

const ROUTES = {
  INPUTS: 'inputs',
};

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTES.INPUTS,
  },
  {
    path: ROUTES.INPUTS,
    loadChildren: () => loadRemoteModule('mfeInputs', './mfe'),
  },
  {
    path: '**',
    redirectTo: ROUTES.INPUTS,
  },
];
