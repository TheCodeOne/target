import { Test, TestingModule } from '@nestjs/testing';

import { LongStringGeneratorService } from './long-string-generator.service';

describe('LongStringGeneratorService', () => {
  let service: LongStringGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LongStringGeneratorService],
    }).compile();

    service = module.get<LongStringGeneratorService>(
      LongStringGeneratorService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
