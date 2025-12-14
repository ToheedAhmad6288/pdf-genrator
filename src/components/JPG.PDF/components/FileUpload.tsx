import React, { useRef, useState } from "react";
import { FiUploadCloud, FiCheck } from "react-icons/fi";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const validFiles = Array.from(files).filter(file =>
      ["image/jpeg", "image/png"].includes(file.type)
    );

    if (validFiles.length > 0) {
      setUploadedCount(prev => prev + validFiles.length);
      setTimeout(() => setUploadedCount(0), 2000);
    }

    onFilesSelected(validFiles);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full">
        <div
          onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={e => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => fileInputRef.current?.click()}
          className={`relative p-2 sm:p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-102 ${isDragging
              ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
              : uploadedCount > 0
                ? "border-green-400 bg-green-50"
                : "border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 hover:border-blue-400"
            } min-h-[120px] sm:min-h-[180px]`}
        >
          <div className="flex flex-col items-center justify-center">
            {uploadedCount > 0 ? (
              <>
                <FiCheck className="text-3xl text-green-500 mb-2 animate-bounce" />
                <p className="text-base font-semibold text-green-600">{uploadedCount} image{uploadedCount !== 1 ? 's' : ''} added!</p>
              </>
            ) : (
              <>
                <FiUploadCloud className={`text-4xl mb-2 transition-colors duration-300 ${isDragging ? "text-blue-500" : "text-gray-400"
                  }`} />
                <p className="text-base sm:text-lg font-semibold text-gray-700 mb-1">
                  Drop your images here
                </p>
                <p className="text-xs text-gray-500 mb-2">or click to select files</p>
                <p className="text-xs text-gray-400">Supported: JPG, PNG</p>
              </>
            )}
          </div>

          <input
            type="file"
            multiple
            accept="image/jpeg, image/png"
            ref={fileInputRef}
            className="hidden"
            onChange={e => handleFiles(e.target.files)}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
