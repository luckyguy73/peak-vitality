"use client";

import {useState} from 'react';
import {Sidebar} from '@/components/layout/Sidebar';
import {Header} from '@/components/layout/Header';
import {ContentShell} from '@/components/layout/ContentShell';
import {useNotes} from '@/hooks/useNotes';

export default function Home() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [viewDate, setViewDate] = useState(new Date());
    const { notes, saveNote} = useNotes();
    const displayTitle = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

    return (
        <div className="flex h-screen bg-background overflow-hidden text-foreground">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    title={displayTitle}
                    subtitle="Precision Health"
                />

                <main className="flex-1 overflow-y-auto p-8 pt-0">
                    <div className="max-w-7xl mx-auto">
                        <ContentShell
                            activeTab={activeTab}
                            viewDate={viewDate}
                            setViewDate={setViewDate}
                            notes={notes}
                            saveNote={saveNote}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
