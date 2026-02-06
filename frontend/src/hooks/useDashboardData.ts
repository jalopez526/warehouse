import { useInboundLoadsQuery } from '../queries/useInboundLoadsQuery';
import { useOrdersQuery } from '../queries/useOrdersQuery';
import type { InboundLoad, Order } from '../types';

export const useDashboardData = () => {
    const { data: inboundAll, isLoading: isLoadingInbound } = useInboundLoadsQuery();
    const { data: ordersAll, isLoading: isLoadingOrders } = useOrdersQuery();

    const inbound = inboundAll || [];
    const orders = ordersAll || [];

    // --- KPI Calculations ---
    const totalOrders = orders.length;
    const totalUnits = orders.reduce((acc: number, o: Order) => acc + (o.units), 0);
    const totalPallets = inbound.reduce((acc: number, l: InboundLoad) => acc + (l.pallets), 0);
    const onTimePct = totalOrders > 0 ? 98.5 : 0;

    // --- Column Data Filters ---
    const receiving = inbound.filter((l: InboundLoad) => ['SCHEDULED', 'DELIVERED'].includes(l.status));
    const putAway = inbound.filter((l: InboundLoad) => l.status === 'PROCESSING');
    
    // --- Business Logic / Heuristics ---
    const enrichOrder = (order: Order) => {
        // Deterministic "Randomness" based on ID to simulate persistent backend properties
        const idHash = parseInt(order.id.slice(-4), 16) || 0;

        // 1. DOCK & CARRIER ASSIGNMENT
        // In a real app, these would be relational fields on the Order model.
        // Signal: Physical location and responsible partner.
        const mockDock = (idHash % 15) + 1;
        const mockCarrier = ['FedEx', 'UPS', 'DHL', 'USPS', 'Ontrac'][idHash % 5];
        
        // 2. PRIORITY SCORING
        // Signal: "High Value" or "Bulk" orders need faster processing.
        // Heuristic: Orders with > 50 units OR many line items are critical.
        const isHighVolume = order.units > 50;
        const isComplex = (order.lineItems || 0) > 5;
        const isHighPriority = isHighVolume || isComplex;

        // 3. PROGRESS TRACKING
        // Signal: How far along is the picking process?
        // Heuristic: Deterministic % based on ID, but weighted by status duration (simulated).
        const baseProgress = (idHash % 100); 
        const progress = Math.min(100, Math.max(5, baseProgress));

        // 4. AUDIT RISK
        // Signal: Random sampling for Quality Control.
        // Heuristic: Flag 10% of orders for audit.
        // In real app: "First time customer" or "High value item" would trigger this.
        const auditPassed = (idHash % 10) !== 0; // 10% fail rate simulation

        // 5. SLA / RISK STATUS
        // Signal: Is the order stalled?
        // Heuristic: If "mock time since update" > 4 hours.
        // We simulate a "hours pending" based on the ID hash for demo purposes.
        const hoursPending = idHash % 12; 
        const atRisk = hoursPending > 8; // Flag if "waiting" more than 8 hours

        return {
            ...order,
            dock: `Dock ${mockDock}`,
            carrier: mockCarrier,
            isHighPriority,
            progress,
            auditPassed,
            atRisk
        };
    };

    const picking = orders
        .filter((o: Order) => o.status === 'PICKING')
        .map(o => enrichOrder(o));

    const auditing = orders
        .filter((o: Order) => o.status === 'AUDITING')
        .map(o => enrichOrder(o));

    const outbound = orders
        .filter((o: Order) => o.status === 'SHIPPING')
        .map(o => enrichOrder(o));

    return {
        isLoading: isLoadingInbound || isLoadingOrders,
        kpis: {
            totalOrders,
            totalUnits,
            totalPallets,
            onTimePct
        },
        columns: {
            receiving,
            putAway,
            picking,
            auditing,
            outbound
        }
    };
};
