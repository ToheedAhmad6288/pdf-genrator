// src/components/PreviewPDF.tsx
import React, { useEffect, useRef } from "react";
import { PDFDocument } from "pdf-lib";

interface PreviewPDFProps {
  file: File | null;
  watermark?: {
    text: string;
    fontSize: number;
    color: string;
    opacity: number;
    position: "top-left" | "top-right" | "center" | "bottom-left" | "bottom-right";
  };
}

const PreviewPDF: React.FC<PreviewPDFProps> = ({ file, watermark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderPDF = async () => {
      if (!file) return;

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const page = pdfDoc.getPages()[0];

      // Create a temporary canvas
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;

      const { width, height } = page.getSize();
      canvas.width = width / 2; // scale down for preview
      canvas.height = height / 2;

      // Fill white background
      context.fillStyle = "#fff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Draw a placeholder rectangle (pdf-lib cannot render PDF pages to canvas directly)
      context.strokeStyle = "#999";
      context.strokeRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#000";
      context.font = "14px Arial";
      context.fillText("PDF Preview (first page)", 10, 20);

      // Draw watermark overlay
      if (watermark && watermark.text) {
        context.globalAlpha = watermark.opacity;
        context.fillStyle = watermark.color;
        context.font = `${watermark.fontSize}px Arial`;

        let x = 20, y = 40;
        switch (watermark.position) {
          case "top-left":
            x = 20;
            y = 40;
            break;
          case "top-right":
            x = canvas.width - 150;
            y = 40;
            break;
          case "center":
            x = canvas.width / 2 - 50;
            y = canvas.height / 2;
            break;
          case "bottom-left":
            x = 20;
            y = canvas.height - 40;
            break;
          case "bottom-right":
            x = canvas.width - 150;
            y = canvas.height - 40;
            break;
        }

        context.fillText(watermark.text, x, y);
        context.globalAlpha = 1;
      }
    };

    renderPDF();
  }, [file, watermark]);

  if (!file) return <p className="text-gray-500">No PDF uploaded yet.</p>;

  return (
    <div className="border border-gray-300 rounded p-2 mt-4">
      <canvas ref={canvasRef} className="w-full h-auto" />
    </div>
  );
};

export default PreviewPDF;
