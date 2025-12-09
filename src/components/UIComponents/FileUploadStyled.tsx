import React from "react";

const FileUploadStyled: React.FC<{ onFilesSelected: (files: File[]) => void }> = ({
  onFilesSelected,
}) => (
  <input
    type="file"
    accept="application/pdf,image/*"
    multiple
    onChange={(e) =>
      e.target.files && onFilesSelected(Array.from(e.target.files))
    }
    className="block w-full text-sm file:bg-gradient-to-r file:from-blue-600 file:to-blue-700 file:hover:from-blue-700 file:hover:to-blue-800 file:text-white file:px-6 file:py-3 file:rounded-lg file:border-0 file:cursor-pointer file:font-semibold file:transition-all file:shadow-md file:hover:shadow-lg file:transform file:hover:scale-105 cursor-pointer file:mr-4 border-2 border-dashed border-blue-300 rounded-lg p-4 hover:border-blue-500 transition-colors"
  />
);

export default FileUploadStyled;
