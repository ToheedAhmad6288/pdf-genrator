import React, { useRef, useState } from "react";
import { FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUpload2: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );
    if (files.length > 0) {
      onFilesSelected(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      onFilesSelected(files);
    }
  };

  return (
    <div
      className={`
        relative border-3 border-dashed rounded-[1.5rem] p-8 sm:p-12
        transition-all duration-300 ease-in-out cursor-pointer
        flex flex-col items-center justify-center text-center group
        ${isDragging
          ? "border-indigo-500 bg-indigo-50/50 scale-[1.02]"
          : "border-gray-300 hover:border-indigo-400 hover:bg-white/50"
        }
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
        accept="application/pdf"
      />

      <div className={`
        w-20 h-20 mb-6 rounded-2xl flex items-center justify-center
        transition-all duration-300 shadow-lg
        ${isDragging ? 'bg-indigo-600 text-white shadow-indigo-300 scale-110' : 'bg-white text-indigo-600 shadow-indigo-100 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white'}
      `}>
        <FaCloudUploadAlt className="text-4xl" />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
        {isDragging ? "Drop PDF Here" : "Upload PDF File"}
      </h3>

      <p className="text-gray-500 text-sm sm:text-base max-w-sm mx-auto mb-6">
        Drag & drop your PDF file here, or click to browse
      </p>

      <div className="flex items-center gap-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
        <span className="flex items-center gap-1.5 bg-white/60 px-2 py-1 rounded-md border border-gray-200">
          <FaFilePdf /> PDF Only
        </span>
        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
        <span>Max 50MB</span>
      </div>
    </div>
  );
};

export default FileUpload2;
