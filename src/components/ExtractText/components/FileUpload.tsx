import React from 'react';
import { FaFile } from 'react-icons/fa';

interface ExtractTextProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<ExtractTextProps> = ({ file, onFileChange }) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf') {
      onFileChange(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile?.type === 'application/pdf') {
      onFileChange(selectedFile);
    }
  };

  return (
    <div className="relative group">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-[1.5rem] p-12 text-center cursor-pointer transition-all duration-500 overflow-hidden
          ${isDragging
            ? 'border-indigo-500 bg-indigo-50/50 scale-[1.02] shadow-2xl shadow-indigo-200/50'
            : 'border-neutral-200 bg-white/50 hover:border-indigo-400 hover:bg-white hover:shadow-xl hover:shadow-neutral-200/50'
          }
        `}
      >
        {/* Animated Background Pulse */}
        {isDragging && (
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-full w-full bg-gradient-to-b from-primary-500/10 to-transparent animate-pulse"></div>
          </div>
        )}

        <div className={`
          mx-auto mb-6 w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-700
          ${isDragging
            ? 'bg-indigo-600 text-black rotate-[15deg] scale-110 shadow-2xl shadow-indigo-500/40'
            : 'bg-indigo-50 text-indigo-600 group-hover:rotate-6'
          }
        `}>
          <FaFile className="text-4xl" />
        </div>

        <div className="relative z-10">
          <h4 className="text-neutral-900 font-bold text-2xl mb-2 tracking-tight">
            {isDragging ? 'Release to Upload' : 'Drop your PDF here'}
          </h4>
          <p className="text-neutral-500 font-medium mb-10">
            {isDragging ? 'Processing ready...' : 'Max file size up to 10MB'}
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white font-bold shadow-xl shadow-indigo-200/30 hover:shadow-indigo-300 hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all cursor-pointer"
          >
            Select File
          </label>
        </div>

        {/* Decorative Particles (Simulated) */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {file && (
        <div className="mt-8 animate-fade-in-up">
            <div className="bg-success-50/50 backdrop-blur-sm p-4 rounded-2xl border border-success-100 flex items-center gap-4 group/file transition-all hover:bg-success-50">
            <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200/20">
              <FaFile />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-success-900 font-bold truncate">{file.name}</p>
              <p className="text-success-600/70 text-xs font-bold uppercase tracking-widest">
                {(file.size / 1024 / 1024).toFixed(2)} MB • Ready
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-success-200/50 flex items-center justify-center text-success-600 opacity-0 group-hover/file:opacity-100 transition-opacity">
              <span className="text-sm font-bold italic">✓</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
