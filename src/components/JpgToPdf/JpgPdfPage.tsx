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
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-200 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary-200 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 animate-fade-in-up">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-bold mb-6 hover:bg-primary-100 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            CONVERT
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            <span className="inline-block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent py-1">
              JPG to PDF
            </span>
            <span className="text-neutral-900 ml-3">Converter</span>
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Transform your images into high-quality PDF documents effortlessly. Drag, drop, and reorder for a perfect layout.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${images.length > 0 ? 'lg:grid-cols-12' : 'max-w-3xl mx-auto'} gap-10 items-start`}>
          {/* Left Column - Input */}
          <div className={images.length > 0 ? 'lg:col-span-4' : 'w-full'}>
            <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-neutral-200/50 transition-all hover:shadow-primary-100/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Upload Images</h3>
                  <p className="text-neutral-500 text-sm font-medium">Add JPG, PNG, or WEBP</p>
                </div>
              </div>
              <FileUpload onFilesSelected={handleFilesSelected} />

              {images.length > 0 && (
                <div className="mt-8 p-4 bg-primary-50/50 rounded-2xl border border-primary-100 animate-fade-in">
                  <p className="text-xs text-primary-700 font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
                    Tip: Drag images to reorder
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Preview/Result */}
          {images.length > 0 && (
            <div className="lg:col-span-8 animate-fade-in-up">
              <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-neutral-200/50 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500"></div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-500 flex items-center justify-center shadow-lg shadow-secondary-500/30 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Preview & Convert</h3>
                    <p className="text-neutral-500 text-sm font-medium">Arrange and generate your PDF</p>
                  </div>
                </div>
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
    </div>
  );
};

export default JpgPdfPage;
