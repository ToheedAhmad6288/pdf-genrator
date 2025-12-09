"use client";

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

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
    <div className="mt-6 space-y-4">
      <div>
        <label className="block mb-2 font-semibold text-neutral-700">Compression Quality:</label>
        <select
          value={quality}
          onChange={(e) => setQuality(e.target.value as "high" | "medium" | "low")}
          className="w-full border border-neutral-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="high">High Quality (Less compression)</option>
          <option value="medium">Medium Quality (Balanced)</option>
          <option value="low">Low Quality (Maximum compression)</option>
        </select>
      </div>

      <button
        disabled={!file}
        onClick={handleCompress}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
          file
            ? "bg-primary-600 hover:bg-primary-700 cursor-pointer"
            : "bg-neutral-400 cursor-not-allowed"
        }`}
      >
        {file ? "Compress & Download PDF" : "Select a PDF file first"}
      </button>

      {file && (
        <div className="mt-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <p className="text-sm text-neutral-600">
            <span className="font-semibold">Original Size:</span> {(file.size / 1024).toFixed(2)} KB
          </p>
          {compressedSize && (
            <>
              <p className="text-sm text-neutral-600 mt-2">
                <span className="font-semibold">Compressed Size:</span> {(compressedSize / 1024).toFixed(2)} KB
              </p>
              <p className="text-sm text-green-600 mt-2">
                <span className="font-semibold">Saved:</span> {((1 - compressedSize / file.size) * 100).toFixed(1)}%
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CompressButton;
