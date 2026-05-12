"use client";

import {useState} from 'react';
import {format, getYear, setMonth, setYear} from 'date-fns';
import {ChevronDown, ChevronUp, X} from 'lucide-react';

interface DateSelectorProps {
    currentDate: Date;
    onSelect: (date: Date) => void;
    onClose: () => void;
}

export const DateSelector = ({ currentDate, onSelect, onClose }: DateSelectorProps) => {
    const [selectedYear, setSelectedYear] = useState(getYear(currentDate));
    const months = Array.from({ length: 12 }, (_, i) => new Date(2000, i, 1));

    const changeYear = (delta: number) => setSelectedYear(prev => prev + delta);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-4 transition-all">
            <div className="bg-zinc-900/80 border border-white/10 w-full max-w-lg rounded-4xl p-8 shadow-2xl animate-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-bold text-white tracking-tight">Select Date</h3>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex gap-10">
                    <div className="flex-1 grid grid-cols-3 gap-3">
                        {months.map((m, i) => {
                            const isSelected = i === currentDate.getMonth() && selectedYear === getYear(currentDate);
                            return (
                                <button
                                    key={i}
                                    onClick={() => onSelect(setYear(setMonth(currentDate, i), selectedYear))}
                                    className={`py-4 rounded-2xl text-sm font-bold transition-all ${
                                        isSelected
                                            ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {format(m, 'MMM')}
                                </button>
                            );
                        })}
                    </div>

                    <div className="w-px bg-white/10 my-2" />

                    <div className="flex flex-col items-center justify-center gap-1 px-4">
                        <button
                            onClick={() => changeYear(1)}
                            className="p-2 text-slate-500 hover:text-accent transition-colors active:scale-90"
                        >
                            <ChevronUp size={36} />
                        </button>

                        <span className="text-4xl font-black text-white py-4 tabular-nums select-none">
              {selectedYear}
            </span>

                        <button
                            onClick={() => changeYear(-1)}
                            className="p-2 text-slate-500 hover:text-accent transition-colors active:scale-90"
                        >
                            <ChevronDown size={36} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
