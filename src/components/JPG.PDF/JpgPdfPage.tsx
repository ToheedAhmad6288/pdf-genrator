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
    <div className="w-full mx-auto animate-fadeIn">
      <div
        className={`
          transition-all duration-500 ease-in-out
          ${images.length > 0 ? 'grid lg:grid-cols-12 gap-6 lg:gap-8 items-start' : 'max-w-2xl mx-auto'}
        `}
      >
        {/* Left Column: Input Section */}
        <div
          className={`
            transition-all duration-500 ease-in-out
            ${images.length > 0 ? 'lg:col-span-4 xl:col-span-3' : 'w-full'}
          `}
        >
          <div className={`
            bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6
            ${images.length > 0 ? 'sticky top-24' : ''}
          `}>
            {images.length > 0 && (
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Add More Images
              </h2>
            )}

            <FileUpload onFilesSelected={handleFilesSelected} />

            {images.length === 0 && (
              <div className="text-center mt-6 text-gray-400">
                <p className="text-sm font-medium">Supported formats: JPG, PNG, WEBP</p>
                <p className="text-xs mt-1 opacity-75">Drag & drop or click to upload</p>
              </div>
            )}

            {images.length > 0 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
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
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-8">
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
