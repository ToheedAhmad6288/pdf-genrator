import React from "react";

interface PDFPreviewProps {
  fileName: string;
  totalPages: number;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ fileName, totalPages }) => {
  return (
    <div className="mt-6 text-center">
      <h2 className="text-lg font-semibold text-gray-800">{fileName}</h2>
      <p className="text-gray-500">Total Pages: {totalPages}</p>
    </div>
  );
};

export default PDFPreview;
