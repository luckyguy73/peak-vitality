"use client";

import {addMonths, format, subMonths} from 'date-fns';
import {CalendarDays, ChevronLeft, ChevronRight} from 'lucide-react';

interface CalendarHeaderProps {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    onOpenSelector: () => void;
}

export const CalendarHeader = ({ currentDate, setCurrentDate, onOpenSelector }: CalendarHeaderProps) => {
    return (
        <div className="flex items-center justify-between px-8 bg-white/5 border-b border-white/5">
            <button
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-3 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white"
            >
                <ChevronLeft size={28} />
            </button>

            <div className="flex items-center gap-2">
                <button
                    onClick={onOpenSelector}
                    className="px-6 py-2 hover:bg-white/5 rounded-2xl transition-all group border border-transparent hover:border-white/10"
                >
          <span className="text-2xl font-bold text-white tracking-tight group-hover:text-accent transition-colors">
            {format(currentDate, 'MMMM yyyy')}
          </span>
                </button>
                <button
                    onClick={() => setCurrentDate(new Date())}
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all group relative"
                >
                    <CalendarDays size={20} />
                </button>
            </div>

            <button
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-3 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white"
            >
                <ChevronRight size={28} />
            </button>
        </div>
    );
};
