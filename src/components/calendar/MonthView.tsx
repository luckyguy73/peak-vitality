"use client";
import { useState, useEffect } from 'react';
import { getMonthGrid } from '@/lib/calendar-utils';
import { format, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { DateSelector } from './DateSelector';
import { DayModal } from './DayModal';
import { supabase } from '@/lib/supabase'; // Our new connection

interface MonthViewProps {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
}

export const MonthView = ({ currentDate, setCurrentDate }: MonthViewProps) => {
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [notes, setNotes] = useState<Record<string, string>>({});

    const days = getMonthGrid(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // 1. Fetch Notes from Supabase on mount
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const { data, error } = await supabase
                    .from('notes')
                    .select('date, content');

                if (error) {
                    console.error('Error fetching notes:', error);
                } else if (data) {
                    // Transform array [{date, content}] into our Record object
                    const notesMap = data.reduce((acc: Record<string, string>, note: { date: string, content: string }) => {
                        acc[note.date] = note.content;
                        return acc;
                    }, {});
                    setNotes(notesMap);
                }
            } catch (err) {
                console.error('Unexpected error fetching notes:', err);
            }
        };

        fetchNotes();
    }, []);

    // 2. Save/Upsert Note to Supabase
    const saveNote = async (note: string) => {
        if (!selectedDay) return;
        const dateKey = format(selectedDay, 'yyyy-MM-dd');

        // Optimistic Update (UI updates immediately)
        const newNotes = { ...notes, [dateKey]: note };
        setNotes(newNotes);

        const { error } = await supabase
            .from('notes')
            .upsert({ date: dateKey, content: note }, { onConflict: 'date' });

        if (error) {
            console.error('Error saving note:', error);
            // Fallback: reload original notes if save fails
        }

        setSelectedDay(null);
    };

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
                    onSave={saveNote}
                />
            )}

            <div className="flex items-center justify-between px-8 py-6 bg-white/5 border-b border-white/5">
                <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-3 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white">
                    <ChevronLeft size={28} />
                </button>

                <div className="flex items-center gap-2">
                    <button onClick={() => setIsSelectorOpen(true)} className="px-6 py-2 hover:bg-white/5 rounded-2xl transition-all group border border-transparent hover:border-white/10">
                        <span className="text-2xl font-bold text-white tracking-tight group-hover:text-accent transition-colors">{format(currentDate, 'MMMM yyyy')}</span>
                    </button>
                    <button onClick={() => setCurrentDate(new Date())} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all group relative">
                        <CalendarDays size={20} />
                    </button>
                </div>

                <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-3 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white">
                    <ChevronRight size={28} />
                </button>
            </div>

            <div className="grid grid-cols-7 border-b border-white/5 bg-white/[0.02]">
                {weekDays.map((day) => (
                    <div key={day} className="py-3 text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {days.map((day) => {
                    const dateKey = format(day, 'yyyy-MM-dd');
                    const dayNote = notes[dateKey];
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    const isCurrentDay = isToday(day);

                    return (
                        <div
                            key={day.toString()}
                            onClick={() => setSelectedDay(day)}
                            className={`min-h-[120px] p-3 border-b border-r border-white/5 transition-all cursor-pointer hover:bg-white/[0.02] group ${!isCurrentMonth ? 'opacity-20' : 'opacity-100'}`}
                        >
                            <div className="flex justify-between items-start">
                <span className={`inline-flex items-center justify-center w-7 h-7 text-xs rounded-full transition-colors ${isCurrentDay ? 'bg-accent text-white font-bold shadow-lg shadow-accent/20' : 'text-slate-400 group-hover:text-slate-300'}`}>
                  {format(day, 'd')}
                </span>
                            </div>

                            {dayNote && (
                                <p className="mt-2 text-xs text-white line-clamp-3 leading-relaxed font-medium">
                                    {dayNote}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
