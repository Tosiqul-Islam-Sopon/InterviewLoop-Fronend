'use client';

import { Users, Building2, Briefcase, MessageSquare, Tag, LogOut, LayoutDashboard } from 'lucide-react';
import { useLogout } from '@/hooks/useLogout';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export type TabType = 'users' | 'companies' | 'jobRoles' | 'interviewTypes' | 'tags';

interface SidebarProps {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    isOpen: boolean;
}

const navItems = [
    { id: 'users' as TabType, label: 'Users', icon: Users },
    { id: 'companies' as TabType, label: 'Companies', icon: Building2 },
    { id: 'jobRoles' as TabType, label: 'Job Roles', icon: Briefcase },
    { id: 'interviewTypes' as TabType, label: 'Interview Types', icon: MessageSquare },
    { id: 'tags' as TabType, label: 'Tags', icon: Tag },
];

export function Sidebar({ activeTab, setActiveTab, isOpen }: SidebarProps) {
    const { mutate: logout } = useLogout();

    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen shadow-lg md:shadow-none",
                !isOpen && "-translate-x-full"
            )}
        >
            <div className="flex flex-col h-full">
                {/* Logo / Header */}
                <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
                    <Link href="/admin" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
                        <LayoutDashboard className="w-6 h-6" />
                        <span>Admin Panel</span>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="px-3 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer actions */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <button
                        onClick={() => logout()}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
