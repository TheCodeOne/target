import { TestBed } from '@angular/core/testing';
import { fakerEN } from '@faker-js/faker';
import { QuoteResponseDto } from '@target/interfaces';
import { InputDtoSchema } from '@target/validations';
import { of, throwError } from 'rxjs';

import { InputStore } from '../input.store';
import { QuoteService } from '../services/quote.service';

jest.mock('@target/validations', () => ({
  InputDtoSchema: {
    safeParseAsync: jest.fn(),
  },
}));

describe('InputStore', () => {
  let store: any;
  let quoteService: jest.Mocked<QuoteService>;

  const date = fakerEN.date.past({ years: 20 });
  const geburtsdatum = `${date.getUTCFullYear()}-${date.getMonth()}-${date.getDate()}`;

  const mockQuoteResponse: QuoteResponseDto = {
    basisdaten: {
      geburtsdatum,
      versicherungsbeginn: '2024-01-01',
      garantieniveau: '90%',
      alterBeiRentenbeginn: 67,
      aufschubdauer: 30,
      beitragszahlungsdauer: 10,
    },
    leistungsmerkmale: {
      garantierteMindestrente: 50000,
      einmaligesGarantiekapital: 25000,
      todesfallleistungAbAltersrentenbezug: 40000,
    },
    beitrag: {
      einmalbeitrag: 0,
      beitragsdynamik: '1,5%',
    },
  };

  beforeEach(() => {
    quoteService = {
      calculateQuote: jest.fn(),
    } as unknown as jest.Mocked<QuoteService>;

    TestBed.configureTestingModule({
      providers: [{ provide: QuoteService, useValue: quoteService }],
    });

    store = TestBed.inject(InputStore);
  });

  describe('updateInputs', () => {
    it('should update state when validation succeeds', async () => {
      const input = { key: 'beitrag', value: 2000 };

      (InputDtoSchema.safeParseAsync as jest.Mock).mockResolvedValue({
        success: true,
      });

      await (store as any).updateInputs(input);

      expect(store.uiState().beitrag.value).toBe(2000);
      expect(store.uiState().beitrag.valid).toBe(true);
      expect(store.uiState().beitrag.error).toBeNull();
    });

    it('should update state with validation errors when validation fails', async () => {
      const input = { key: 'beitrag', value: -1 };

      (InputDtoSchema.safeParseAsync as jest.Mock).mockResolvedValue({
        success: false,
        error: {
          errors: [{ path: ['beitrag'], message: 'Beitrag must be positive' }],
        },
      });

      await (store as any).updateInputs(input);

      expect(store.uiState().beitrag.value).toBe(-1);
      expect(store.uiState().beitrag.valid).toBe(false);
      expect(store.uiState().beitrag.error).toBe('Beitrag must be positive');
    });
  });

  describe('calculate', () => {
    it('should update quote when calculation succeeds', async () => {
      (InputDtoSchema.safeParseAsync as jest.Mock).mockResolvedValue({
        success: true,
      });
      quoteService.calculateQuote.mockReturnValue(of(mockQuoteResponse));

      await (store as any).calculate();

      expect(store.uiState().quote).toEqual(mockQuoteResponse);
      expect(quoteService.calculateQuote).toHaveBeenCalled();
    });

    it('should handle validation failure', async () => {
      (InputDtoSchema.safeParseAsync as jest.Mock).mockResolvedValue({
        success: false,
      });

      await expect((store as any).calculate()).rejects.toThrowError(
        'Invalid input'
      );
    });

    it('should handle API errors', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      (InputDtoSchema.safeParseAsync as jest.Mock).mockResolvedValue({
        success: true,
      });
      const error = new Error('API Error');

      quoteService.calculateQuote.mockReturnValue(throwError(() => error));

      await (store as any).calculate();

      expect(consoleSpy).toHaveBeenCalledWith(error);
      expect(quoteService.calculateQuote).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
