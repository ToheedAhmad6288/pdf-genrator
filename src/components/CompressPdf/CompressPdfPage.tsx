import React, { useState } from "react";
import CompressButton from "./Components/CompressButton";
import FileUpload2 from "./Components/FileUpload2";

interface CompressPdfPageProps {
  onBack: () => void;
}

const CompressPdfPage: React.FC<CompressPdfPageProps> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
        >
          ← Back to Home
        </button>
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Compress PDF</h1>
        <p className="text-lg text-neutral-600">
          Upload your PDF file and compress it to reduce file size
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-neutral-200 p-8 shadow-lg">
        <FileUpload2 onFilesSelected={(files) => setFile(files[0])} />
        <CompressButton file={file} />
      </div>
    </div>
  );
};

export default CompressPdfPage;
