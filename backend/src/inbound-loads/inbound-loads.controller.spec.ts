import { Test, TestingModule } from '@nestjs/testing';
import { InboundLoadsController } from './inbound-loads.controller';

describe('InboundLoadsController', () => {
  let controller: InboundLoadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InboundLoadsController],
    }).compile();

    controller = module.get<InboundLoadsController>(InboundLoadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
