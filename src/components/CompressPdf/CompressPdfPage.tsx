import React, { useState } from "react";
import CompressButton from "./Components/CompressButton";
import FileUpload2 from "./Components/FileUpload2";

import { FaCompress } from "react-icons/fa";

const CompressPdfPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

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
            REDUCE SIZE
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            <span className="inline-block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent py-1">
              Compress PDF
            </span>
            <span className="text-neutral-900 ml-3">Online</span>
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Reduce the file size of your PDF documents while maintaining the best possible quality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column - Input */}
          <div className="lg:col-span-12 max-w-2xl mx-auto w-full">
            <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-neutral-200/50 transition-all hover:shadow-primary-100/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                  <FaCompress className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">Upload & Compress</h3>
                  <p className="text-neutral-500 text-sm font-medium">Select a PDF to reduce its size</p>
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <FileUpload2 onFilesSelected={(files) => setFile(files[0])} />
                <div className="flex justify-center">
                  <CompressButton file={file} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompressPdfPage;
