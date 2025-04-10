import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { QuoteRequestDto } from '@target/interfaces';

import { LongStringGeneratorService } from '../../../common/services/long-string-generator/long-string-generator.service';
import { QuoteRepository } from '../../dao/quote/quote.repository';
import { quoteMock } from '../../data/mock/quote.mock';
import { QuoteSchema } from '../../data/schema/quote.schema';

@Injectable()
export class QuoteService {
  constructor(
    private quoteRepository: QuoteRepository,
    private longStringGeneratorService: LongStringGeneratorService
  ) {}

  calculateQuote({
    beitrag,
    geburtsdatum,
  }: QuoteRequestDto): Omit<QuoteSchema, 'id'> {
    return {
      basisdaten: { ...quoteMock.basisdaten, geburtsdatum: geburtsdatum },
      leistungsmerkmale: {
        ...quoteMock.leistungsmerkmale,
        garantierteMindestrente: beitrag * 50,
        einmaligesGarantiekapital: beitrag / 2,
      },
      beitrag: {
        ...quoteMock.beitrag,
        einmalbeitrag: beitrag,
      },
    } as Omit<QuoteSchema, 'id'>;
  }

  async createQuote(quote: Omit<QuoteSchema, 'id'>): Promise<QuoteSchema> {
    try {
      const _quote = {
        ...quote,
        id: this.longStringGeneratorService.generate(),
      };

      return await this.quoteRepository.create(_quote);
    } catch (entityInsertError) {
      throw new HttpException(entityInsertError.message, entityInsertError);
    }
  }

  async findOnById(id: string): Promise<QuoteSchema> {
    try {
      return await this.quoteRepository.findOneById(id);
    } catch (entityFindError) {
      throw new NotFoundException(entityFindError.message);
    }
  }
}
