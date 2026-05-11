import { getMonthGrid } from '@/lib/calendar-utils';
import { format, isSameMonth, isToday } from 'date-fns';

interface MonthViewProps {
    currentDate: Date;
}

export const MonthView = ({ currentDate }: MonthViewProps) => {
    const days = getMonthGrid(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="w-full bg-black/20 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-white/5 bg-white/5">
                {weekDays.map((day) => (
                    <div key={day} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7">
                {days.map((day, idx) => {
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    const isCurrentDay = isToday(day);

                    return (
                        <div
                            key={day.toString()}
                            className={`
                min-h-[120px] p-2 border-b border-r border-white/5 transition-colors cursor-pointer
                hover:bg-white/[0.02] 
                ${!isCurrentMonth ? 'opacity-20' : 'opacity-100'}
              `}
                        >
              <span className={`
                inline-flex items-center justify-center w-7 h-7 text-sm rounded-full
                ${isCurrentDay ? 'bg-accent text-white font-bold' : 'text-slate-400'}
              `}>
                {format(day, 'd')}
              </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
