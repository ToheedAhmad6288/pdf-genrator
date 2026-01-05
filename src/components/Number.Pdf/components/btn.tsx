import React from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

interface AddPageNumbersProps {
  pdfFile: File | null;
  position: string;
  fontSize: number;
  startPage: number;
  endPage: number;
}

const AddPageNumbersButton: React.FC<AddPageNumbersProps> = ({
  pdfFile,
  position,
  fontSize,
  startPage,
  endPage,
}) => {
  const handleAddPageNumbers = async () => {
    if (!pdfFile) return;

    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const totalPages = pages.length;
    const start = Math.max(startPage, 1);
    const end = Math.min(endPage, totalPages);

    for (let i = start - 1; i < end; i++) {
      const page = pages[i];
      const { width, height } = page.getSize();
      let x = 0,
        y = 0;

      switch (position) {
        case "top-left":
          x = 10;
          y = height - fontSize - 10;
          break;
        case "top-right":
          x = width - font.widthOfTextAtSize(`${i + 1}`, fontSize) - 10;
          y = height - fontSize - 10;
          break;
        case "bottom-left":
          x = 10;
          y = 10;
          break;
        case "bottom-right":
          x = width - font.widthOfTextAtSize(`${i + 1}`, fontSize) - 10;
          y = 10;
          break;
        case "center":
          x = width / 2 - font.widthOfTextAtSize(`${i + 1}`, fontSize) / 2;
          y = height / 2 - fontSize / 2;
          break;
      }

      page.drawText(`${i + 1}`, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
    saveAs(blob, "numbered.pdf");
  };

  return (
    <button
      className="mt-4 px-6 py-2.5 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200/40 hover:shadow-indigo-300 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleAddPageNumbers}
      disabled={!pdfFile}
    >
      Add Page Numbers & Download
    </button>
  );
};

export default AddPageNumbersButton;
