import { Test, TestingModule } from '@nestjs/testing';
import { QuoteRequestDto } from '@target/interfaces';

import { AppController } from '../app.controller';
import { QuoteService } from '../services/quote/quote.service';

jest.mock('../services/quote/quote.service');

describe('AppController', () => {
  let appController: AppController;
  let quoteService: jest.Mocked<QuoteService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [QuoteService],
    }).compile();

    appController = module.get<AppController>(AppController);
    quoteService = module.get(QuoteService);
  });

  describe('getQuote', () => {
    it('should call process quote with a valid birthday', async () => {
      const geburtsdatum = '2020-01-01';

      const mockQuoteDto: QuoteRequestDto = {
        geburtsdatum,
        leistungsVorgabe: 'Beitrag',
        beitrag: 1000,
        berechnungDerLaufzeit: 'Alter bei Rentenbeginn',
        laufzeit: 10,
        beitragszahlungsweise: 'Einmalbeitrag',
        rentenzahlungsweise: 'Monatliche Renten',
      } as QuoteRequestDto;

      const expectedResult = {
        basisdaten: {
          geburtsdatum,
          versicherungsbeginn: '2024-01-01',
          garantieniveau: '100%',
          alterBeiRentenbeginn: 67,
          aufschubdauer: 30,
          beitragszahlungsdauer: 30,
        },
        leistungsmerkmale: {
          garantierteMindestrente: 1000,
          einmaligesGarantiekapital: 50000,
          todesfallleistungAbAltersrentenbezug: 40000,
        },
        beitrag: {
          einmalbeitrag: 50000,
          beitragsdynamik: '3%',
        },
      };

      quoteService.getQuote.mockResolvedValue(expectedResult);

      const result = await appController.getQuote(mockQuoteDto);

      expect(quoteService.getQuote).toHaveBeenCalledWith(mockQuoteDto);
      expect(result).toBe(expectedResult);
    });
  });
});
