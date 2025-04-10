import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { QuoteController } from './controllers/quoteController';
import { QuoteRepository } from './dao/quote/quote.repository';
import { QuoteService } from './services/quote/quote.service';
import { QuoteStore } from './store/quote.store';

@Module({
  imports: [CommonModule],
  controllers: [QuoteController],
  providers: [QuoteRepository, QuoteService, QuoteStore],
})
export class QuoteModule {}
