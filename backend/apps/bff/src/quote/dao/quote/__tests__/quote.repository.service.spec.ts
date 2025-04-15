import { fakerEN } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { QuoteSchema } from '../../../data/schema/quote.schema';
import { QuoteStore } from '../../../store/quote.store';
import { QuoteRepository } from '../quote.repository';

describe('QuoteRepositoryService', () => {
  let service: QuoteRepository;
  let quoteStore: QuoteStore;

  const entityMock: QuoteSchema = {
    id: fakerEN.string.alpha({ length: 15 }),
    basisdaten: {
      geburtsdatum: '1990-01-01',
      versicherungsbeginn: '2025-02-01',
      garantieniveau: '90%',
      alterBeiRentenbeginn: 67,
      aufschubdauer: 30,
      beitragszahlungsdauer: 10,
    },
    leistungsmerkmale: {
      garantierteMindestrente: 1000 * 50,
      einmaligesGarantiekapital: 1000 / 2,
      todesfallleistungAbAltersrentenbezug: 67,
    },
    beitrag: {
      einmalbeitrag: 1000,
      beitragsdynamik: '1,5%',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteRepository,
        {
          provide: QuoteStore,
          useValue: { insert: jest.fn(), retrieve: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<QuoteRepository>(QuoteRepository);
    quoteStore = module.get<QuoteStore>(QuoteStore);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(quoteStore).toBeDefined();
  });

  describe('create', () => {
    it('should create quote', async () => {
      jest.spyOn(quoteStore, 'insert').mockResolvedValueOnce(entityMock);

      const res = await service.create(entityMock);

      expect(quoteStore.insert).toHaveBeenCalledWith(entityMock);
      expect(quoteStore.insert).toHaveBeenCalledTimes(1);

      expect(res).toEqual(entityMock);
    });
  });

  describe('retrieve', () => {
    it('should retrieve quote', async () => {
      jest.spyOn(quoteStore, 'retrieve').mockResolvedValueOnce(entityMock);

      const res = await service.findOneById(entityMock.id);

      expect(quoteStore.retrieve).toHaveBeenCalledWith(entityMock.id);
      expect(quoteStore.retrieve).toHaveBeenCalledTimes(1);

      expect(res).toEqual(entityMock);
    });
  });
});
