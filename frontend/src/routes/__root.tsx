import { createRootRoute, Outlet, Link } from '@tanstack/react-router';
import { socket } from '../lib/socket';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { LayoutDashboard, Settings } from 'lucide-react';
import { Toaster } from 'sonner';

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    useEffect(() => {
        socket.connect();
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="min-h-screen bg-bg-page font-sans text-text-primary flex flex-col">
            <Toaster position="top-right" richColors />

            <header className="bg-white border-b border-border-subtle h-16 px-6 flex justify-end items-center sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-8">
                    {/* Navigation */}
                    <nav className="flex gap-1">
                        <NavLink to="/" icon={<LayoutDashboard className="w-4 h-4" />} label="Overview" />
                        <NavLink to="/admin" icon={<Settings className="w-4 h-4" />} label="Management" />
                    </nav>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
                <Outlet />
            </main>
        </div>
    );
}

function NavLink({ to, label, icon }: { to: string, label: string, icon?: ReactNode }) {
    return (
        <Link
            to={to}
            className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-md transition-all flex items-center gap-2 group"
            activeProps={{ className: '!bg-brand-primary/5 !text-brand-primary' }}
        >
            <span className="group-[.active]:text-brand-primary opacity-70 group-hover:opacity-100 transition-opacity">
                {icon}
            </span>
            {label}
        </Link>
    )
}
