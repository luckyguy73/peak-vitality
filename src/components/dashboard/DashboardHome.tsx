"use client";

import {Zap} from "lucide-react";

export const DashboardHome = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-2xl shadow-accent/5">
                <Zap size={40} className="text-accent animate-pulse" />
            </div>
            <h2 className="text-2xl font-semibold text-white tracking-tight">Focus on the Win</h2>
            <p className="text-slate-500 mt-2 max-w-sm">
                Your inspirational dashboard will live here. Ready to track your evolution?
            </p>
        </div>
    );
};
