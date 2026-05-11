"use client";
import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ContentShell } from '@/components/layout/ContentShell';

export default function Home() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [viewDate] = useState(new Date());

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header
                    title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    subtitle="Precision Health"
                />

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-7xl mx-auto">
                        <ContentShell activeTab={activeTab} viewDate={viewDate} />
                    </div>
                </main>
            </div>
        </div>
    );
}
