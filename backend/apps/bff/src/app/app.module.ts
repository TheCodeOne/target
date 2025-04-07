import { Module } from '@nestjs/common';

import { QuoteModule } from '../quote/quote.module';

@Module({
  imports: [QuoteModule],
})
export class AppModule {}
