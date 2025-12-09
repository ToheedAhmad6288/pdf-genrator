"use client";
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

import { Button } from "../../UI";

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
      const blob = new Blob([mergedPdfBytes as any], { type: "application/pdf" });

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
    <Button
      onClick={handleMerge}
      disabled={loading}
      loading={loading}
      variant="primary"
      className="bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-purple-200"
    >
      Merge PDFs
    </Button>
  );
};

export default MergeButton1;
