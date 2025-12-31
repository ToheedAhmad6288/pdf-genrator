import React, { useState } from "react";
import { FaWater } from "react-icons/fa";
import { Heading, FileUploadStyled, Modal } from "../UI";
import WatermarkControls from "./components/Watermark";
import PreviewPDF from "./components/View";
import DownloadButton from "./components/Download";

interface WatermarkPdfPageProps { }

const WatermarkPdfPage: React.FC<WatermarkPdfPageProps> = () => {
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
                        BRAND
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                        <span className="inline-block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent py-1">
                            Watermark
                        </span>
                        <span className="text-neutral-900 ml-3">PDF</span>
                    </h1>
                    <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Protect and personalize your documents by adding custom text or image watermarks with full control.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-neutral-200/50 transition-all hover:shadow-primary-100/30">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                                <FaWater className="text-white text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900">Upload PDF</h3>
                                <p className="text-neutral-500 text-sm font-medium">Add watermark to your document</p>
                            </div>
                        </div>
                        <FileUploadStyled
                            onFilesSelected={(f) => {
                                setWatermarkFile(f[0]);
                                setShowWatermarkPopup(true);
                            }}
                        />
                        <div className="mt-8 text-center">
                            <p className="text-neutral-500 font-medium italic text-sm">
                                Tip: After upload, you can customize position, size and opacity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {showWatermarkPopup && watermarkFile && (
                <Modal onClose={() => setShowWatermarkPopup(false)}>
                    <div className="flex flex-col md:flex-row h-[80vh] bg-white rounded-3xl overflow-hidden">
                        <div className="w-full md:w-2/3 p-8 bg-neutral-50/50 overflow-auto border-r border-neutral-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-secondary-500 flex items-center justify-center text-white text-sm shadow-md">
                                    <span className="font-bold">P</span>
                                </div>
                                <Heading level={4} className="!mb-0 font-bold text-neutral-900">Document Preview</Heading>
                            </div>
                            <PreviewPDF file={watermarkFile} watermark={watermarkOptions as any} />
                        </div>
                        <div className="w-full md:w-1/3 p-8 bg-white overflow-auto">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white text-sm shadow-md">
                                    <span className="font-bold">S</span>
                                </div>
                                <Heading level={4} className="!mb-0 font-bold text-neutral-900">Watermark Settings</Heading>
                            </div>
                            <WatermarkControls
                                options={watermarkOptions as any}
                                onChange={setWatermarkOptions}
                            />
                            <div className="mt-12">
                                <DownloadButton
                                    file={watermarkFile}
                                    watermark={watermarkOptions as any}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default WatermarkPdfPage;
