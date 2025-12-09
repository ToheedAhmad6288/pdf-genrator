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
    <div className="mb-6">
      <label className="block mb-2 font-semibold text-neutral-700">
        Upload PDF Files:
      </label>

      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleChange}
        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
      />

      <p className="text-sm text-neutral-500 mt-2">
        You can drag to reorder files.
      </p>

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-neutral-700">Selected Files:</h3>
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
      )}
    </div>
  );
};

export default FileUpload4;
