"use client";

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Button } from "../../UI";

interface CompressButtonProps {
  file: File | null;
}

const CompressButton: React.FC<CompressButtonProps> = ({ file }) => {
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [quality, setQuality] = useState<"high" | "medium" | "low">("high");

  const handleCompress = async () => {
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const newPdfDoc = await PDFDocument.create();
    const copiedPages = await newPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach((page) => newPdfDoc.addPage(page));

    // Approximate quality control by object streams usage
    const useObjectStreams = quality === "high"; // High quality keeps object streams
    const compressedPdfBytes = await newPdfDoc.save({
      useObjectStreams,
    });

    setCompressedSize(compressedPdfBytes.byteLength);

    const blob = new Blob([new Uint8Array(compressedPdfBytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `compressed_${file.name}`;
    link.click();
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-gray-700">Compression Quality</label>
        <div className="grid grid-cols-3 gap-3">
          {(["high", "medium", "low"] as const).map((q) => (
            <button
              key={q}
              onClick={() => setQuality(q)}
              className={`py-2 px-4 rounded-xl text-sm font-semibold capitalize transition-all duration-300 ${quality === q
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-200 scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleCompress}
        disabled={!file}
        fullWidth
        variant="primary"
        className="bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700"
      >
        Compress PDF
      </Button>

      {compressedSize && (
        <div className="p-4 bg-success-50 rounded-xl border border-success-100 animate-fadeIn">
          <p className="text-success-700 text-sm font-medium flex items-center gap-2">
            <span>✓</span> Compressed successfully!
            New size: {(compressedSize / 1024).toFixed(2)} KB
          </p>
        </div>
      )}
    </div>
  );
};

export default CompressButton;
