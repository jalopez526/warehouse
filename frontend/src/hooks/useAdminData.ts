import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateInboundLoadStatus } from '../api/inbound.api';
import { updateOrderStatus } from '../api/orders.api';
import { useInboundLoadsQuery } from '../queries/useInboundLoadsQuery';
import { useOrdersQuery } from '../queries/useOrdersQuery';
import type { InboundStatus, OrderStatus } from '../types';

export const useAdminData = () => {
    const queryClient = useQueryClient();

    // Queries
    const { data: inbound = [], isLoading: isLoadingInbound } = useInboundLoadsQuery();
    const { data: orders = [], isLoading: isLoadingOrders } = useOrdersQuery();

    // Mutations
    const updateLoadMutation = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: InboundStatus }) => {
            await updateInboundLoadStatus(id, status);
        },
        onSuccess: () => {
            toast.success("Load status updated");
            queryClient.invalidateQueries({ queryKey: ['inbound-loads'] });
        },
        onError: () => toast.error("Failed to update load status")
    });

    const updateOrderMutation = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
            await updateOrderStatus(id, status);
        },
        onSuccess: () => {
            toast.success("Order status updated");
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: () => toast.error("Failed to update order status")
    });

    // Helper Logic
    const nextLoadStatus = (current: InboundStatus): InboundStatus | null => {
        const sequence: InboundStatus[] = ['PENDING', 'SCHEDULED', 'DELIVERED', 'PROCESSING', 'COMPLETED'];
        if (['COMPLETED', 'CANCELLED', 'DELAYED'].includes(current)) return null;
        const idx = sequence.indexOf(current);
        return sequence[idx + 1] || null;
    };

    const nextOrderStatus = (current: OrderStatus): OrderStatus | null => {
        const sequence: OrderStatus[] = ['PENDING', 'PICKING', 'AUDITING', 'AUDITED', 'SHIPPING', 'FULFILLED'];
        if (['FULFILLED', 'CANCELLED'].includes(current)) return null;
        const idx = sequence.indexOf(current);
        return sequence[idx + 1] || null;
    };

    return {
        isLoading: isLoadingInbound || isLoadingOrders,
        inbound,
        orders,
        actions: {
            updateLoad: updateLoadMutation.mutate,
            updateOrder: updateOrderMutation.mutate,
            isLoadPending: updateLoadMutation.isPending,
            isOrderPending: updateOrderMutation.isPending,
            nextLoadStatus,
            nextOrderStatus
        }
    };
};
