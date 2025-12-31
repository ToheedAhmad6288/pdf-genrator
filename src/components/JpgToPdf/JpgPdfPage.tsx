import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ImagePreview from "./components/ImagePreview";


const JpgPdfPage: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setImages([]);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-4 pb-4 px-2 sm:px-6 lg:px-8 overflow-x-hidden w-full animate-fadeIn">
      {/* Advanced, immersive, glassy background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-pink-200 to-rose-200 animate-gradientShift opacity-95" style={{ backgroundSize: '200% 200%' }}></div>
        <div className="absolute left-1/4 top-1/4 w-1/2 h-1/2 bg-pink-400 opacity-40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute right-1/4 bottom-1/4 w-1/3 h-1/3 bg-indigo-400 opacity-30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute left-1/3 bottom-0 w-1/4 h-1/4 bg-rose-300 opacity-40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}></div>
      </div>

      {/* Header Section */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center mb-4 mt-2 scale-90">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-700 via-pink-600 to-rose-500 bg-clip-text text-transparent drop-shadow-lg mb-2">JPG → PDF</h1>
        <p className="text-lg text-gray-700 font-medium text-center max-w-2xl">Professional PDF Tool &mdash; Convert your images to PDF with style. Drag, drop, and reorder images for a perfect result.</p>
      </div>

      {/* Main Content Layout */}
      <div
        className={`w-full max-w-5xl mx-auto transition-all duration-500 ease-in-out ${images.length > 0 ? 'grid lg:grid-cols-12 gap-8 items-start' : ''} scale-95`}
      >
        {/* Left Column: Input Section */}
        <div
          className={`transition-all duration-500 ease-in-out ${images.length > 0 ? 'lg:col-span-4 xl:col-span-3' : 'w-full'}`}
        >
          <div className={`relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-indigo-200 p-8 overflow-hidden group hover:shadow-indigo-300 hover:scale-[1.025] transition-all duration-300 ${images.length > 0 ? 'sticky top-24' : ''}`}
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
            <div className="absolute -inset-1 rounded-3xl border-4 border-transparent group-hover:border-indigo-400 pointer-events-none transition-all duration-300 animate-glow"></div>
            {images.length > 0 && (
              <h2 className="text-xl font-extrabold text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-rose-500 bg-clip-text mb-4 flex items-center gap-2 drop-shadow-sm">
                <span className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-pink-500 rounded-full"></span>
                Add More Images
              </h2>
            )}

            <FileUpload onFilesSelected={handleFilesSelected} />

            {images.length === 0 && (
              <div className="text-center mt-8 text-gray-400">
                <p className="text-base font-semibold tracking-wide">Supported formats: <span className="text-indigo-500">JPG, PNG, WEBP</span></p>
                <p className="text-xs mt-2 opacity-80">Drag & drop or click to upload</p>
              </div>
            )}

            {images.length > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl border border-blue-100 shadow-sm">
                <p className="text-xs text-blue-700 font-medium text-center">
                  Tip: Drag images in the preview to reorder them before converting.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Preview Section */}
        {images.length > 0 && (
          <div className="lg:col-span-8 xl:col-span-9 animate-fade-in-up">
            <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-pink-200 p-8 overflow-hidden group hover:shadow-pink-300 hover:scale-[1.015] transition-all duration-300" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
              <div className="absolute -inset-1 rounded-3xl border-4 border-transparent group-hover:border-pink-400 pointer-events-none transition-all duration-300 animate-glow"></div>
              <ImagePreview
                images={images}
                onRemove={handleRemoveImage}
                onClear={handleClearAll}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JpgPdfPage;
