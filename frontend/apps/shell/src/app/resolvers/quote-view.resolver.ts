import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { QuoteStore } from '../../../../../libs/view-lib/src/lib/view-lib/store/quote.store';

export const quoteViewResolver: ResolveFn<void> = (route, state) => {
  const quoteStore = inject(QuoteStore);

  return quoteStore.fetchQuote(route.params['id']);
};
