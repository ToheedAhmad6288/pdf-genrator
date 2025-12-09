import React from "react";

interface PdfUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
}

const PdfUpload: React.FC<PdfUploadProps> = ({ label, onFileSelect }) => {
  return (
    <div className="flex flex-col items-center border-2 border-dashed border-gray-400 p-6 rounded-lg w-full bg-white shadow-sm">
      <p className="font-semibold mb-3 text-gray-700">{label}</p>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
        className="cursor-pointer"
      />
    </div>
  );
};

export default PdfUpload;
