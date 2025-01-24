import { Routes } from '@angular/router';

import { QuoteLibComponent } from './quote-lib.component';

export const FEATURE_QUOTE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: '',
    component: QuoteLibComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
