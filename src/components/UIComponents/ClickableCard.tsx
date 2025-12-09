import React from "react";

const ClickableCard: React.FC<{
  title: string;
  icon?: React.ReactNode;
  onClick: () => void;
}> = ({ title, icon, onClick }) => {
  // Array of gradient backgrounds for variety
  const gradients = [
    'from-blue-500 to-blue-600',      // JPG → PDF
    'from-purple-500 to-purple-600',  // Merge PDFs
    'from-pink-500 to-pink-600',      // Compress
    'from-cyan-500 to-cyan-600',      // Split
    'from-green-500 to-green-600',    // Rotate
    'from-orange-500 to-orange-600',  // HTML → PDF
    'from-rose-500 to-rose-600',      // Watermark
    'from-indigo-500 to-indigo-600',  // Page Numbers
    'from-teal-500 to-teal-600',      // Compare
    'from-amber-500 to-amber-600',    // Extract Text
  ];

  // Use title length to cycle through gradients
  const gradientIndex = title.length % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${gradient} rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-3 sm:p-4 min-h-[190px] relative border border-white/20 group cursor-pointer hover:scale-105`}
    >
      {icon && (
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
          <div className="text-lg">{icon}</div>
        </div>
      )}
      <h2 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 ml-16 sm:ml-20 line-clamp-2">
        {title}
      </h2>
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-sm font-semibold text-center text-white/90">Click to open</p>
        <p className="text-xs text-white/70 mt-1 text-center">Upload files and download</p>
      </div>
    </div>
  );
};

export default ClickableCard;
