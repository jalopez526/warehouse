import { useDashboardData } from '../../hooks/useDashboardData';
import { useDashboardRealtime } from '../../hooks/useDashboardRealtime';
import { DashboardView } from './DashboardView.tsx';

export const DashboardContainer = () => {
    // 1. Initialize Real-time listeners
    useDashboardRealtime();

    // 2. Fetch & Prepare Data
    const { isLoading, kpis, columns } = useDashboardData();

    // 3. Render View
    return (
        <DashboardView
            isLoading={isLoading}
            kpis={kpis}
            columns={columns}
        />
    );
};
