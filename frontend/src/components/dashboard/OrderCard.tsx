import { ArrowRight } from 'lucide-react';
import { Card } from '../Card.tsx';
import { Badge } from '../Badge.tsx';
import type { Order } from '../../types';

interface OrderCardProps {
    order: Order & {
        isHighPriority?: boolean;
        progress?: number;
        auditPassed?: boolean;
        atRisk?: boolean;
        dock?: string;
        carrier?: string;
    };
    type?: 'default' | 'picking' | 'audit' | 'outbound';
}

export const OrderCard = ({ order, type = 'default' }: OrderCardProps) => {
    return (
        <Card className={`hover:shadow-md cursor-pointer group border-l-4 ${order.atRisk && type === 'outbound' ? 'border-l-status-error-text' : order.isHighPriority && type === 'picking' ? 'border-l-status-warning-text' : 'border-l-transparent hover:border-l-brand-secondary'}`} noPadding>
            <div className="p-4">
                {/* Header */}
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-text-muted">#{order.id.slice(-6)}</span>

                    {/* Picking: Priority Badge */}
                    {type === 'picking' && order.isHighPriority && (
                        <span className="text-[10px] font-bold text-status-warning-text bg-status-warning-bg px-1.5 py-0.5 rounded">HIGH PRIORITY</span>
                    )}

                    {/* Audit: Pass/Fail Status */}
                    {type === 'audit' && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${order.auditPassed ? 'text-status-success-text bg-status-success-bg' : 'text-status-error-text bg-status-error-bg'}`}>
                            {order.auditPassed ? 'PASSING' : 'FLAGGED'}
                        </span>
                    )}

                    {/* Outbound: Risk Status */}
                    {type === 'outbound' && order.atRisk && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-status-error-text bg-status-error-bg px-1.5 py-0.5 rounded">
                            Risk
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="font-semibold text-text-primary mb-1">
                    Order <span className="text-text-secondary font-normal">#{order.id.slice(0, 4)}</span>
                </div>

                <div className="flex justify-between items-center mt-3">
                    <Badge variant="neutral">{order.units} Units</Badge>
                    <div className="text-xs text-text-muted font-medium bg-bg-subtle px-2 py-1 rounded">
                        {order.assignedUser || 'Unassigned'}
                    </div>
                </div>

                {/* Footer / Contextual Info */}
                {type === 'picking' && (
                    <div className="mt-3">
                        <div className="flex justify-between text-[10px] text-text-muted mb-1">
                            <span>Picking Progress</span>
                            <span>{order.progress}%</span>
                        </div>
                        <div className="w-full bg-border-subtle h-1.5 rounded-full overflow-hidden">
                            <div className="bg-brand-primary h-full rounded-full" style={{ width: `${order.progress}%` }} />
                        </div>
                    </div>
                )}

                {type === 'outbound' && (
                    <div className="flex items-center gap-2 text-xs text-text-muted mt-2 pt-2 border-t border-border-subtle">
                        <span>Dock {order.dock || '--'}</span>
                        <ArrowRight className="w-3 h-3 text-border-med" />
                        <span className="font-medium text-text-primary">{order.carrier || '--'}</span>
                    </div>
                )}
            </div>
        </Card>
    );
};
