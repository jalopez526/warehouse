import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root.tsx';
import { AdminContainer } from '../components/admin/AdminContainer.tsx';

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin',
    component: AdminContainer,
});
