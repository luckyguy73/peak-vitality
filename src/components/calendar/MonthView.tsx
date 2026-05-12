"use client";
import {useState} from 'react';
import {getMonthGrid} from '@/lib/calendar-utils';
import {format} from 'date-fns';
import {DateSelector} from './DateSelector';
import {DayModal} from './DayModal';
import {CalendarHeader} from './CalendarHeader';
import {CalendarCell} from './CalendarCell';
import {useNotes} from '@/hooks/useNotes';

interface MonthViewProps {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
}

export const MonthView = ({ currentDate, setCurrentDate }: MonthViewProps) => {
    const { notes, saveNote } = useNotes();
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    const days = getMonthGrid(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="w-full bg-black/20 border border-white/5 rounded-xl overflow-hidden shadow-2xl relative">
            {isSelectorOpen && (
                <DateSelector
                    currentDate={currentDate}
                    onSelect={(newDate) => { setCurrentDate(newDate); setIsSelectorOpen(false); }}
                    onClose={() => setIsSelectorOpen(false)}
                />
            )}

            {selectedDay && (
                <DayModal
                    date={selectedDay}
                    initialNote={notes[format(selectedDay, 'yyyy-MM-dd')] || ''}
                    onClose={() => setSelectedDay(null)}
                    onSave={(note) => saveNote(selectedDay, note).then(() => setSelectedDay(null))}
                />
            )}

            <CalendarHeader
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                onOpenSelector={() => setIsSelectorOpen(true)}
            />

            <div className="grid grid-cols-7 border-b border-white/5 bg-white/2">
                {weekDays.map((day) => (
                    <div key={day} className="py-3 text-center font-bold text-slate-500 uppercase tracking-widest">{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {days.map((day) => (
                    <CalendarCell
                        key={day.toString()}
                        day={day}
                        currentDate={currentDate}
                        note={notes[format(day, 'yyyy-MM-dd')]}
                        onClick={() => setSelectedDay(day)}
                    />
                ))}
            </div>
        </div>
    );
};
