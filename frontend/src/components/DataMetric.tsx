import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface DataMetricProps {
    label: string;
    value: string | number;
    trend?: 'up' | 'down' | 'neutral';
    className?: string;
}

export function DataMetric({ label, value, trend, className }: DataMetricProps) {
    return (
        <div className={cn("flex flex-col gap-1", className)}>
            <span className="text-sm font-medium text-text-secondary">
                {label}
            </span>

            <div className="flex items-center gap-2">
                <span className="text-2xl font-display font-bold text-text-primary tracking-tight">
                    {value}
                </span>
                {trend && (
                    <div className={cn(
                        "flex items-center text-xs font-medium px-1.5 py-0.5 rounded-full",
                        trend === 'up' ? 'text-status-success-text bg-status-success-bg' :
                            trend === 'down' ? 'text-status-warning-text bg-status-warning-bg' :
                                'text-text-secondary bg-bg-subtle'
                    )}>
                        {trend === 'up' && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
                        {trend === 'down' && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                        {trend === 'neutral' && <Minus className="w-3 h-3 mr-0.5" />}
                        {trend === 'up' ? '2.5%' : trend === 'down' ? '1.2%' : '0%'}
                    </div>
                )}
            </div>
        </div>
    );
}
