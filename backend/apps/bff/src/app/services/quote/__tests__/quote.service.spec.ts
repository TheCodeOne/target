import { Test } from '@nestjs/testing';

import { QuoteService } from '../quote.service';

describe('QuoteService', () => {
  let service: QuoteService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [QuoteService],
    }).compile();

    service = app.get<QuoteService>(QuoteService);
  });

  describe('getQuote', () => {
    it('should return quote details for given contribution amount', async () => {
      const expectedQuote = {
        basisdaten: {
          geburtsdatum: '1990-01-01',
          versicherungsbeginn: '2025-02-01',
          garantieniveau: '90%',
          alterBeiRentenbeginn: 67,
          aufschubdauer: 30,
          beitragszahlungsdauer: 10
        },
        leistungsmerkmale: {
          garantierteMindestrente: 50000,
          einmaligesGarantiekapital: 500,
          todesfallleistungAbAltersrentenbezug: 67
        },
        beitrag: {
          einmalbeitrag: 1000,
          beitragsdynamik: '1,5%'
        }
      };
      const result = await service.getQuote({ beitrag: 1000 });

      expect(result).toEqual(expectedQuote);
    });
  });
});
