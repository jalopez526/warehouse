import { api } from '../lib/api';
import type { InboundLoad } from '../types';

export const fetchInboundLoads = async (status?: string): Promise<InboundLoad[]> => {
    const { data } = await api.get<InboundLoad[]>('/inbound-loads', { 
        params: { status } 
    });
    return data;
};

export const updateInboundLoadStatus = async (id: string, status: string): Promise<void> => {
    await api.patch(`/inbound-loads/${id}/status`, { status });
};
