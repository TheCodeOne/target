import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { QuoteRequestDto } from '@target/interfaces';
import { InputDtoSchema } from '@target/validations';
import { lastValueFrom } from 'rxjs';

import { Input, InputState, InputStatePropertiesEnum } from './input.store.interfaces';
import { QuoteService } from './services/quote.service';

const initialState: InputState = {
  [InputStatePropertiesEnum.LeistungsVorgabe]: { value: 'Beitrag', valid: true, error: null },
  [InputStatePropertiesEnum.Beitrag]: { value: 1000, valid: true, error: null },
  [InputStatePropertiesEnum.BerechnungDerLaufzeit]: { value: 'Alter bei Rentenbeginn', valid: true, error: null },
  [InputStatePropertiesEnum.Laufzeit]: { value: 10, valid: true, error: null },
  [InputStatePropertiesEnum.Beitragszahlungsweise]: { value: 'Einmalbeitrag', valid: true, error: null },
  [InputStatePropertiesEnum.Rentenzahlungsweise]: { value: 'Monatliche Renten', valid: true, error: null },
  [InputStatePropertiesEnum.Geburtstag]: {
    value: null,
    valid: false,
    error: null
  }
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
      const validationResult = await InputDtoSchema.safeParseAsync(
        transformUiStateToInputDto(initialNewState)
      );

      if (validationResult.success) {
        patchState(store, { uiState: initialNewState });
        return;
      }

      const validatedState = validationResult.error.errors.reduce(
        (state, { path, message }) => ({
          ...state,
          [path[0]]: {
            ...state[path[0] as keyof InputState],
            valid: false,
            error: message,
          },
        }),
        initialNewState
      );

      patchState(store, { uiState: validatedState });
    },
    calculate: async (): Promise<string> => {
      const quoteDto = transformUiStateToInputDto(store.uiState());
      const validationResult = await InputDtoSchema.safeParseAsync(quoteDto);

      if (!validationResult.success) {
        throw new Error('Invalid input');
      }

      return (
        await lastValueFrom(
          quoteService.calculateQuote(quoteDto as QuoteRequestDto)
        )
      ).id;
    },
  }))
);

const transformUiStateToInputDto = (state: InputState): QuoteRequestDto => Object.entries(state).reduce((acc, [key, { value }]) => ({ ...acc, [key]: value }), {} as QuoteRequestDto);
