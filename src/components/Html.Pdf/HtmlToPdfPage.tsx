import React from "react";
import { FaCode, FaArrowLeft } from "react-icons/fa";
import { FileUploadStyled, Heading } from "../UI";
import HtmlPreview from "./components/preview";
import HtmlDownloadButton from "./components/Button";

interface HtmlToPdfPageProps { onBack?: () => void }

const HtmlToPdfPage: React.FC<HtmlToPdfPageProps> = ({ onBack }) => {
    const [htmlContent, setHtmlContent] = React.useState<string>("");

    return (
        <div className="relative min-h-[calc(100vh-4rem)] bg-emerald-50">
                {/* Decorative Background Elements - distinct emerald/teal/cyan combo */}
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
                    <div className="absolute top-[-8%] left-[-8%] w-[48%] h-[48%] bg-emerald-200/40 rounded-full blur-[80px] animate-pulse mix-blend-multiply" />
                    <div className="absolute bottom-[-8%] right-[-8%] w-[48%] h-[48%] bg-cyan-200/40 rounded-full blur-[80px] animate-pulse delay-700 mix-blend-multiply" />
                    <div className="absolute top-[40%] left-[40%] w-[38%] h-[38%] bg-teal-200/40 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-overlay" />
                </div>

                    <button
                        onClick={() => onBack ? onBack() : (window.location.href = "/")}
                        aria-label="Back to home"
                        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur rounded-md shadow hover:bg-white transition"
                    >
                        <FaArrowLeft className="text-neutral-700" />
                        <span className="text-sm font-medium text-neutral-700">Home</span>
                    </button>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 animate-fade-in-up">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-bold mb-6 hover:bg-emerald-100 transition-colors cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        DEVELOP
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                        <span className="inline-block bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent py-1">
                            HTML to PDF
                        </span>
                        <span className="text-neutral-900 ml-3">Parser</span>
                    </h1>
                    <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Convert your HTML files or snippets into professionally formatted PDF documents instantly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Column - Input */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-neutral-200/50 transition-all hover:shadow-emerald-100/30">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                                    <FaCode className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900">Upload HTML</h3>
                                    <p className="text-neutral-500 text-sm font-medium">Step 1: Select your code file</p>
                                </div>
                            </div>
                            <FileUploadStyled
                                onFilesSelected={async (f) => setHtmlContent(await f[0].text())}
                            />
                        </div>
                    </div>

                    {/* Right Column - Result */}
                        <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-neutral-200/50 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500"></div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
                                    <span className="text-white font-bold text-xl">2</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900">Preview & Result</h3>
                                    <p className="text-neutral-500 text-sm font-medium">Step 2: Review and download</p>
                                </div>
                            </div>
                            {htmlContent ? (
                                <div className="mt-6 animate-fadeIn">
                                    <Heading level={4} className="mb-4 font-bold text-neutral-900">Document Preview</Heading>
                                    <div className="max-h-80 overflow-auto border-2 border-neutral-100 rounded-[1.5rem] p-6 bg-white/50 mb-6 shadow-inner relative group/preview">
                                        <HtmlPreview htmlContent={htmlContent} />
                                    </div>
                                    <div className="flex justify-center">
                                        <HtmlDownloadButton targetId="preview-content" />
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-16 px-8 border-2 border-dashed border-neutral-100 rounded-3xl bg-neutral-50/30 opacity-60">
                                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 grayscale opacity-50">
                                        <FaCode className="text-2xl text-neutral-400" />
                                    </div>
                                    <p className="text-neutral-500 font-medium italic">Ready to transform your code</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HtmlToPdfPage;
