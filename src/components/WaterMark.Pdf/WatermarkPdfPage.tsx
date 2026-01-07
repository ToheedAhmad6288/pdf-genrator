import React, { useState } from "react";
import { FaWater } from "react-icons/fa";
import { Heading, FileUploadStyled } from "../UI";
import WatermarkControls from "./components/Watermark";
import PreviewPDF from "./components/View";
import DownloadButton from "./components/Download";
import { FaCode, FaArrowLeft } from "react-icons/fa";

interface WatermarkPdfPageProps {
  onBack?: () => void;
}

const WatermarkPdfPage: React.FC<WatermarkPdfPageProps> = ({ onBack }) => {
  const [watermarkFile, setWatermarkFile] = useState<File | null>(null);
  const [watermarkOptions, setWatermarkOptions] = useState({
    text: "Watermark",
    fontSize: 30,
    color: "#000000",
    opacity: 0.3,
    position: "center" as
      | "top-left"
      | "top-right"
      | "center"
      | "bottom-left"
      | "bottom-right"
      | "diagonal"
      | "anti-diagonal",
  });
  const [showWatermarkPopup, setShowWatermarkPopup] = useState(false);
    return (
      <div className="relative min-h-screen">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[100px] animate-pulse mix-blend-multiply" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-200/40 rounded-full blur-[100px] animate-pulse delay-700 mix-blend-multiply" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] mix-blend-overlay"></div>
      </div>
      <button
        onClick={() => (onBack ? onBack() : (window.location.href = "/"))}
        aria-label="Back to home"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur rounded-md shadow hover:bg-white transition"
      >
        <FaArrowLeft className="text-neutral-700" />
        <span className="text-sm font-medium text-neutral-700">Home</span>
      </button>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-1 font-semibold text-neutral-800 bg-white/80 backdrop-blur-md rounded-full border border-white/50 shadow-sm animate-fade-in-scale delay-300 ring-1 ring-neutral-100">
            <span className="px-3 py-0.5 text-[10px] font-bold tracking-wide uppercase text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-inner">
              Tool
            </span>
            <span className="ml-2 text-xs text-neutral-600 pr-3">
              Watermark
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight drop-shadow-sm">
            <span className="inline-block bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 bg-clip-text text-transparent">
              Watermark PDF
            </span>
            <span className="block mt-1 text-indigo-600">
              Personalize & Protect
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-base text-neutral-500 leading-relaxed font-medium">
            Add custom text watermarks to your documents with control over
            position, size and opacity.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 gap-6 transition-all duration-500 ease-in-out ${
            watermarkFile ? "lg:grid-cols-12" : "max-w-3xl mx-auto"
          }`}
        >
          <div
            className={`transition-all duration-500 ${
              watermarkFile ? "lg:col-span-5" : "w-full"
            }`}
          >
            <div className="bg-white/40 backdrop-blur-2xl p-1 rounded-[2rem] shadow-2xl shadow-indigo-200/40 border border-white/60 ring-1 ring-white/60">
              <div className="bg-white/50 rounded-[1.8rem] p-6 border border-white/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <FaWater className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      Upload PDF
                    </h3>
                    <p className="text-neutral-500 text-sm font-medium">
                      Select a PDF to watermark
                    </p>
                  </div>
                </div>

                <FileUploadStyled
                  onFilesSelected={(f) => {
                    setWatermarkFile(f[0]);
                    setShowWatermarkPopup(true);
                  }}
                />

                {!watermarkFile && (
                  <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                    {[
                      {
                        label: "Local",
                        desc: "Processed locally",
                        icon: "🔒",
                        color: "bg-emerald-50 text-emerald-600",
                      },
                      {
                        label: "Fast",
                        desc: "Instant preview",
                        icon: "⚡",
                        color: "bg-amber-50 text-amber-600",
                      },
                      {
                        label: "Control",
                        desc: "Customize watermark",
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

            {watermarkFile && (
              <div className="mt-6 bg-white/50 rounded-[1.2rem] p-4 border border-white/50">
                <Heading level={4} className="!mb-2 font-bold text-neutral-900">
                  Watermark Settings
                </Heading>
                <WatermarkControls
                  options={watermarkOptions as any}
                  onChange={setWatermarkOptions}
                />
                <div className="mt-6">
                  <DownloadButton
                    file={watermarkFile}
                    watermark={watermarkOptions as any}
                  />
                </div>
              </div>
            )}
          </div>

          {watermarkFile && (
            <div className="lg:col-span-7 animate-fade-in-up delay-200">
              <div className="h-full bg-white/40 backdrop-blur-2xl p-1 rounded-[2rem] shadow-2xl shadow-indigo-200/40 border border-white/60 ring-1 ring-white/60">
                <div className="h-full bg-white/50 rounded-[1.8rem] p-6 border border-white/50 flex flex-col">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-secondary-500 flex items-center justify-center text-white text-sm shadow-md">
                      <span className="font-bold">P</span>
                    </div>
                    <Heading
                      level={4}
                      className="!mb-0 font-bold text-neutral-900"
                    >
                      Document Preview
                    </Heading>
                  </div>
                  <PreviewPDF
                    file={watermarkFile}
                    watermark={watermarkOptions as any}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatermarkPdfPage;
