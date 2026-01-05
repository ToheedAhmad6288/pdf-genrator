// src/components/PreviewPDF.tsx
import React, { useEffect, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";

interface PreviewPDFProps {
  file: File | null;
  watermark?: {
    text: string;
    fontSize: number;
    color: string;
    opacity: number;
    position:
      | "top-left"
      | "top-right"
      | "center"
      | "bottom-left"
      | "bottom-right"
      | "diagonal"
      | "anti-diagonal";
  };
}

const PreviewPDF: React.FC<PreviewPDFProps> = ({ file, watermark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const renderPDF = async () => {
      if (!file) return;
      setLoading(true);

      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const page = pdfDoc.getPages()[0];

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        const { width, height } = page.getSize();

        // CSS pixel width available for the canvas
        const cssWidth = Math.max(200, container.clientWidth - 0);
        const scale = Math.min(cssWidth / width, 1);

        // device pixel ratio for crisp rendering
        const dpr = window.devicePixelRatio || 1;

        // set canvas size in device pixels, and style size in CSS pixels
        canvas.style.width = `${Math.floor(width * scale)}px`;
        canvas.style.height = `${Math.floor(height * scale)}px`;
        canvas.width = Math.floor(width * scale * dpr);
        canvas.height = Math.floor(height * scale * dpr);

        // scale drawing operations to account for DPR
        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Clear and draw placeholder in CSS pixels
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#fff";
        context.fillRect(0, 0, width * scale, height * scale);
        context.strokeStyle = "#d1d5db";
        context.lineWidth = 2;
        context.strokeRect(0, 0, width * scale, height * scale);
        context.fillStyle = "#374151";
        context.font = `${14 * Math.max(scale, 0.6)}px Arial`;
        context.fillText("PDF Preview (first page)", 12, 20);

        // Draw watermark overlay in CSS pixels
        if (watermark && watermark.text) {
          context.save();
          context.globalAlpha = watermark.opacity;
          context.fillStyle = watermark.color;
          const fontSize = Math.max(8, watermark.fontSize * scale);
          context.font = `${fontSize}px Arial`;

          const measure = context.measureText(watermark.text).width;
          const cw = width * scale;
          const ch = height * scale;

          if (watermark.position === "diagonal" || watermark.position === "anti-diagonal") {
            const cx = cw / 2;
            const cy = ch / 2;
            const angle = watermark.position === "diagonal" ? -45 : 45;
            context.translate(cx, cy);
            context.rotate((angle * Math.PI) / 180);
            context.fillText(watermark.text, -measure / 2, 0);
            context.restore();
          } else {
            let x = 20;
            let y = 40;
            switch (watermark.position) {
              case "top-left":
                x = 20;
                y = 40;
                break;
              case "top-right":
                x = cw - 20 - measure;
                y = 40;
                break;
              case "center":
                x = cw / 2 - measure / 2;
                y = ch / 2;
                break;
              case "bottom-left":
                x = 20;
                y = ch - 20;
                break;
              case "bottom-right":
                x = cw - 20 - measure;
                y = ch - 20;
                break;
            }
            context.fillText(watermark.text, x, y);
            context.globalAlpha = 1;
            context.restore();
          }
        }
      } catch (err) {
        console.error("Preview render error:", err);
      } finally {
        setLoading(false);
      }
    };

    renderPDF();

    // Use ResizeObserver for responsive updates
    const ro = new ResizeObserver(() => {
      renderPDF();
    });
    if (containerRef.current) ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, [file, watermark]);

  if (!file) return <p className="text-gray-500">No PDF uploaded yet.</p>;

  return (
    <div ref={containerRef} className="border border-gray-300 rounded p-4 mt-4 bg-white">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-neutral-800">{file.name}</div>
        <div className="text-xs text-neutral-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
      </div>
      <div className="overflow-auto">
        <canvas ref={canvasRef} className="w-full h-auto block mx-auto" />
      </div>
      {loading && <div className="text-sm text-neutral-500 mt-2">Rendering preview...</div>}
    </div>
  );
};

export default PreviewPDF;
