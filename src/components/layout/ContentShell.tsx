"use client";
import { DashboardHome } from '@/components/dashboard/DashboardHome';
import { MonthView } from '@/components/calendar/MonthView';

interface ContentShellProps {
    activeTab: string;
    viewDate: Date;
    setViewDate: (date: Date) => void;
}

export const ContentShell = ({ activeTab, viewDate, setViewDate }: ContentShellProps) => {
    switch (activeTab) {
        case 'dashboard':
            return <DashboardHome />;

        case 'calendar':
            return (
                <MonthView
                    currentDate={viewDate}
                    setCurrentDate={setViewDate}
                />
            );

        case 'program':
            return (
                <div className="p-12 border-2 border-dashed border-white/5 rounded-3xl text-center">
                    <h2 className="text-xl text-slate-400 font-medium tracking-tight">12-Week Program Table</h2>
                    <p className="text-sm text-slate-600 mt-2 uppercase tracking-widest">Sprint 2 Goal</p>
                </div>
            );

        default:
            return <DashboardHome />;
    }
};
