"use client";
import { X } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";

interface DayModalProps {
    date: Date;
    onClose: () => void;
    initialNote: string;
    onSave: (note: string) => void;
}

export const DayModal = ({ date, onClose, initialNote, onSave }: DayModalProps) => {
    const [note, setNote] = useState(initialNote);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
            <div className="bg-zinc-900 border border-white/10 w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                            {format(date, 'EEEE')}
                        </h3>
                        <p className="text-xs text-accent uppercase tracking-widest font-semibold">
                            {format(date, 'MMM d, yyyy')}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <textarea
                    autoFocus
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-accent transition-all resize-none"
                    placeholder="What did you do for your health today?"
                />

                <button
                    onClick={() => onSave(note)}
                    className="w-full mt-6 py-4 bg-accent text-white font-bold rounded-2xl hover:bg-blue-600 transition-all active:scale-[0.98] shadow-lg shadow-accent/20"
                >
                    Save Daily Note
                </button>
            </div>
        </div>
    );
};
