"use client";
import {useCallback, useEffect, useState} from 'react';
import {supabase} from '@/lib/supabase';
import {format} from 'date-fns';

export const useNotes = () => {
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotes = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true);
        const { data, error } = await supabase.from('notes').select('date, content');
        
        if (error) {
            console.error('Error fetching notes:', error);
            if (showLoading) setIsLoading(false);
            return;
        }

        const notesMap = (data || []).reduce((acc: Record<string, string>, note: { date: string; content: string }) => {
            acc[note.date] = note.content;
            return acc;
        }, {});
        setNotes(notesMap);
        if (showLoading) setIsLoading(false);
    }, []);

    const saveNote = async (date: Date, content: string) => {
        const dateKey = format(date, 'yyyy-MM-dd');

        // Optimistic Update
        setNotes(prev => ({ ...prev, [dateKey]: content }));

        const { error } = await supabase
            .from('notes')
            .upsert({ date: dateKey, content }, { onConflict: 'date' });
        
        if (error) {
            console.error('Error saving note:', error);
            await fetchNotes(false); // Rollback on error without triggering loading state
        }
    };

    useEffect(() => {
        let isMounted = true;

        const loadNotes = async () => {
            const { data, error } = await supabase.from('notes').select('date, content');

            if (!isMounted) return;

            if (error) {
                console.error('Error fetching notes:', error);
                setIsLoading(false);
                return;
            }

            const notesMap = (data || []).reduce((acc: Record<string, string>, note: { date: string; content: string }) => {
                acc[note.date] = note.content;
                return acc;
            }, {});

            setNotes(notesMap);
            setIsLoading(false);
        };

        void loadNotes();

        return () => {
            isMounted = false;
        };
    }, []);

    return { notes, saveNote, isLoading };
};
