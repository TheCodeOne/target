import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { QuoteRequestDto } from '@target/interfaces';
import { QuoteService } from '@target/service-lib';
import { InputDtoSchema } from '@target/validations';
import { lastValueFrom } from 'rxjs';

import { Input, InputState } from './interface/input.store.interfaces';

const initialState: InputState = {
  geburtsdatum: { value: '', valid: true, error: null },
  leistungsVorgabe: { value: 'Beitrag', valid: true, error: null },
  beitrag: { value: 1000, valid: true, error: null },
  berechnungDerLaufzeit: {
    value: 'Alter bei Rentenbeginn',
    valid: true,
    error: null,
  },
  laufzeit: { value: 10, valid: true, error: null },
  beitragszahlungsweise: { value: 'Einmalbeitrag', valid: true, error: null },
  rentenzahlungsweise: { value: 'Monatliche Renten', valid: true, error: null },
};

export const InputStore = signalStore(
  { providedIn: 'root' },
  withState({ uiState: initialState }),
  withMethods((store, quoteService = inject(QuoteService)) => ({
    updateInputs: async (input: Input[]): Promise<void> => {
      const initialNewState = {
        ...store.uiState(),
        ...transformFromInputArrayToInputState(input),
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

    processErrors: (messages: string[]): void => {
      const errorArr = messages?.map((it) => {
        const errArr = it.split(':');

        return {
          path: errArr[0].trim(),
          message: errArr[1].trim(),
        };
      });

      errorArr?.forEach(({ path, message }) => {
        patchState(store, {
          uiState: {
            ...store.uiState(),
            [path]: {
              ...store.uiState()[path as keyof InputState],
              valid: false,
              error: message,
            },
          },
        });
      });
    },

    calculate: async (): Promise<string> => {
      const quoteDto = transformUiStateToInputDto(store.uiState());
      const validationResult = await InputDtoSchema.safeParseAsync(quoteDto);

      if (!validationResult.success) {
        const validatedState = { ...store.uiState() };

        // Modify the state for all keys to reset errors tpo ensure and fresh validation
        Object.keys(validatedState).forEach((key) => {
          patchState(store, {
            uiState: {
              ...validatedState,
              [key]: {
                ...validatedState[key as keyof InputState],
                valid: true,
                error: null,
              },
            },
          });
        });

        // Modify the state for the keys that have errors
        validationResult.error?.errors.forEach(({ path, message }) => {
          patchState(store, {
            uiState: {
              ...validatedState,
              [path[0]]: {
                ...validatedState[path[0] as keyof InputState],
                valid: false,
                error: message,
              },
            },
          });
        });

        throw new Error('Invalid input');
      }

      return <string>(
        (
          await lastValueFrom(
            quoteService.calculateQuote(quoteDto as QuoteRequestDto)
          )
        ).id
      );
    },
  }))
);

const transformUiStateToInputDto = (state: InputState): QuoteRequestDto =>
  Object.entries(state).reduce(
    (acc, [key, { value }]) => ({
      ...acc,
      [key]: value,
    }),
    {} as QuoteRequestDto
  );

const transformFromInputArrayToInputState = (input: Input[]): {} =>
  input.reduce(
    (acc, { key, value }) => ({
      ...acc,
      [key]: { value: value, valid: true, error: null },
    }),
    {} as InputState
  );
