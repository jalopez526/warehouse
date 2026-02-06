import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../api/orders.api';
import type { Order } from '../types';

export const useOrdersQuery = () => {
    return useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: () => fetchOrders(),
    });
};
