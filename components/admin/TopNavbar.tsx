'use client';

import { Bell, Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

interface TopNavbarProps {
    toggleSidebar: () => void;
    title?: string;
}

export function TopNavbar({ toggleSidebar, title = 'Dashboard' }: TopNavbarProps) {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-40 w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 md:px-6">
            <div className="flex items-center justify-between h-full max-w-7xl mx-auto md:mx-0 md:max-w-none">

                {/* Left: Mobile Toggle & Title */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <h1 className="text-xl font-semibold text-gray-800 dark:text-white hidden sm:block">
                        {title}
                    </h1>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {/* Search (Optional placeholder) */}
                    <div className="hidden md:flex items-center relative">
                        <Search className="w-4 h-4 absolute left-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                        />
                    </div>

                    <Button variant="ghost" size="icon" className="relative text-gray-600 dark:text-gray-300">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse border-2 border-white dark:border-gray-900"></span>
                    </Button>

                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Admin User'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'Administrator'}</p>
                        </div>
                        <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-800">
                            {user?.name?.[0]?.toUpperCase() || <User className="w-5 h-5" />}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
