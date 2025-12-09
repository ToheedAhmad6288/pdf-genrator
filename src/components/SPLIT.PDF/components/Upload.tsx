"use client";
import React from "react";

interface Props {
  onFileSelect: (file: File) => void;
}

const SplitUpload: React.FC<Props> = ({ onFileSelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="mb-3">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default SplitUpload;
