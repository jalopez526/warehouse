import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ReactNode } from 'react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Variant = 'default' | 'outline' | 'alert' | 'success' | 'processing' | 'neutral' | 'info' | 'warning';

interface BadgeProps {
    children: ReactNode;
    variant?: Variant;
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: 'bg-gray-100 text-gray-700 border-gray-200',
        outline: 'bg-transparent border-gray-200 text-gray-600',
        neutral: 'bg-gray-50 text-gray-500 border-gray-100',
        alert: 'bg-status-error-bg text-status-error-text border-status-error-bg',
        success: 'bg-status-success-bg text-status-success-text border-status-success-bg',
        processing: 'bg-status-info-bg text-status-info-text border-status-info-bg',
        info: 'bg-status-info-bg text-status-info-text border-status-info-bg',
        warning: 'bg-status-warning-bg text-status-warning-text border-status-warning-bg',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center justify-center border px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
