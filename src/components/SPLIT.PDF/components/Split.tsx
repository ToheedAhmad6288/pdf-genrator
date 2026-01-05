import React, { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";

interface Props {
  file: File;
  onSplit: (blob: Blob | null) => void;
}

const SplitComponent: React.FC<Props> = ({ file, onSplit }) => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    const loadPdf = async () => {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdfDoc.getPageCount());
    };
    loadPdf();
  }, [file]);

  const handleSplit = async () => {
    if (!start || !end) {
      alert("Please enter start and end page numbers");
      return;
    }

    const s = Number(start);
    const e = Number(end);

    if (s < 1 || e > totalPages || s > e) {
      alert("Invalid Range!");
      return;
    }

    const originalBytes = await file.arrayBuffer();
    const originalPdf = await PDFDocument.load(originalBytes);

    const newPdf = await PDFDocument.create();
    const pageIndices = Array.from({ length: e - s + 1 }, (_, i) => s - 1 + i);

    const copiedPages = await newPdf.copyPages(originalPdf, pageIndices);

    copiedPages.forEach((page) => newPdf.addPage(page));

    const pdfBytes = await newPdf.save();
    const blob = new Blob([pdfBytes as any], { type: "application/pdf" });

    onSplit(blob);
  };

  return (
    <div className="mt-3">
      <p className="text-sm font-semibold">
        Total Pages: <span className="text-blue-600">{totalPages}</span>
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <input
          type="number"
          placeholder="Start Page"
          className="border border-gray-200 p-3 w-full rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm bg-white/50 backdrop-blur-sm"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="number"
          placeholder="End Page"
          className="border border-gray-200 p-3 w-full rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all shadow-sm bg-white/50 backdrop-blur-sm"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>

      <button
        onClick={handleSplit}
        className="mt-6 bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white px-6 py-2.5 rounded-xl w-full font-bold shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all duration-300 hover:-translate-y-0.5"
      >
        Download Selected Pages
      </button>
    </div >
  );
};

export default SplitComponent;
