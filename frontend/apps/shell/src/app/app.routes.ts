import { Route } from '@angular/router';
import { InputLibComponent } from '@target/input-lib';
import { ViewLibComponent } from '@target/view-lib';

const ROUTES = {
  INPUTS: 'inputs',
  VIEW: 'view',
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
    path: ROUTES.VIEW,
    component: ViewLibComponent,
  },
  {
    path: '**',
    redirectTo: ROUTES.INPUTS,
  },
];
