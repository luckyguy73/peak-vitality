"use client";

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
    return (
        <header className="border-b border-white/10 py-4 px-8 bg-background/50 backdrop-blur-md">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        Peak<span className="text-accent">Vitality</span>
                    </h1>
                    {subtitle && (
                        <p className="text-[10px] text-accent uppercase tracking-[0.2em] font-medium">
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-medium text-white">{title}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent/20 to-accent border border-white/10" />
                </div>
            </div>
        </header>
    );
};
