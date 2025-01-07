import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { QuoteRequestDto } from '@target/interfaces';
import { InputDtoSchema } from '@target/validations';
import { lastValueFrom } from 'rxjs';

import { Input, InputState } from './input.store.interfaces';
import { QuoteService } from './services/quote.service';

const initialState: InputState = {
  leistungsVorgabe: { value: 'Beitrag', valid: true, error: null },
  beitrag: { value: 1000, valid: true, error: null },
  berechnungDerLaufzeit: { value: 'Alter bei Rentenbeginn', valid: true, error: null },
  laufzeit: { value: 10, valid: true, error: null },
  beitragszahlungsweise: { value: 'Einmalbeitrag', valid: true, error: null },
  rentenzahlungsweise: { value: 'Monatliche Renten', valid: true, error: null },
  quote: {
    basisdaten: {
      geburtsdatum: '',
      versicherungsbeginn: '',
      garantieniveau: '',
      alterBeiRentenbeginn: 0,
      aufschubdauer: 0,
      beitragszahlungsdauer: 0
    },
    leistungsmerkmale: {
      garantierteMindestrente: 0,
      einmaligesGarantiekapital: 0,
      todesfallleistungAbAltersrentenbezug: 0
    },
    beitrag: {
      einmalbeitrag: 0,
      beitragsdynamik: ''
    },
  },
};

export const InputStore = signalStore(
  { providedIn: 'root' },
  withState({ uiState: initialState }),
  withMethods((store, quoteService = inject(QuoteService)) => ({
    updateInputs: async (input: Input): Promise<void> => {
      const initialNewState = {
        ...store.uiState(),
        [input.key]: { value: input.value, valid: true, error: null },
      };
      const validationResult = await InputDtoSchema.safeParseAsync(transformUiStateToInputDto(initialNewState));

      if (validationResult.success) {
        patchState(store, { uiState: initialNewState });
        return;
      }

      const validatedState = validationResult.error.errors.reduce(
        (state, { path, message }) => ({
          ...state,
          [path[0]]: { ...state[path[0] as keyof InputState], valid: false, error: message },
        }),
        initialNewState
      );

      patchState(store, { uiState: validatedState });
    },
    calculate: async (): Promise<void> => {
      const quoteDto = transformUiStateToInputDto(store.uiState());
      const validationResult = await InputDtoSchema.safeParseAsync(quoteDto);

      try {
        if (!validationResult.success) {
          throw new Error('Invalid input');
        }

        const quote = await lastValueFrom(quoteService.calculateQuote(quoteDto as QuoteRequestDto));

        patchState(store, { uiState: { ...store.uiState(), quote } });
      } catch (error) {
        console.error(error);
      }
    },
  }))
);

const transformUiStateToInputDto = (state: InputState): QuoteRequestDto => Object.entries(state).reduce((acc, [key, { value }]) => ({ ...acc, [key]: value }), {} as QuoteRequestDto);
