
import { InboundStatus, OrderStatus, PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Seed Inbound Loads
  await prisma.inboundLoad.createMany({
    data: [
      { carrier: 'Xpress Logistics', eta: new Date(Date.now() + 1000 * 60 * 60 * 2), pallets: 12, dock: 'A1', status: InboundStatus.SCHEDULED },
      { carrier: 'FastFreight', eta: new Date(Date.now() - 1000 * 60 * 30), pallets: 8, dock: 'A2', status: InboundStatus.PROCESSING },
      { carrier: 'Global Shipping', eta: new Date(Date.now() + 1000 * 60 * 60 * 24), pallets: 20, dock: null, status: InboundStatus.PENDING },
      { carrier: 'SwiftMove', eta: new Date(Date.now() - 1000 * 60 * 60 * 1), pallets: 15, dock: 'B1', status: InboundStatus.DELIVERED },
      { carrier: 'EcoTrans', eta: new Date(Date.now() + 1000 * 60 * 45), pallets: 5, dock: 'A3', status: InboundStatus.SCHEDULED },
      { carrier: 'CargoKing', eta: new Date(Date.now() + 1000 * 60 * 60 * 5), pallets: 22, dock: null, status: InboundStatus.PENDING },
      { carrier: 'BlueStar', eta: new Date(Date.now() - 1000 * 60 * 15), pallets: 10, dock: 'B2', status: InboundStatus.PROCESSING },
      { carrier: 'RedLine', eta: new Date(Date.now() - 1000 * 60 * 60 * 3), pallets: 18, dock: 'A4', status: InboundStatus.COMPLETED },
    ],
  });

  // Seed Orders
  await prisma.order.createMany({
    data: [
      { status: OrderStatus.PICKING, units: 45, lineItems: 3, assignedUser: 'John D.' },
      { status: OrderStatus.PENDING, units: 12, lineItems: 1, assignedUser: null },
      { status: OrderStatus.AUDITING, units: 150, lineItems: 10, assignedUser: 'Sarah M.' },
      { status: OrderStatus.AUDITED, units: 20, lineItems: 2, assignedUser: 'Mike R.' },
      { status: OrderStatus.SHIPPING, units: 80, lineItems: 5, assignedUser: 'Steve L.' },
      { status: OrderStatus.FULFILLED, units: 30, lineItems: 4, assignedUser: 'Anna K.' },
      { status: OrderStatus.PICKING, units: 65, lineItems: 6, assignedUser: 'Tom H.' },
      { status: OrderStatus.PENDING, units: 100, lineItems: 8, assignedUser: null },
      { status: OrderStatus.AUDITING, units: 10, lineItems: 1, assignedUser: 'Lisa P.' },
      { status: OrderStatus.SHIPPING, units: 200, lineItems: 15, assignedUser: 'Gary N.' },
      { status: OrderStatus.PICKING, units: 55, lineItems: 4, assignedUser: 'Ben C.' }, 
    ],
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
