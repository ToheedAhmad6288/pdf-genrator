// src/FileUpload1.tsx
"use client";
import React, { useState } from "react";

interface FileUpload4Props {
  onFilesSelected: (files: File[]) => void;
}

const FileUpload4: React.FC<FileUpload4Props> = ({ onFilesSelected }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(newFiles);
      onFilesSelected(newFiles);
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const newFiles = [...files];
    const [movedFile] = newFiles.splice(draggedIndex, 1);
    newFiles.splice(index, 0, movedFile);

    setFiles(newFiles);
    onFilesSelected(newFiles);
    setDraggedIndex(null);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

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
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-700 via-pink-600 to-rose-500 bg-clip-text text-transparent drop-shadow-lg mb-2">Merge PDF Files</h1>
        <p className="text-lg text-gray-700 font-medium text-center max-w-2xl">Combine your PDF files with style. Drag, drop, and reorder files for a perfect result.</p>
      </div>

      {/* Main Content Layout */}
      <div className={`w-full max-w-5xl mx-auto transition-all duration-500 ease-in-out ${files.length > 0 ? 'grid lg:grid-cols-12 gap-8 items-start' : ''} scale-95`}>
        {/* Left Column: Input Section */}
        <div className={`transition-all duration-500 ease-in-out ${files.length > 0 ? 'lg:col-span-4 xl:col-span-3' : 'w-full'}`}>
          <div className={`relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-indigo-200 p-8 overflow-hidden group hover:shadow-indigo-300 hover:scale-[1.025] transition-all duration-300 ${files.length > 0 ? 'sticky top-24' : ''}`}
            style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.18)'}}>
            <div className="absolute -inset-1 rounded-3xl border-4 border-transparent group-hover:border-indigo-400 pointer-events-none transition-all duration-300 animate-glow"></div>
            {files.length > 0 && (
              <h2 className="text-xl font-extrabold text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-rose-500 bg-clip-text mb-4 flex items-center gap-2 drop-shadow-sm">
                <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-pink-500 rounded-full"></span>
                Add More PDFs
              </h2>
            )}
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer bg-white/80"
            />
            {files.length === 0 && (
              <div className="text-center mt-8 text-gray-400">
                <p className="text-base font-semibold tracking-wide">Supported format: <span className="text-indigo-500">PDF</span></p>
                <p className="text-xs mt-2 opacity-80">Drag & drop or click to upload</p>
              </div>
            )}
            {files.length > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl border border-blue-100 shadow-sm">
                <p className="text-xs text-blue-700 font-medium text-center">
                  Tip: Drag files in the preview to reorder them before merging.
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Right Column: Preview Section */}
        {files.length > 0 && (
          <div className="lg:col-span-8 xl:col-span-9 animate-fade-in-up">
            <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-pink-200 p-8 overflow-hidden group hover:shadow-pink-300 hover:scale-[1.015] transition-all duration-300" style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.18)'}}>
              <div className="absolute -inset-1 rounded-3xl border-4 border-transparent group-hover:border-pink-400 pointer-events-none transition-all duration-300 animate-glow"></div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-neutral-700">Selected Files</h3>
                  <button onClick={() => { setFiles([]); onFilesSelected([]); }} className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm">Clear All</button>
                </div>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(index)}
                      className="flex items-center justify-between p-3 border border-neutral-300 rounded-lg bg-neutral-50 hover:bg-neutral-100 cursor-grab transition"
                    >
                      <span className="truncate text-neutral-700">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="ml-3 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload4;
