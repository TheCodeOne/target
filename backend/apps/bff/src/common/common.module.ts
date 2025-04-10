import { Module } from '@nestjs/common';

import { LongStringGeneratorService } from './services/long-string-generator/long-string-generator.service';
import { TimingService } from './services/timing/timing.service';

@Module({
  providers: [LongStringGeneratorService, TimingService],
  exports: [LongStringGeneratorService, TimingService],
})
export class CommonModule {}
