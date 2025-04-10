import { fakerEN } from '@faker-js/faker';
import { Test } from '@nestjs/testing';

import { LongStringGeneratorService } from '../../../../common/services/long-string-generator/long-string-generator.service';
import { QuoteRepository } from '../../../dao/quote/quote.repository';
import { QuoteService } from '../quote.service';

describe('QuoteService', () => {
  let service: QuoteService;
  let quoteRepository: QuoteRepository;
  let longStringGeneratorService: LongStringGeneratorService;

  const entityMock = {
    basisdaten: {
      geburtsdatum: '2000-01-01',
      versicherungsbeginn: '2025-02-01',
      garantieniveau: '90%',
      alterBeiRentenbeginn: 67,
      aufschubdauer: 30,
      beitragszahlungsdauer: 10,
    },
    leistungsmerkmale: {
      garantierteMindestrente: 5000,
      einmaligesGarantiekapital: 500,
      todesfallleistungAbAltersrentenbezug: 67,
    },
    beitrag: {
      einmalbeitrag: 1000,
      beitragsdynamik: '1,5%',
    },
  };

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        QuoteService,
        {
          provide: QuoteRepository,
          useValue: { create: jest.fn(), findOneById: jest.fn() },
        },
        {
          provide: LongStringGeneratorService,
          useValue: { generate: jest.fn() },
        },
      ],
    }).compile();

    service = app.get<QuoteService>(QuoteService);
    quoteRepository = app.get<QuoteRepository>(QuoteRepository);
    longStringGeneratorService = app.get<LongStringGeneratorService>(
      LongStringGeneratorService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(quoteRepository).toBeDefined();
    expect(longStringGeneratorService).toBeDefined();
  });

  describe('findOnById', () => {
    it('should return quote details for given quote id', async () => {
      const id = fakerEN.string.alpha({ length: 15 });

      const expectedQuote = {
        id,
        ...entityMock,
      };

      jest
        .spyOn(quoteRepository, 'findOneById')
        .mockResolvedValue(expectedQuote);

      const result = await service.findOnById(id);

      expect(quoteRepository.findOneById).toHaveBeenCalledWith(id);
      expect(quoteRepository.findOneById).toHaveBeenCalledTimes(1);

      expect(result).toEqual(expectedQuote);
    });
  });

  describe('createQuote', () => {
    it('should save quote details from a quote schema', async () => {
      const id = fakerEN.string.alpha({ length: 15 });

      const expectedQuote = {
        id,
        ...entityMock,
      };

      jest.spyOn(quoteRepository, 'create').mockResolvedValue(expectedQuote);
      jest.spyOn(longStringGeneratorService, 'generate').mockReturnValue(id);

      const result = await service.createQuote(entityMock);

      expect(quoteRepository.create).toHaveBeenCalledWith(expectedQuote);
      expect(quoteRepository.create).toHaveBeenCalledTimes(1);

      expect(longStringGeneratorService.generate).toHaveBeenCalledTimes(1);

      expect(result).toEqual(expectedQuote);
    });
  });

  describe('calculateQuote', () => {
    it('should calculate quote from initial params', async () => {
      const geburtsdatum = '2000-01-01';
      const beitrag = 1000;

      const entityMock = {
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

      const result = service.calculateQuote({
        beitrag,
        geburtsdatum,
      });

      expect(result).toEqual(entityMock);
    });
  });
});
