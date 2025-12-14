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
    <div className="mt-6 space-y-4">
      {/*  */}
    </div>
  );
};

export default CompressButton;
