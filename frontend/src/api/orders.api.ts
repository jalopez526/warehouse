import { api } from '../lib/api';
import type { Order } from '../types';

export const fetchOrders = async (status?: string): Promise<Order[]> => {
    const { data } = await api.get<Order[]>('/orders', { 
        params: { status } 
    });
    return data;
};

export const updateOrderStatus = async (id: string, status: string): Promise<void> => {
    await api.patch(`/orders/${id}/status`, { status });
};
