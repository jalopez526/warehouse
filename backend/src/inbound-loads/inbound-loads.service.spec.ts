import { Test, TestingModule } from '@nestjs/testing';
import { InboundLoadsService } from './inbound-loads.service';

describe('InboundLoadsService', () => {
  let service: InboundLoadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InboundLoadsService],
    }).compile();

    service = module.get<InboundLoadsService>(InboundLoadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
