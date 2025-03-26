import { Route } from '@angular/router';
import { InputLibComponent } from '@target/input-lib';
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
    component: InputLibComponent,
  },
  {
    path: '**',
    redirectTo: ROUTES.INPUTS,
  },
];
