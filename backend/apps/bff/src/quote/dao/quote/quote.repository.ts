import { Injectable } from '@nestjs/common';

import { QuoteSchema } from '../../data/schema/quote.schema';
import { QuoteStore } from '../../store/quote.store';

@Injectable()
export class QuoteRepository {
  constructor(private quotaStore: QuoteStore) {}

  async create(entity: QuoteSchema): Promise<QuoteSchema> {
    return await this.quotaStore.insert(entity);
  }

  async findOneById(id: string): Promise<QuoteSchema> {
    return await this.quotaStore.retrieve(id);
  }
}
