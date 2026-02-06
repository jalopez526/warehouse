import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InboundLoadsService } from './inbound-loads.service';
import { Prisma, InboundStatus } from '@prisma/client';

@Controller('inbound-loads')
export class InboundLoadsController {
  constructor(private readonly inboundLoadsService: InboundLoadsService) {}

  @Get()
  findAll() {
    return this.inboundLoadsService.findAll();
  }

  @Post()
  create(@Body() data: Prisma.InboundLoadCreateInput) {
    return this.inboundLoadsService.create(data);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: InboundStatus,
  ) {
    return this.inboundLoadsService.update(id, { status });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.InboundLoadUpdateInput) {
    return this.inboundLoadsService.update(id, data);
  }
}
