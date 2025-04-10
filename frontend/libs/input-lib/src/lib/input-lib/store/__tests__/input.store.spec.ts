import { TestBed } from '@angular/core/testing';
import { fakerEN } from '@faker-js/faker';
import { QuoteCreateResponseDto } from '@target/interfaces';
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

  const quoteCreateResponseDtoMock: QuoteCreateResponseDto = {
    id: fakerEN.string.alpha({ length: 15 }),
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
      const input = [{ key: 'beitrag', value: 2000 }];

      (InputDtoSchema.safeParseAsync as jest.Mock).mockResolvedValue({
        success: true,
      });

      await (store as any).updateInputs(input);

      expect(store.uiState().beitrag.value).toBe(2000);
      expect(store.uiState().beitrag.valid).toBe(true);
      expect(store.uiState().beitrag.error).toBeNull();
    });

    it('should update state with validation errors when validation fails', async () => {
      const input = [{ key: 'beitrag', value: -1 }];

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
      quoteService.calculateQuote.mockReturnValue(
        of(quoteCreateResponseDtoMock)
      );

      await (store as any).calculate();

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
      (InputDtoSchema.safeParseAsync as jest.Mock).mockResolvedValue({
        success: true,
      });
      const error = new Error('Invalid input');

      quoteService.calculateQuote.mockReturnValue(throwError(() => error));

      await expect((store as any).calculate()).rejects.toThrow(error);

      expect(quoteService.calculateQuote).toHaveBeenCalled();
    });
  });
});
