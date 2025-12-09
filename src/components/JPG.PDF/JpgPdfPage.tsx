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
    <div className={`flex flex-col lg:flex-row ${images.length > 0 ? 'lg:items-start' : 'items-center'} gap-6 lg:gap-8 transition-all duration-500 ease-in-out`}>
      {/* Left Column: Input Section */}
      <div className={`w-full ${images.length > 0 ? 'lg:w-4/12 xl:w-4/12 lg:sticky lg:top-8 h-fit' : 'max-w-2xl'} space-y-6 transition-all duration-500`}>

        <FileUpload onFilesSelected={handleFilesSelected} />

        {images.length === 0 && (
          <div className="text-center py-8 text-gray-400 animate-fade-in-up">
            <p className="text-sm">No images selected yet. Start by uploading some images above.</p>
          </div>
        )}
      </div>

      {/* Right Column: Preview Section */}
      {images.length > 0 && (
        <div className="w-full lg:w-8/12 xl:w-8/12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <ImagePreview images={images} onRemove={handleRemoveImage} />
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                Clear All Images
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JpgPdfPage;
