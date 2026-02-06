import { Truck, Package, RotateCw, CheckCircle2, MoreVertical, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Badge } from '../Badge.tsx';
import { Button } from '../Button.tsx';
import { EmptyState } from '../EmptyState.tsx';
import type { InboundLoad, Order, InboundStatus, OrderStatus } from '../../types';

interface AdminViewProps {
    isLoading: boolean;
    inbound: InboundLoad[];
    orders: Order[];
    actions: {
        updateLoad: (args: { id: string; status: InboundStatus }) => void;
        updateOrder: (args: { id: string; status: OrderStatus }) => void;
        isLoadPending: boolean;
        isOrderPending: boolean;
        nextLoadStatus: (current: InboundStatus) => InboundStatus | null;
        nextOrderStatus: (current: OrderStatus) => OrderStatus | null;
    };
}

export const AdminView = ({ isLoading, inbound, orders, actions }: AdminViewProps) => {

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
            </div>
        );
    }

    const LoadActions = ({ load }: { load: InboundLoad }) => {
        const next = actions.nextLoadStatus(load.status);

        return (
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => next && actions.updateLoad({ id: load.id, status: next })}
                    disabled={actions.isLoadPending || !next}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    {actions.isLoadPending ? <RotateCw className="w-3 h-3 animate-spin" /> : 'Advance'}
                </Button>

                <Menu as="div" className="relative">
                    <MenuButton className="p-1 rounded hover:bg-bg-subtle text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-soft-lg border border-border-subtle p-1 z-10 focus:outline-none">
                        <MenuItem>
                            <button
                                onClick={() => actions.updateLoad({ id: load.id, status: 'DELAYED' })}
                                className="w-full text-left px-2 py-1.5 text-xs text-status-warning-text hover:bg-status-warning-bg rounded flex items-center gap-2"
                            >
                                <AlertTriangle className="w-3 h-3" /> Mark Delayed
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button
                                onClick={() => actions.updateLoad({ id: load.id, status: 'CANCELLED' })}
                                className="w-full text-left px-2 py-1.5 text-xs text-status-error-text hover:bg-status-error-bg rounded flex items-center gap-2"
                            >
                                <XCircle className="w-3 h-3" /> Cancel Load
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button
                                onClick={() => actions.updateLoad({ id: load.id, status: 'PENDING' })}
                                className="w-full text-left px-2 py-1.5 text-xs text-text-secondary hover:bg-bg-subtle rounded flex items-center gap-2 border-t border-border-subtle mt-1 pt-2"
                            >
                                <RotateCw className="w-3 h-3" /> Reset
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        );
    };

    const OrderActions = ({ order }: { order: Order }) => {
        const next = actions.nextOrderStatus(order.status);

        return (
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => next && actions.updateOrder({ id: order.id, status: next })}
                    disabled={actions.isOrderPending || !next}
                    className="opacity-0 group-hover:opacity-100 transition-opacity shadow-none"
                >
                    {actions.isOrderPending ? <RotateCw className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                </Button>

                <Menu as="div" className="relative">
                    <MenuButton className="p-1 rounded hover:bg-bg-subtle text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-soft-lg border border-border-subtle p-1 z-10 focus:outline-none">
                        <MenuItem>
                            <button
                                onClick={() => actions.updateOrder({ id: order.id, status: 'CANCELLED' })}
                                className="w-full text-left px-2 py-1.5 text-xs text-status-error-text hover:bg-status-error-bg rounded flex items-center gap-2"
                            >
                                <XCircle className="w-3 h-3" /> Cancel Order
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button
                                onClick={() => actions.updateOrder({ id: order.id, status: 'PENDING' })}
                                className="w-full text-left px-2 py-1.5 text-xs text-text-secondary hover:bg-bg-subtle rounded flex items-center gap-2 border-t border-border-subtle mt-1 pt-2"
                            >
                                <RotateCw className="w-3 h-3" /> Reset
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-start">
            {/* Inbound Management */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <Truck className="w-5 h-5 text-text-secondary" />
                        Inbound Management
                    </h2>
                    <Badge variant="neutral">{inbound.length} Loads</Badge>
                </div>

                <div className="bg-bg-surface rounded-xl border border-border-subtle shadow-soft-sm overflow-hidden flex flex-col max-h-[calc(100vh-12rem)]">
                    {!inbound.length ? (
                        <EmptyState title="No Loads" description="No inbound loads found." className="border-none" />
                    ) : (
                        <div className="overflow-y-auto scrollbar-thin p-1">
                            {inbound.map((load: InboundLoad) => (
                                <div key={load.id} className="p-4 border-b border-border-subtle last:border-0 hover:bg-bg-subtle/50 transition-colors flex justify-between items-center group">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-text-primary">{load.carrier}</span>
                                            <Badge
                                                variant={
                                                    load.status === 'COMPLETED' ? 'success' :
                                                        load.status === 'DELAYED' ? 'warning' :
                                                            load.status === 'CANCELLED' ? 'alert' : 'outline'
                                                }
                                                className="text-[10px]"
                                            >
                                                {load.status}
                                            </Badge>
                                        </div>
                                        <span className="text-xs text-text-secondary font-mono">ID: {load.id}</span>
                                    </div>
                                    <LoadActions load={load} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Order Management */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <Package className="w-5 h-5 text-text-secondary" />
                        Order Management
                    </h2>
                    <Badge variant="neutral">{orders.length} Orders</Badge>
                </div>

                <div className="bg-bg-surface rounded-xl border border-border-subtle shadow-soft-sm overflow-hidden flex flex-col max-h-[calc(100vh-12rem)]">
                    {!orders.length ? (
                        <EmptyState title="No Orders" description="No orders found." className="border-none" />
                    ) : (
                        <div className="overflow-y-auto scrollbar-thin p-1">
                            {orders.map((order: Order) => (
                                <div key={order.id} className="p-4 border-b border-border-subtle last:border-0 hover:bg-bg-subtle/50 transition-colors flex justify-between items-center group">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-text-primary">Order #{order.id.slice(0, 4)}</span>
                                            <Badge
                                                variant={
                                                    order.status === 'FULFILLED' ? 'success' :
                                                        order.status === 'CANCELLED' ? 'alert' : 'outline'
                                                }
                                                className="text-[10px]"
                                            >
                                                {order.status}
                                            </Badge>
                                        </div>
                                        <span className="text-xs text-text-secondary">{order.units} Units • {order.assignedUser || 'Unassigned'}</span>
                                    </div>
                                    <OrderActions order={order} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
