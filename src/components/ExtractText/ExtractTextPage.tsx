import React from "react";
import { FaFileImage, FaArrowLeft } from "react-icons/fa";

import TextFileUpload from "./components/FileUpload";
import TextExtractor from "./components/TextExtractor";

interface ExtractTextPageProps { 
    onBack?: () => void;
}

const ExtractTextPage: React.FC<ExtractTextPageProps> = ({ onBack }) => {
    const [extractFile, setExtractFile] = React.useState<File | null>(null);

    return (
        <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[100px] animate-pulse mix-blend-multiply" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-200/40 rounded-full blur-[100px] animate-pulse delay-700 mix-blend-multiply" />
                    <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] bg-pink-200/40 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-multiple" />
                </div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.04] mix-blend-overlay" />
            </div>

            <button
                onClick={() => {
                    if (onBack) onBack();
                    else window.location.href = "/";
                }}
                aria-label="Go home"
                className="absolute top-6 left-6 z-50 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/95 text-neutral-800 shadow-md hover:bg-white transition-colors"
            >
                <FaArrowLeft className="text-xl" />
                <span className="inline-block font-medium">Home</span>
            </button>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 animate-fade-in-up">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/60 text-indigo-700 text-sm font-bold mb-6 hover:bg-white/90 transition-colors cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        NEW FEATURE
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight drop-shadow-sm">
                        <span className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent py-1">
                            Extract Text
                        </span>
                        <span className="text-neutral-900 ml-3">from PDF</span>
                    </h1>
                    <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Transform your PDF documents into editable text instantly with our AI-powered extraction engine.
                    </p>
                </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Column - Input */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="group bg-white/40 backdrop-blur-2xl p-1 rounded-[2rem] shadow-2xl shadow-indigo-200/40 border border-white/60 ring-1 ring-white/60 transition-all">
                          <div className="bg-white/50 rounded-[1.8rem] p-6 border border-white/50">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200/30 group-hover:scale-110 transition-transform">
                                    <FaFileImage className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900">Upload PDF</h3>
                                    <p className="text-neutral-500 text-sm font-medium">Step 1: Choose your document</p>
                                </div>
                            </div>
                            <TextFileUpload file={extractFile} onFileChange={setExtractFile} />
                          </div>
                        </div>
                    </div>

                    {/* Right Column - Result */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                            <div className="bg-white/40 backdrop-blur-2xl p-1 rounded-[2rem] shadow-2xl shadow-indigo-200/40 border border-white/60 ring-1 ring-white/60">
                              <div className="bg-white/50 rounded-[1.8rem] p-6 border border-white/50">
                                <div className="flex items-center gap-4 mb-8">
                                  <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-200/30 group-hover:scale-110 transition-transform">
                                      <span className="text-white font-bold text-xl">2</span>
                                  </div>
                                  <div>
                                      <h3 className="text-xl font-bold text-neutral-900">Extraction Result</h3>
                                      <p className="text-neutral-500 text-sm font-medium">Step 2: Copy or download text</p>
                                  </div>
                                </div>
                                <TextExtractor file={extractFile} />
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtractTextPage;
