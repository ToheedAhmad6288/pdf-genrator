// src/components/FileUpload.tsx
import React, { useRef } from "react";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        alert("Please select a PDF file");
        return;
      }
      onFileSelected(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-6 rounded-md cursor-pointer hover:border-blue-500 transition"
         onClick={handleClick}>
      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="text-gray-600">Click or drag PDF file here to upload</p>
    </div>
  );
};

export default FileUpload;
