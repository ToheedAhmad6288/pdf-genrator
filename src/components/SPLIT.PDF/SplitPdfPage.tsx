import React, { useState } from "react";
import SplitComponent from "./components/Split";
import Download from "./components/Download";
import { FileUploadStyled } from "../UI";
import { FaArrowLeft, FaCut } from "react-icons/fa";

interface SplitPdfPageProps {
  onBack?: () => void;
}

const SplitPdfPage: React.FC<SplitPdfPageProps> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [splitBlob, setSplitBlob] = useState<Blob | null>(null);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Dynamic Background - Orange/Red Theme */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-200/40 rounded-full blur-[100px] animate-pulse mix-blend-multiply" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-200/40 rounded-full blur-[100px] animate-pulse delay-700 mix-blend-multiply" />
          <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] bg-amber-200/40 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-multiply" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {onBack && (
          <button onClick={onBack} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-neutral-700 hover:text-orange-600 bg-white/50 hover:bg-white/80 border border-white/60 shadow-sm transition-all duration-300 hover:scale-105 mb-8 group cursor-pointer">
            <div className="p-1.5 rounded-lg bg-white/60 group-hover:bg-orange-50 transition-colors">
              <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
            </div>
            Back to Tools
          </button>
        )}

        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-1 font-semibold text-neutral-800 bg-white/80 backdrop-blur-md rounded-full border border-white/50 shadow-sm animate-fade-in-scale delay-300 ring-1 ring-neutral-100">
            <span className="px-3 py-0.5 text-[10px] font-bold tracking-wide uppercase text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-inner">
              Free
            </span>
            <span className="ml-2 text-xs text-neutral-600 pr-3">
              Precision Splitter
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight drop-shadow-sm">
            <span className="inline-block bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 bg-clip-text text-transparent">
              Split PDF
            </span>
            <span className="block mt-1 bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x pb-1">
              Extract Pages Instantly
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-base text-neutral-500 leading-relaxed font-medium">
            Divide your PDF into multiple documents or extract specific pages with precision and ease.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className={`
               grid grid-cols-1 gap-6 transition-all duration-500 ease-in-out
               ${file ? 'lg:grid-cols-12' : 'max-w-3xl mx-auto'}
          `}>

          {/* Upload Section */}
          <div className={`
                transition-all duration-500
                ${file ? 'lg:col-span-5' : 'w-full'}
            `}>
            <div className="bg-white/40 backdrop-blur-2xl p-1 rounded-[2rem] shadow-2xl shadow-orange-200/40 border border-white/60 ring-1 ring-white/60">
              <div className="bg-white/50 rounded-[1.8rem] p-6 border border-white/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
                    <FaCut className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-800">Upload PDF</h3>
                    <p className="text-xs text-neutral-500 font-medium">Select file to split</p>
                  </div>
                </div>

                <FileUploadStyled onFilesSelected={(f) => { setFile(f[0]); setSplitBlob(null); }} />

                {!file && (
                  <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                    {[
                      { label: 'Precise', desc: 'Select Pages', icon: '🎯', color: 'bg-orange-50 text-orange-600' },
                      { label: 'Fast', desc: 'Instant Cut', icon: '⚡', color: 'bg-amber-50 text-amber-600' },
                      { label: 'Secure', desc: 'Local Only', icon: '🛡️', color: 'bg-red-50 text-red-600' },
                    ].map((item, idx) => (
                      <div key={idx} className={`p-2.5 rounded-xl border border-white/60 shadow-sm transition-transform hover:scale-105 ${item.color}`}>
                        <div className="text-lg mb-1">{item.icon}</div>
                        <div className="font-bold text-sm">{item.label}</div>
                        <div className="text-[10px] opacity-80 font-medium">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview / Result Section */}
          {file && (
            <div className="lg:col-span-7 animate-fade-in-up delay-200">
              <div className="h-full bg-white/40 backdrop-blur-2xl p-1 rounded-[2rem] shadow-2xl shadow-orange-200/40 border border-white/60 ring-1 ring-white/60">
                <div className="h-full bg-white/50 rounded-[1.8rem] p-6 border border-white/50 flex flex-col">

                  <div className="flex items-center gap-4 mb-6 border-b border-white/40 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                      <span className="font-bold text-lg">2</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-800">Split Settings</h3>
                      <p className="text-xs text-neutral-500 font-medium">Configure page ranges</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <SplitComponent file={file} onSplit={setSplitBlob} />
                  </div>

                  {splitBlob && (
                    <div className="mt-6 pt-6 border-t border-white/40 animate-fade-in">
                      <Download pages={splitBlob} />
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplitPdfPage;
