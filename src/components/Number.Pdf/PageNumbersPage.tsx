import React from "react";
import { FaListOl } from "react-icons/fa";

import FileUpload from "./components/file";
import PageNumberSettings from "./components/number";
import AddPageNumbersButton from "./components/btn";

interface PageNumbersPageProps { }

const PageNumbersPage: React.FC<PageNumbersPageProps> = () => {
    const [pdfFile, setPdfFile] = React.useState<File | null>(null);
    const [position, setPosition] = React.useState<string>("bottom-right");
    const [fontSize, setFontSize] = React.useState<number>(12);
    const [startPage, setStartPage] = React.useState<number>(1);
    const [endPage, setEndPage] = React.useState<number>(1);

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
                        ORGANIZE
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                        <span className="inline-block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent py-1">
                            Page Numbers
                        </span>
                        <span className="text-neutral-900 ml-3">PDF</span>
                    </h1>
                    <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Easily add page numbers to your PDF documents. Customize the position, font size, and range for a professional look.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left Column - Input */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-neutral-200/50 transition-all hover:shadow-primary-100/30">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                                    <FaListOl className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900">Upload PDF</h3>
                                    <p className="text-neutral-500 text-sm font-medium">Step 1: Choose your document</p>
                                </div>
                            </div>
                            <FileUpload onFileSelect={setPdfFile} />
                            {pdfFile && (
                                <div className="mt-6 p-4 bg-success-50/50 rounded-2xl border border-success-100 animate-fade-in">
                                    <p className="text-xs text-success-700 font-bold flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse"></span>
                                        {pdfFile.name}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Settings */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-neutral-200/50 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500"></div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-secondary-500 flex items-center justify-center shadow-lg shadow-secondary-500/30 group-hover:scale-110 transition-transform">
                                    <span className="text-white font-bold text-xl">2</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900">Configure & Generate</h3>
                                    <p className="text-neutral-500 text-sm font-medium">Step 2: Customize settings</p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-neutral-50/50 p-6 rounded-2xl border border-neutral-100">
                                    <PageNumberSettings
                                        position={position}
                                        setPosition={setPosition}
                                        fontSize={fontSize}
                                        setFontSize={setFontSize}
                                        startPage={startPage}
                                        setStartPage={setStartPage}
                                        endPage={endPage}
                                        setEndPage={setEndPage}
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <AddPageNumbersButton
                                        pdfFile={pdfFile}
                                        position={position}
                                        fontSize={fontSize}
                                        startPage={startPage}
                                        endPage={endPage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageNumbersPage;
