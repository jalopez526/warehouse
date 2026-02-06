import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';
import { InboundLoad, InboundStatus, Prisma } from '@prisma/client';

@Injectable()
export class InboundLoadsService {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway,
  ) {}

  async findAll() {
    return this.prisma.inboundLoad.findMany({
      orderBy: { eta: 'asc' },
    });
  }

  async create(data: Prisma.InboundLoadCreateInput) {
    const load = await this.prisma.inboundLoad.create({ data });
    this.eventsGateway.emit('load.created', load);
    return load;
  }

  async update(id: string, data: Prisma.InboundLoadUpdateInput) {
    const load = await this.prisma.inboundLoad.update({
      where: { id },
      data,
    });
    this.eventsGateway.emit('load.updated', load);
    return load;
  }
}
