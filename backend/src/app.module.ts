import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { InboundLoadsModule } from './inbound-loads/inbound-loads.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [PrismaModule, InboundLoadsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
