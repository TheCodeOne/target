import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NAVIGATION_ROUTES } from '../../navigation-routes';

@Injectable({
  providedIn: 'root'
})
export class NavigatorService {
  private readonly router = inject(Router);

  toQuote(quoteId: string): void {
    this.router.navigate([`/${NAVIGATION_ROUTES.QUOTE}`], { queryParams: { quoteId } })
  }
}
