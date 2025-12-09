"use client";
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

interface MergeButtonProps {
  files: File[];
}

const MergeButton1: React.FC<MergeButtonProps> = ({ files }) => {
  const [loading, setLoading] = useState(false);

  const handleMerge = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files to merge!");
      return;
    }

    setLoading(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();

      // FIXED BLOB CREATION
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Merge failed:", error);
      alert("Failed to merge PDFs.");
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleMerge}
      disabled={loading}
      className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Merging..." : "Merge PDFs"}
    </button>
  );
};

export default MergeButton1;
