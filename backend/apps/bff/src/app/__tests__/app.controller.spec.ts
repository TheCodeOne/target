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
    it('should call quoteService.getQuote with the provided DTO', async () => {
      const mockQuoteDto: QuoteRequestDto = {
        // Add required properties based on your DTO
        rentenzahlungsweise: 'Monatliche Renten',
      } as QuoteRequestDto;
      const expectedResult = {
        basisdaten: {
          geburtsdatum: '1990-01-01',
          versicherungsbeginn: '2024-01-01',
          garantieniveau: '100%',
          alterBeiRentenbeginn: 67,
          aufschubdauer: 30,
          beitragszahlungsdauer: 30
        },
        leistungsmerkmale: {
          garantierteMindestrente: 1000,
          einmaligesGarantiekapital: 50000,
          todesfallleistungAbAltersrentenbezug: 40000
        },
        beitrag: {
          einmalbeitrag: 50000,
          beitragsdynamik: '3%'
        }
      };

      quoteService.getQuote.mockResolvedValue(expectedResult);

      const result = await appController.getQuote(mockQuoteDto);

      expect(quoteService.getQuote).toHaveBeenCalledWith(mockQuoteDto);
      expect(result).toBe(expectedResult);
    });
  });
});
