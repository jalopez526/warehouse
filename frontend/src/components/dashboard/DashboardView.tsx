import { Loader2 } from 'lucide-react';
import { Card } from '../Card.tsx';
import { DataMetric } from '../DataMetric.tsx';
import { DashColumn } from './DashColumn.tsx';
import { LoadCard } from './LoadCard.tsx';
import { OrderCard } from './OrderCard.tsx';
import type { InboundLoad, Order } from '../../types';

interface DashboardViewProps {
    isLoading: boolean;
    kpis: {
        totalOrders: number;
        totalUnits: number;
        totalPallets: number;
        onTimePct: number;
    };
    columns: {
        receiving: InboundLoad[];
        putAway: InboundLoad[];
        picking: Order[];
        auditing: Order[];
        outbound: Order[];
    };
}

export const DashboardView = ({ isLoading, kpis, columns }: DashboardViewProps) => {
    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Header / Intro */}
            <div>
                <h1 className="text-2xl font-display font-bold text-text-primary">Dashboard</h1>
                <p className="text-text-secondary text-sm">Real-time overview of warehouse operations.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card noPadding className="p-5">
                    <DataMetric label="Total Orders" value={kpis.totalOrders} trend="up" />
                </Card>
                <Card noPadding className="p-5">
                    <DataMetric label="Total Units" value={kpis.totalUnits.toLocaleString()} trend="down" />
                </Card>
                <Card noPadding className="p-5">
                    <DataMetric label="Inbound Pallets" value={kpis.totalPallets} trend="neutral" />
                </Card>
                <Card noPadding className="p-5">
                    <DataMetric label="On-Time Rate" value={`${kpis.onTimePct}%`} trend="up" />
                </Card>
            </div>

            {/* Swimlanes / Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-[500px]">
                {/* 1. Receiving */}
                <DashColumn title="Receiving" count={columns.receiving.length}>
                    {columns.receiving.map((load) => (
                        <LoadCard key={load.id} load={load} />
                    ))}
                </DashColumn>

                {/* 2. Put Away */}
                <DashColumn title="Put Away" count={columns.putAway.length} highlight>
                    {columns.putAway.map((load) => (
                        <LoadCard key={load.id} load={load} type="process" />
                    ))}
                </DashColumn>

                {/* 3. Picking */}
                <DashColumn title="Picking" count={columns.picking.length}>
                    {columns.picking.map((order) => (
                        <OrderCard key={order.id} order={order} type="picking" />
                    ))}
                </DashColumn>

                {/* 4. Audit */}
                <DashColumn title="Audit" count={columns.auditing.length}>
                    {columns.auditing.map((order) => (
                        <OrderCard key={order.id} order={order} type="audit" />
                    ))}
                </DashColumn>

                {/* 5. Outbound */}
                <DashColumn title="Outbound" count={columns.outbound.length}>
                    {columns.outbound.map((order) => (
                        <OrderCard key={order.id} order={order} type="outbound" />
                    ))}
                </DashColumn>
            </div>
        </div>
    );
};
