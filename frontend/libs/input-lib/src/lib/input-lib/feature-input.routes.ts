import { Routes } from '@angular/router';

import { InputLibComponent } from './input-lib.component';

export const FEATURE_INPUT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  {
    path: '',
    component: InputLibComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
