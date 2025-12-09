"use client";

import React from "react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUpload2: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-neutral-700">Choose PDF File:</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          if (e.target.files) {
            onFilesSelected(Array.from(e.target.files));
          }
        }}
        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
      />
      <p className="text-sm text-neutral-500 mt-2">Supported format: PDF</p>
    </div>
  );
};

export default FileUpload2;
