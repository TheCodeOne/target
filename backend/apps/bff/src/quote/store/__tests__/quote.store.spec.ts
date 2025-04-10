import { fakerEN } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';

import { QuoteSchema } from '../../data/schema/quote.schema';
import { QuoteStore } from '../quote.store';

describe('QuoteStore', () => {
  let service: QuoteStore;

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
      garantierteMindestrente: 50000,
      einmaligesGarantiekapital: 500,
      todesfallleistungAbAltersrentenbezug: 67,
    },
    beitrag: {
      einmalbeitrag: 1000,
      beitragsdynamik: '1,5%',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteStore],
    }).compile();

    service = module.get<QuoteStore>(QuoteStore);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('insert', () => {
    it('should create quote', async () => {
      const res = await service.insert(entityMock);

      expect(res).toEqual(entityMock);
    });
  });

  describe('retrieve', () => {
    it('should get quote', async () => {
      service['quotaStorage'].set(entityMock.id, entityMock);

      const res = await service.retrieve(entityMock.id);

      expect(res).toEqual(entityMock);
    });
  });
});
