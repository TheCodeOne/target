import { Route } from '@angular/router';
import { InputLibComponent } from '@target/input-lib';
import { quoteViewResolver } from '@target/quote-resolver-lib';
import { ViewLibComponent } from '@target/view-lib';

const ROUTES = {
  INPUTS: 'inputs',
  VIEW: 'view/:id',
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
    resolve: [quoteViewResolver],
  },
  {
    path: '**',
    redirectTo: ROUTES.INPUTS,
  },
];
