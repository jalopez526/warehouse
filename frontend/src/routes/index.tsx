import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root.tsx';
import { DashboardContainer } from '../components/dashboard/DashboardContainer.tsx';

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: DashboardContainer,
});
