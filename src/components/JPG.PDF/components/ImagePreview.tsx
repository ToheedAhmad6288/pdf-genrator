"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { FiX, FiDownload, FiLoader } from "react-icons/fi";

interface ImagePreviewProps {
  images: (string | File)[];
  onRemove?: (index: number) => void;
  onClear?: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images, onRemove, onClear }) => {
  const [loading, setLoading] = useState(false);

  const getImageUrl = (img: string | File) =>
    typeof img === "string" ? img : URL.createObjectURL(img);

  const fileToDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleConvert = async () => {
    if (!images.length) return alert("Please upload at least one image!");

    setLoading(true);
    const pdf = new jsPDF();

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (typeof img === "string") continue;

      const imgData = await fileToDataURL(img);
      if (i > 0) pdf.addPage();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save("converted.pdf");
    setLoading(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header & Stats */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Preview Images
          </h3>
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-blue-100">
            {images.length} {images.length === 1 ? 'Image' : 'Images'}
          </span>
        </div>

        {onClear && (
          <button
            onClick={onClear}
            className="text-sm text-red-500 hover:text-red-700 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <FiX size={16} />
            Clear All
          </button>
        )}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {images.map((img, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
            className="relative group aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 hover:border-blue-500 transition-all duration-300 bg-gray-50 shadow-sm hover:shadow-md animate-fade-in-scale"
          >
            <img
              src={getImageUrl(img)}
              alt={`preview-${index}`}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              {onRemove && (
                <button
                  onClick={() => onRemove(index)}
                  className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50 transition-transform hover:scale-110 shadow-lg"
                  title="Remove image"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>

            {/* Index Badge */}
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              #{index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Convert Action */}
      <div className="pt-2">
        <button
          onClick={handleConvert}
          disabled={loading}
          className={`w-full py-3.5 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5"
            }`}
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" size={20} />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <FiDownload size={20} />
              <span>Convert to PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
