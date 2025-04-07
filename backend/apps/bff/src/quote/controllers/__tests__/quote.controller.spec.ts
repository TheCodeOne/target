import { fakerEN } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { QuoteRequestDto } from '@target/interfaces';

import { QuoteSchema } from '../../data/schema/quote.schema';
import { QuoteService } from '../../services/quote/quote.service';
import { QuoteController } from '../quoteController';

describe('QuotaController', () => {
  let appController: QuoteController;
  let quoteService: jest.Mocked<QuoteService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        {
          provide: QuoteService,
          useValue: { calculateQuote: jest.fn(), createQuote: jest.fn() },
        },
      ],
    }).compile();

    appController = module.get<QuoteController>(QuoteController);
    quoteService = module.get(QuoteService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
    expect(quoteService).toBeDefined();
  });

  describe('getQuote', () => {
    it('should call process quote with a valid birthday', async () => {
      const mockQuoteDto: QuoteRequestDto = {
        geburtsdatum: '2020-01-01',
        leistungsVorgabe: 'Beitrag',
        beitrag: 1000,
        berechnungDerLaufzeit: 'Alter bei Rentenbeginn',
        laufzeit: 10,
        beitragszahlungsweise: 'Einmalbeitrag',
        rentenzahlungsweise: 'Monatliche Renten',
      };

      const calculatedQuote: Omit<QuoteSchema, 'id'> = {
        basisdaten: {
          geburtsdatum: '2020-01-01',
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

      const expectedQuote = {
        ...calculatedQuote,
        id: fakerEN.string.alpha({ length: 15 }),
      };

      jest
        .spyOn(quoteService, 'calculateQuote')
        .mockReturnValueOnce(calculatedQuote);
      jest
        .spyOn(quoteService, 'createQuote')
        .mockResolvedValueOnce(expectedQuote);

      const result = await appController.post(mockQuoteDto);

      expect(quoteService.calculateQuote).toHaveBeenCalledWith({
        beitrag: mockQuoteDto.beitrag,
        geburtsdatum: mockQuoteDto.geburtsdatum,
      });
      expect(quoteService.calculateQuote).toHaveBeenCalledTimes(1);

      expect(quoteService.createQuote).toHaveBeenCalledWith(calculatedQuote);
      expect(quoteService.createQuote).toHaveBeenCalledTimes(1);

      expect(result).toBe(expectedQuote);
    });
  });
});
