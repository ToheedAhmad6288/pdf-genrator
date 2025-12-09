// src/components/WaterMark.Pdf/components/DownloadButton.tsx
import React, { useState } from "react";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";
import { saveAs } from "file-saver";

interface WatermarkOptions {
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
}

interface DownloadButtonProps {
  file: File | null;
  watermark: WatermarkOptions;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ file, watermark }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!file) return alert("Please upload a PDF first.");
    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const colorParts = hexToRgb(watermark.color);

      for (const page of pages) {
        const { width, height } = page.getSize();
        let x = width / 2;
        let y = height / 2;
        let rotation = 0;

        // 🌊 Watermark placement logic
        switch (watermark.position) {
          case "top-left":
            x = 50;
            y = height - 50;
            break;
          case "top-right":
            x = width - 150;
            y = height - 50;
            break;
          case "center":
            x = width / 2 - 50;
            y = height / 2;
            break;
          case "bottom-left":
            x = 50;
            y = 50;
            break;
          case "bottom-right":
            x = width - 150;
            y = 50;
            break;
          case "diagonal":
            rotation = 180; // 🟢 Upside-down horizontal text
            x = width / 2 - 80;
            y = height / 2;
            break;
          case "anti-diagonal":
            rotation = 270; // 🟢 Vertical text down the center
            x = width / 2;
            y = height / 2 - 50;
            break;
        }

        const textWidth = font.widthOfTextAtSize(
          watermark.text,
          watermark.fontSize
        );

        const centeredX = x - textWidth / 2;

        page.drawText(watermark.text, {
          x: centeredX,
          y,
          size: watermark.fontSize,
          font,
          color: rgb(colorParts.r, colorParts.g, colorParts.b),
          opacity: watermark.opacity,
          rotate: degrees(rotation),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, "watermarked.pdf");
    } catch (error) {
      console.error("Error applying watermark:", error);
      alert("Failed to apply watermark. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const hexToRgb = (hex: string) => {
    const sanitizedHex = hex.replace("#", "");
    const r = parseInt(sanitizedHex.substring(0, 2), 16) / 255;
    const g = parseInt(sanitizedHex.substring(2, 4), 16) / 255;
    const b = parseInt(sanitizedHex.substring(4, 6), 16) / 255;
    return { r, g, b };
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!file || loading}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 transition-all"
    >
      {loading ? "Processing..." : "Download Watermarked PDF"}
    </button>
  );
};

export default DownloadButton;
