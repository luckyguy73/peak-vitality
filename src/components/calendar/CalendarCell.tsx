"use client";
import { format, isSameMonth, isToday } from 'date-fns';

interface CalendarCellProps {
    day: Date;
    currentDate: Date;
    note?: string;
    onClick: () => void;
}

export const CalendarCell = ({ day, currentDate, note, onClick }: CalendarCellProps) => {
    const isCurrentMonth = isSameMonth(day, currentDate);
    const isCurrentDay = isToday(day);

    return (
        <div
            onClick={onClick}
            className={`
        min-h-30 p-3 border-b border-r border-white/5 transition-all cursor-pointer 
        hover:bg-white/2 group 
        ${!isCurrentMonth ? 'opacity-20' : 'opacity-100'}
      `}
        >
            <div className="flex justify-between items-start">
        <span className={`
          inline-flex items-center justify-center w-7 h-7 text-sm rounded-full transition-colors 
          ${isCurrentDay ? 'bg-accent text-white font-bold shadow-lg shadow-accent/20' : 'text-slate-400 group-hover:text-slate-300'}
        `}>
          {format(day, 'd')}
        </span>
            </div>

            {note && (
                <p className="mt-2 text-white line-clamp-3 leading-relaxed font-medium">
                    {note}
                </p>
            )}
        </div>
    );
};
