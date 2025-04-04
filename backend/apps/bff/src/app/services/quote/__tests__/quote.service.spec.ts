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
      const geburtsdatum = '2000-01-01';

      const beitrag = 1000;

      const expectedQuote = {
        basisdaten: {
          geburtsdatum: geburtsdatum,
          versicherungsbeginn: '2025-02-01',
          garantieniveau: '90%',
          alterBeiRentenbeginn: 67,
          aufschubdauer: 30,
          beitragszahlungsdauer: 10,
        },
        leistungsmerkmale: {
          garantierteMindestrente: beitrag * 50,
          einmaligesGarantiekapital: beitrag / 2,
          todesfallleistungAbAltersrentenbezug: 67,
        },
        beitrag: {
          einmalbeitrag: beitrag,
          beitragsdynamik: '1,5%',
        },
      };
      const result = await service.getQuote({
        beitrag,
        geburtsdatum,
      });

      expect(result).toEqual(expectedQuote);
    });
  });
});
