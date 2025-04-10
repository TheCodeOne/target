import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QuoteStore } from '@target/quota-store-lib';

export const quoteViewResolver: ResolveFn<void> = (route, _) => {
  const quoteStore = inject(QuoteStore);

  return quoteStore.fetchQuote(route.params['id']);
};
