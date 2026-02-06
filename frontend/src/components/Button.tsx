import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
    const variants = {
        primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-sm border border-transparent',
        secondary: 'bg-white text-text-primary border border-border-subtle hover:bg-bg-subtle shadow-sm',
        outline: 'bg-transparent text-text-secondary border border-border-med hover:border-text-secondary hover:text-text-primary',
        danger: 'bg-status-error-bg text-status-error-text hover:bg-red-100 border border-transparent',
        ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-subtle',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    };

    return (
        <button
            className={cn(
                'font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg active:scale-95 flex items-center justify-center gap-2',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
}
