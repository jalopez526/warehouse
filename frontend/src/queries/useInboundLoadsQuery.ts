import { useQuery } from '@tanstack/react-query';
import { fetchInboundLoads } from '../api/inbound.api';
import type { InboundLoad } from '../types';

export const useInboundLoadsQuery = () => {
    return useQuery<InboundLoad[]>({
        queryKey: ['inbound-loads'],
        queryFn: () => fetchInboundLoads(),
    });
};
