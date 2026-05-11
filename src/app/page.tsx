"use client";
import { useState } from 'react';
import { MonthView } from '@/components/calendar/MonthView';
import { formatMonth } from '@/lib/calendar-utils';

export default function Home() {
    const [viewDate, setViewDate] = useState(new Date());

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b border-white/10 py-6 px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Peak<span className="text-accent">Vitality</span>
                    </h1>
                    <h2 className="text-lg font-medium text-slate-300">
                        {formatMonth(viewDate)}
                    </h2>
                    <div className="flex gap-2">
                        {/* We'll add Navigation buttons here next */}
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full p-8">
                <MonthView currentDate={viewDate} />
            </main>
        </div>
    );
}
