"use client";
import { DashboardHome } from '@/components/dashboard/DashboardHome';
import { MonthView } from '@/components/calendar/MonthView';

interface ContentShellProps {
    activeTab: string;
    viewDate: Date;
}

export const ContentShell = ({ activeTab, viewDate }: ContentShellProps) => {
    switch (activeTab) {
        case 'dashboard':
            return <DashboardHome />;
        case 'calendar':
            return <MonthView currentDate={viewDate} />;
        case 'program':
            return (
                <div className="p-12 border-2 border-dashed border-white/5 rounded-3xl text-center">
                    <h2 className="text-xl text-slate-400">Program Table View coming next...</h2>
                </div>
            );
        default:
            return <DashboardHome />;
    }
};
