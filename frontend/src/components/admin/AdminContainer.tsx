import { useAdminData } from '../../hooks/useAdminData';
import { AdminView } from './AdminView';

export const AdminContainer = () => {
    const { inbound, orders, isLoading, actions } = useAdminData();

    return (
        <AdminView
            isLoading={isLoading}
            inbound={inbound}
            orders={orders}
            actions={actions}
        />
    );
};
