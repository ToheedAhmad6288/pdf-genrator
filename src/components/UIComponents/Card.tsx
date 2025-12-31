import React from "react";

const Card: React.FC<{
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ title, children, icon }) => (
  <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 md:p-10 min-h-[420px] relative border border-gradient-to-r border-gray-100 group overflow-hidden">
    {/* Animated background gradient effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

    {/* Content wrapper */}
    <div className="relative z-10">
      {icon && (
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 transform">
          <div className="text-2xl">{icon}</div>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 sm:mb-8 ml-20 sm:ml-24 line-clamp-2">{title}</h2>
      <div className="flex flex-col gap-4 space-y-3 text-gray-800">{children}</div>
    </div>
  </div>
);

export default Card;
