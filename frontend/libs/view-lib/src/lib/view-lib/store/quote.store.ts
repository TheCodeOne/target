import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { lastValueFrom } from 'rxjs';

import { QuoteService } from '../../../../../input-lib/src/lib/input-lib/store/services/quote.service';
import { QuoteState } from './quote.store.interface';

const initialState: QuoteState = {
  basisdaten: {
    geburtsdatum: '',
    versicherungsbeginn: '',
    garantieniveau: '',
    alterBeiRentenbeginn: 0,
    aufschubdauer: 0,
    beitragszahlungsdauer: 0,
  },
  leistungsmerkmale: {
    garantierteMindestrente: 0,
    einmaligesGarantiekapital: 0,
    todesfallleistungAbAltersrentenbezug: 0,
  },
  beitrag: {
    einmalbeitrag: 0,
    beitragsdynamik: '',
  },
};

export const QuoteStore = signalStore(
  { providedIn: 'root' },
  withState({ quoteState: initialState }),
  withMethods((store, quoteService = inject(QuoteService)) => ({
    fetchQuote: async (quoteId: string): Promise<void> => {
      const quote = await lastValueFrom(quoteService.fetchQuote(quoteId));
      patchState(store, { quoteState: { ...quote } });
    },
  }))
);
