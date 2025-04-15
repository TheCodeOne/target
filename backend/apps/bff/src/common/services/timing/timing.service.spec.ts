import { Test, TestingModule } from '@nestjs/testing';
import { TimingService } from './timing.service';

describe('TimingService', () => {
  let service: TimingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimingService],
    }).compile();

    service = module.get<TimingService>(TimingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
