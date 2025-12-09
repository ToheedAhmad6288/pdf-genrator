import React from 'react';

interface ToolCardProps {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
    colorClass: string;
    description?: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, icon, onClick, colorClass, description }) => (
    <div
        onClick={onClick}
        className="group relative h-full min-h-[180px] p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/80 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
    >
        {/* Hover Gradient Overlay */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${colorClass}`} />

        <div className="relative z-10 flex flex-col items-center text-center gap-4">
            {/* Icon Container */}
            <div className={`
        w-16 h-16 flex items-center justify-center rounded-2xl text-3xl text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3
        ${colorClass}
      `}>
                {icon}
            </div>

            {/* Text Content */}
            <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-700 transition-colors">
                    {title}
                </h3>
                {description && (
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </div>
    </div>
);

export default ToolCard;
