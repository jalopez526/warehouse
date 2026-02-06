import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';
import { Order, OrderStatus, Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway,
  ) {}

  async findAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: Prisma.OrderCreateInput) {
    const order = await this.prisma.order.create({ data });
    this.eventsGateway.emit('order.created', order);
    return order;
  }

  async update(id: string, data: Prisma.OrderUpdateInput) {
    const order = await this.prisma.order.update({
      where: { id },
      data,
    });
    this.eventsGateway.emit('order.updated', order);
    return order;
  }
}
