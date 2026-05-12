"use client";

import {useCallback, useEffect, useState} from 'react';
import {supabase} from '@/lib/supabase';
import {format} from 'date-fns';

export const useNotes = () => {
    const [notes, setNotes] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);

    // 1. We keep fetchNotes stable for manual calls (like rolling back an error)
    const fetchNotes = useCallback(async (showLoading = true) => {
        if (showLoading) setIsLoading(true);

        const { data, error } = await supabase.from('notes').select('date, content');

        if (error) {
            console.error('Error fetching notes:', error);
        } else if (data) {
            const notesMap = data.reduce(
                (acc: Record<string, string>, note: { date: string; content: string }) => {
                    acc[note.date] = note.content;
                    return acc;
                },
                {}
            );
            setNotes(notesMap);
        }

        if (showLoading) setIsLoading(false);
    }, []);

    // 2. We move the Initial Load into its own effect
    // We use an internal async function to satisfy the "no setState in effect body" rule
    useEffect(() => {
        let isMounted = true;

        const performInitialFetch = async () => {
            const { data, error } = await supabase.from('notes').select('date, content');

            if (!isMounted) return;

            if (error) {
                console.error('Initial fetch error:', error);
            } else if (data) {
                const notesMap = data.reduce(
                    (acc: Record<string, string>, note: { date: string; content: string }) => {
                        acc[note.date] = note.content;
                        return acc;
                    },
                    {}
                );
                setNotes(notesMap);
            }
            setIsLoading(false);
        };

        void performInitialFetch();

        return () => {
            isMounted = false;
        };
    }, []); // Empty array means this only runs once on "Mount"

    const saveNote = async (date: Date, content: string) => {
        const dateKey = format(date, 'yyyy-MM-dd');
        setNotes(prev => ({ ...prev, [dateKey]: content }));

        const { error } = await supabase
            .from('notes')
            .upsert({ date: dateKey, content }, { onConflict: 'date' });

        if (error) {
            console.error('Error saving note:', error);
            await fetchNotes(false);
        }
    };

    return { notes, saveNote, isLoading };
};
