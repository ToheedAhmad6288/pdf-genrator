import React from 'react';
import { FaFile } from 'react-icons/fa';

interface ExtractTextProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<ExtractTextProps> = ({ file, onFileChange }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-primary-400 rounded-lg p-8 text-center cursor-pointer transition-all hover:border-primary-600"
    >
      <FaFile className="mx-auto mb-3 text-4xl text-primary-500" />
      <p className="text-neutral-900 font-semibold mb-2">Drop PDF here or click to select</p>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
        id="pdf-upload"
      />
      <label htmlFor="pdf-upload" className="cursor-pointer text-primary-600 hover:text-primary-700">
        Choose File
      </label>
      {file && <p className="mt-3 text-success-600 font-medium">✓ {file.name}</p>}
    </div>
  );
};

export default FileUpload;
