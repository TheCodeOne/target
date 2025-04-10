import { Injectable } from '@nestjs/common';

import { TimingService } from '../../common/services/timing/timing.service';
import { QuoteSchema } from '../data/schema/quote.schema';

@Injectable()
export class QuoteStore {
  private quotaStorage = new Map<string, QuoteSchema>();

  async insert(entity: QuoteSchema): Promise<QuoteSchema> {
    const _entity = this.quotaStorage.set(entity.id, entity);

    await TimingService.sleep();

    return _entity.get(entity.id);
  }

  async retrieve(id: string): Promise<QuoteSchema> {
    await TimingService.sleep();

    return this.quotaStorage.get(id);
  }
}
