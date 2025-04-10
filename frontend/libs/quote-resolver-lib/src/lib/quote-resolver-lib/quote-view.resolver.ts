import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QuoteStore } from '@target/view-lib';

export const quoteViewResolver: ResolveFn<void> = (route, state) => {
  const quoteStore = inject(QuoteStore);

  return quoteStore.fetchQuote(route.params['id']);
};
