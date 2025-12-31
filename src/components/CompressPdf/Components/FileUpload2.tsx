"use client";

import React from "react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}


const FileUpload2: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-4 pb-4 px-2 sm:px-6 lg:px-8 overflow-x-hidden w-full animate-fadeIn">
      {/* Immersive, glassy background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-pink-200 to-rose-200 animate-gradientShift opacity-95" style={{backgroundSize:'200% 200%'}}></div>
        <div className="absolute left-1/4 top-1/4 w-1/2 h-1/2 bg-pink-400 opacity-40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute right-1/4 bottom-1/4 w-1/3 h-1/3 bg-indigo-400 opacity-30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute left-1/3 bottom-0 w-1/4 h-1/4 bg-rose-300 opacity-40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl" style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.18)'}}></div>
      </div>

      {/* Header Section */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center mb-4 mt-2 scale-90">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-700 via-pink-600 to-rose-500 bg-clip-text text-transparent drop-shadow-lg mb-2">Compress PDF</h1>
        <p className="text-lg text-gray-700 font-medium text-center max-w-2xl">Reduce your PDF file size with style. Drag, drop, and upload your PDF for instant compression.</p>
      </div>

      {/* Main Content Layout */}
      <div className="w-full max-w-2xl mx-auto scale-95">
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-indigo-200 p-8 overflow-hidden group hover:shadow-indigo-300 hover:scale-[1.025] transition-all duration-300" style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.18)'}}>
          <div className="absolute -inset-1 rounded-3xl border-4 border-transparent group-hover:border-indigo-400 pointer-events-none transition-all duration-300 animate-glow"></div>
          <label className="block mb-4 font-semibold text-neutral-700 text-lg">Choose PDF File:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files) {
                onFilesSelected(Array.from(e.target.files));
              }
            }}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer bg-white/80"
          />
          {/* Quality Selector */}
          <div className="mt-4">
            <label className="block mb-2 font-semibold text-neutral-700">Compression Quality:</label>
            <select
              className="w-full border border-neutral-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              defaultValue="high"
              // onChange handler can be lifted up if needed
            >
              <option value="high">High Quality (Less compression)</option>
              <option value="medium">Medium Quality (Balanced)</option>
              <option value="low">Low Quality (Maximum compression)</option>
            </select>
          </div>
          {/* Removed extra compression info from bottom */}
        </div>
      </div>
    </div>
  );
};

export default FileUpload2;
