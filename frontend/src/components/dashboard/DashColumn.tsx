import React from 'react';
import { EmptyState } from '../EmptyState.tsx';

interface DashColumnProps {
    title: string;
    count: number;
    children: React.ReactNode;
    highlight?: boolean;
}

export const DashColumn = ({ title, count, children, highlight }: DashColumnProps) => {
    const isEmpty = React.Children.count(children) === 0;

    return (
        <div className={`flex flex-col h-full rounded-xl transition-all ${highlight ? 'bg-bg-subtle/50 -m-2 p-2 border border-border-subtle/50' : 'bg-transparent'}`}>
            <div className="flex justify-between items-center mb-3 px-1">
                <h2 className="font-semibold text-text-secondary text-sm uppercase tracking-wide">{title}</h2>
                <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-text-primary shadow-sm border border-border-subtle">
                    {count}
                </span>
            </div>

            <div className="flex flex-col gap-3 min-h-0">
                {isEmpty ? (
                    <EmptyState
                        title="No Items"
                        description="Queue is empty"
                        compact
                        className="py-8 bg-transparent border-dashed border-2 border-border-subtle"
                    />
                ) : (
                    children
                )}
            </div>
        </div>
    );
};
