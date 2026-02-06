import { format, formatDistanceToNow, isPast, isToday } from 'date-fns';
import { ArrowRight, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../Card.tsx';
import { Badge } from '../Badge.tsx';
import type { InboundLoad } from '../../types';

interface LoadCardProps {
    load: InboundLoad;
    type?: 'default' | 'process';
}

export const LoadCard = ({ load, type = 'default' }: LoadCardProps) => {
    // Smart ETA Logic
    const etaDate = new Date(load.eta);
    const hasArrived = ['DELIVERED', 'PROCESSING', 'COMPLETED'].includes(load.status);
    const isLate = !hasArrived && isPast(etaDate) && load.status !== 'CANCELLED';

    // Format the time string
    let timeDisplay = '--:--';
    if (load.eta) {
        if (isLate) {
            timeDisplay = `${formatDistanceToNow(etaDate)} ago`;
        } else if (isToday(etaDate)) {
            // If within 12 hours, show relative, else absolute
            if (Math.abs(etaDate.getTime() - Date.now()) < 12 * 60 * 60 * 1000) {
                timeDisplay = formatDistanceToNow(etaDate, { addSuffix: true });
            } else {
                timeDisplay = format(etaDate, 'HH:mm');
            }
        } else {
            timeDisplay = format(etaDate, 'EEE, HH:mm');
        }
    }

    return (
        <Card className={`hover:shadow-md cursor-pointer group border-l-4 transition-all ${isLate ? 'border-l-status-error-text' : 'border-l-transparent hover:border-l-brand-primary'}`} noPadding>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-text-muted">#{load.id.slice(-6)}</span>
                    <Badge variant={load.status === 'DELIVERED' ? 'success' : load.status === 'DELAYED' ? 'warning' : 'neutral'}>{load.status}</Badge>
                </div>
                <div className="font-semibold text-text-primary mb-1">{load.carrier}</div>
                <div className="text-sm text-text-secondary mb-3">{load.pallets} Pallets</div>

                {type === 'process' && (
                    <div className="w-full bg-border-subtle h-1.5 rounded-full overflow-hidden">
                        <div className="bg-brand-secondary h-full rounded-full" style={{ width: '60%' }} />
                    </div>
                )}
                {type === 'default' && (
                    <div className="flex items-center gap-2 text-xs mt-2 pt-2 border-t border-border-subtle">
                        <span className="text-text-muted">Dock {load.dock || '--'}</span>
                        <ArrowRight className="w-3 h-3 text-border-med" />

                        <div className={`flex items-center gap-1 font-medium ${isLate ? 'text-status-error-text' : 'text-text-secondary'}`}>
                            {isLate ? <AlertCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            <span>{timeDisplay}</span>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};
