import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Box, Search, PlusCircle, AlertCircle } from 'lucide-react';
import { Button } from './Button';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: 'box' | 'search' | 'plus' | 'alert';
    action?: {
        label: string;
        onClick: () => void;
    };
    compact?: boolean;
    className?: string;
}

export function EmptyState({ title, description, icon = 'box', action, compact, className }: EmptyStateProps) {
    const icons = {
        box: Box,
        search: Search,
        plus: PlusCircle,
        alert: AlertCircle,
    };

    const Icon = icons[icon];

    return (
        <div className={cn(
            "flex flex-col items-center justify-center text-center p-8 rounded-xl border border-dashed border-border-med bg-bg-subtle/30",
            compact && "p-4",
            className
        )}>
            <div className={cn(
                "flex items-center justify-center rounded-full bg-bg-surface border border-border-subtle shadow-sm mb-3 text-text-secondary",
                compact ? "w-8 h-8" : "w-12 h-12"
            )}>
                <Icon className={compact ? "w-4 h-4" : "w-6 h-6"} />
            </div>

            <h3 className={cn("font-semibold text-text-primary", compact ? "text-sm" : "text-base")}>
                {title}
            </h3>

            {description && (
                <p className={cn("text-text-secondary mt-1 max-w-xs mx-auto", compact ? "text-xs" : "text-sm")}>
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-4">
                    <Button size="sm" onClick={action.onClick}>
                        {action.label}
                    </Button>
                </div>
            )}
        </div>
    );
}
