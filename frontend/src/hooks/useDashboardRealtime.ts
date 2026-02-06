import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socket } from '../lib/socket.ts';

export const useDashboardRealtime = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const handleInvalidate = () => {
            queryClient.invalidateQueries({ queryKey: ['inbound-loads'] });
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        };

        socket.on('load.created', handleInvalidate);
        socket.on('load.updated', handleInvalidate);
        socket.on('order.updated', handleInvalidate);

        return () => {
            socket.off('load.created', handleInvalidate);
            socket.off('load.updated', handleInvalidate);
            socket.off('order.updated', handleInvalidate);
        };
    }, [queryClient]);
};
