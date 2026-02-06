import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ReactNode } from 'react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    description?: string;
    rightElement?: ReactNode;
    noPadding?: boolean;
}

export function Card({ children, className, title, description, rightElement, noPadding }: CardProps) {
    return (
        <div className={cn(
            'bg-bg-surface border border-border-subtle rounded-xl shadow-soft-sm hover:shadow-soft-md transition-shadow duration-300',
            className
        )}>
            {(title || rightElement) && (
                <div className="px-5 py-4 flex justify-between items-start border-b border-border-subtle">
                    <div>
                        {title && (
                            <h3 className="font-display font-bold text-text-primary text-base">
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p className="text-sm text-text-secondary mt-0.5">
                                {description}
                            </p>
                        )}
                    </div>
                    {rightElement && <div>{rightElement}</div>}
                </div>
            )}
            <div className={noPadding ? '' : 'p-5'}>{children}</div>
        </div>
    );
}
