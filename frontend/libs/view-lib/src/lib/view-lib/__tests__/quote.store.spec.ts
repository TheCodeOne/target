import { TestBed } from '@angular/core/testing';
import { fakerEN } from '@faker-js/faker';
import { QuoteResponseDto } from '@target/interfaces';
import { of } from 'rxjs';

import { QuoteService } from '../../../../../input-lib/src/lib/input-lib/store/services/quote.service';
import { QuoteStore } from '../store/quote.store';

describe('QuoteStore', () => {
  let store: any;
  let quoteService: QuoteService;

  const mockQuoteResponse: QuoteResponseDto = {
    id: fakerEN.string.alpha({ length: 15 }),
    basisdaten: {
      geburtsdatum: '2000-01-01',
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
      fetchQuote: jest.fn(),
    } as unknown as jest.Mocked<QuoteService>;

    TestBed.configureTestingModule({
      providers: [{ provide: QuoteService, useValue: quoteService }],
    });

    store = TestBed.inject(QuoteStore);
  });

  it('should fetch quote and update state', async () => {
    jest
      .spyOn(quoteService, 'fetchQuote')
      .mockReturnValue(of(mockQuoteResponse));

    await store.fetchQuote(mockQuoteResponse.id);

    expect(quoteService.fetchQuote).toHaveBeenCalledWith(mockQuoteResponse.id);
    expect(quoteService.fetchQuote).toHaveBeenCalledTimes(1);

    expect(store.quoteState()).toEqual(mockQuoteResponse);
  });
});
