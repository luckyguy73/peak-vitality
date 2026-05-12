"use client";
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ContentShell } from '@/components/layout/ContentShell';

export default function Home() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [viewDate, setViewDate] = useState(new Date());

    // Simple logic for the header title
    const displayTitle = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

    return (
        <div className="flex h-screen bg-background overflow-hidden text-foreground">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    title={displayTitle}
                    subtitle="Precision Health"
                />

                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <ContentShell
                            activeTab={activeTab}
                            viewDate={viewDate}
                            setViewDate={setViewDate}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
