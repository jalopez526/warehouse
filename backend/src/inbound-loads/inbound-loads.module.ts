import { Module } from '@nestjs/common';
import { InboundLoadsService } from './inbound-loads.service';
import { InboundLoadsController } from './inbound-loads.controller';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [EventsModule],
  providers: [InboundLoadsService],
  controllers: [InboundLoadsController]
})
export class InboundLoadsModule {}
