import { inject, Injectable } from '@angular/core';
import { patchState,signalState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { QuoteResponseDto } from '@target/interfaces';
import { catchError, EMPTY, exhaustMap, pipe, tap } from 'rxjs';

import { QuoteService } from '../quote-http/quote.service';

type QuoteState = { quote: QuoteResponseDto | null; isLoading: boolean };

const initialState: QuoteState = {
  quote: null,
  isLoading: false,
};

@Injectable({ providedIn: 'root' })
export class QuoteStateService {
  private readonly quoteService = inject(QuoteService);
  private readonly state = signalState(initialState);

  readonly quote = this.state.quote;
  readonly isLoading = this.state.isLoading;

  readonly loadQuote = rxMethod<string>(
    pipe(
      tap(() => patchState(this.state, { isLoading: true })),
      exhaustMap((quoteId) => {
        return this.quoteService.getQuote(quoteId).pipe(
          tap((response) => patchState(this.state, { quote: response, isLoading: false })),
          catchError(() => {
            patchState(this.state, { isLoading: false });
            return EMPTY;
          })
        );
      })
    )
  );
}