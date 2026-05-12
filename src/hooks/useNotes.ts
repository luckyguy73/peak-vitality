"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

export const useNotes = () => {
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotes = async () => {
        try {
            const { data, error } = await supabase.from('notes').select('date, content');
            if (error) throw error;

            const notesMap = data.reduce((acc: Record<string, string>, note: any) => {
                acc[note.date] = note.content;
                return acc;
            }, {});
            setNotes(notesMap);
        } catch (err) {
            console.error('Error fetching notes:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const saveNote = async (date: Date, content: string) => {
        const dateKey = format(date, 'yyyy-MM-dd');

        // Optimistic Update
        setNotes(prev => ({ ...prev, [dateKey]: content }));

        try {
            const { error } = await supabase
                .from('notes')
                .upsert({ date: dateKey, content }, { onConflict: 'date' });
            if (error) throw error;
        } catch (err) {
            console.error('Error saving note:', err);
            fetchNotes(); // Rollback on error
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return { notes, saveNote, isLoading };
};
