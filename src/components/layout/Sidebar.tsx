"use client";
import {Calendar, LayoutDashboard, ListChecks, Settings} from "lucide-react";

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'calendar', icon: Calendar, label: 'Calendar' },
        { id: 'program', icon: ListChecks, label: 'Programs' },
    ];

    return (
        <aside className="w-20 flex flex-col items-center py-8 border-r border-white/10 bg-black/40">
            <div className="flex flex-col gap-8">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`p-3 rounded-xl transition-all group relative ${
                                activeTab === item.id
                                    ? 'bg-accent text-white'
                                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Icon size={24} />
                            {/* Tooltip for minimalist icons */}
                            <span className="absolute left-16 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity uppercase tracking-widest">
                {item.label}
              </span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-auto">
                <button className="text-slate-600 hover:text-white transition-colors">
                    <Settings size={24} />
                </button>
            </div>
        </aside>
    );
};
