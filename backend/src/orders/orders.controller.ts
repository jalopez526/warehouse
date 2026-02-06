import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Prisma, OrderStatus } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  create(@Body() data: Prisma.OrderCreateInput) {
    return this.ordersService.create(data);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ) {
    return this.ordersService.update(id, { status });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.OrderUpdateInput) {
    return this.ordersService.update(id, data);
  }
}
