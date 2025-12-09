import React from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileSelect(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-18 border-2 border-dashed rounded-xl w-1/2 mx-auto">
      <p className="mb-2 text-gray-700 font-medium">Upload your PDF</p>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
