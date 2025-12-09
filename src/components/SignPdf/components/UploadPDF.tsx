import React, { ChangeEvent } from "react";

interface UploadPDFProps {
  setPdfBuffer: (buffer: ArrayBuffer) => void;
}

const UploadPDF: React.FC<UploadPDFProps> = ({ setPdfBuffer }) => {
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file");
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    setPdfBuffer(arrayBuffer);
  };

  return (
    <div className="upload-container">
      <label className="upload-box">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
        />
        <span>Click to Upload PDF</span>
      </label>
    </div>
  );
};

export default UploadPDF;
