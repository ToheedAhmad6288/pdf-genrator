import React, { useState } from "react";
import { FaArrowLeft, FaFilePdf, FaTrashAlt } from "react-icons/fa";
import FileUpload2 from "./Components/FileUpload2";
import CompressButton from "./Components/CompressButton";

interface CompressPdfPageProps {
  onBack: () => void;
}

const CompressPdfPage: React.FC<CompressPdfPageProps> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFilesSelected = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[100px] animate-pulse mix-blend-multiply" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-200/40 rounded-full blur-[100px] animate-pulse delay-700 mix-blend-multiply" />
          <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] bg-pink-200/40 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-multiple" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-neutral-700 hover:text-indigo-600 bg-white/50 hover:bg-white/80 border border-white/60 shadow-sm transition-all duration-300 hover:scale-105 mb-8 group cursor-pointer"
        >
          <div className="p-1.5 rounded-lg bg-white/60 group-hover:bg-indigo-50 transition-colors">
            <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to Tools
        </button>

        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-1 font-semibold text-neutral-800 bg-white/80 backdrop-blur-md rounded-full border border-white/50 shadow-sm animate-fade-in-scale delay-300 ring-1 ring-neutral-100">
            <span className="px-3 py-0.5 text-[10px] font-bold tracking-wide uppercase text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-inner">
              New
            </span>
            <span className="ml-2 text-xs text-neutral-600 pr-3">
              Optimize your PDF
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight drop-shadow-sm">
            <span className="inline-block bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 bg-clip-text text-transparent">
              Compress PDF
            </span>
            <span className="block mt-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x pb-1">
              Reduce File Size
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-base text-neutral-500 leading-relaxed font-medium">
            Reduce the file size of your PDF documents while maintaining the best possible quality.
          </p>
        </div>

        {/* Main Content Grid */}
        <div
          className={`
             grid grid-cols-1 gap-6 transition-all duration-500 ease-in-out
             ${file ? "lg:grid-cols-12" : "max-w-3xl mx-auto"}
        `}
        >
          {/* Upload Section */}
          <div
            className={`
              transition-all duration-500
              ${file ? "lg:col-span-5" : "w-full"}
          `}
          >
            <div className="bg-white/40 backdrop-blur-2xl p-1 rounded-[2rem] shadow-2xl shadow-indigo-200/40 border border-white/60 ring-1 ring-white/60">
              <div className="bg-white/50 rounded-[1.8rem] p-6 border border-white/50">
                <FileUpload2 onFilesSelected={handleFilesSelected} />

                {!file && (
                  <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                    {[
                      {
                        label: "Secure",
                        desc: "Local Processing",
                        icon: "🔒",
                        color: "bg-emerald-50 text-emerald-600",
                      },
                      {
                        label: "Fast",
                        desc: "Instant Reduce",
                        icon: "⚡",
                        color: "bg-amber-50 text-amber-600",
                      },
                      {
                        label: "Easy",
                        desc: "Drag & Drop",
                        icon: "✨",
                        color: "bg-rose-50 text-rose-600",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border border-white/60 shadow-sm transition-transform hover:scale-105 ${item.color}`}
                      >
                        <div className="text-lg mb-1">{item.icon}</div>
                        <div className="font-bold text-sm">{item.label}</div>
                        <div className="text-[10px] opacity-80 font-medium">
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview & Action Section */}
          {file && (
            <div className="lg:col-span-7 animate-fade-in-up delay-200">
              <div className="h-full bg-white/40 backdrop-blur-2xl p-1 rounded-[2rem] shadow-2xl shadow-indigo-200/40 border border-white/60 ring-1 ring-white/60">
                <div className="h-full bg-white/50 rounded-[1.8rem] p-6 border border-white/50 flex flex-col">
                  {/* File Info Card */}
                  <div className="bg-white/60 p-4 rounded-xl border border-white/60 shadow-sm mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                        <FaFilePdf className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-neutral-800 line-clamp-1">
                          {file.name}
                        </h3>
                        <p className="text-xs text-neutral-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveFile}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove file"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>

                  {/* Compress Action */}
                  <div className="flex-1 flex flex-col justify-center">
                    <CompressButton file={file} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompressPdfPage;
