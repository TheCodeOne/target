import { TestBed } from '@angular/core/testing';
import { fakerEN } from '@faker-js/faker';
import { QuoteResponseDto } from '@target/interfaces';
import { QuoteService } from '@target/service-lib';
import { InputDtoSchema } from '@target/validations';
import { of } from 'rxjs';

import { InputStore } from '../input.store';

jest.mock('@target/validations', () => ({
  InputDtoSchema: {
    safeParseAsync: jest.fn(),
  },
}));

describe('InputStore', () => {
  let store: any;
  let quoteService: QuoteService;

  const mockQuoteResponse: QuoteResponseDto = {
    id: fakerEN.string.alpha({ length: 15 }),
    basisdaten: {
      geburtsdatum: '1990-01-01',
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
    TestBed.configureTestingModule({
      providers: [
        {
          provide: QuoteService,
          useValue: { calculateQuote: jest.fn(), fetchQuote: jest.fn() },
        },
      ],
    });

    store = TestBed.inject(InputStore);
    quoteService = TestBed.inject(QuoteService);
  });

  describe('updateInputs', () => {
    it('should update state when validation succeeds', async () => {
      const input = { key: 'beitrag', value: 2000 };

      (InputDtoSchema.safeParseAsync as jest.Mock).mockResolvedValue({
        success: true,
      });

      await (store as any).updateInputs([input]);

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

      await (store as any).updateInputs([input]);

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

      jest
        .spyOn(quoteService, 'calculateQuote')
        .mockReturnValue(of(mockQuoteResponse));

      await (store as any).calculate();

      expect(quoteService.calculateQuote).toHaveBeenCalled();
    });

    it('should handle validation failure', async () => {
      (InputDtoSchema.safeParseAsync as jest.Mock).mockResolvedValue({
        success: false,
      });

      await expect((store as any).calculate()).rejects.toThrow(
        new Error('Invalid input')
      );

      expect(quoteService.calculateQuote).not.toHaveBeenCalled();
    });
  });
});
