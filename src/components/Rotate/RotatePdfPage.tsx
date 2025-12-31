import React, { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { saveAs } from "file-saver";
import { FaSyncAlt } from "react-icons/fa";
import { Button, FileUploadStyled } from "../UI";
import RotateControls from "./components/Control";

interface RotatePdfPageProps { }

const RotatePdfPage: React.FC<RotatePdfPageProps> = () => {
    const [rotateFile, setRotateFile] = useState<File | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [rotations, setRotations] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const handleRotateFile = async (file: File) => {
        setRotateFile(file);
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setTotalPages(pdfDoc.getPages().length);
        setRotations(Array(pdfDoc.getPages().length).fill(0));
    };

    const handleRotate = (index: number, direction: "left" | "right") => {
        setRotations((prev) =>
            prev.map((r, i) =>
                i === index
                    ? direction === "left"
                        ? (r - 90 + 360) % 360
                        : (r + 90) % 360
                    : r
            )
        );
    };

    const handleRotateDownload = async () => {
        if (!rotateFile) return alert("Upload a PDF first!");
        setLoading(true);
        const arrayBuffer = await rotateFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        pdfDoc.getPages().forEach((page, i) => {
            page.setRotation(degrees(rotations[i]));
        });
        const pdfBytes = await pdfDoc.save();
        saveAs(
            new Blob([pdfBytes as BlobPart], { type: "application/pdf" }),
            "rotated.pdf"
        );
        setLoading(false);
    };

    const [showRotatePopup, setShowRotatePopup] = useState(false);

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
                        TRANSFORM
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                        <span className="inline-block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent py-1">
                            Rotate PDF
                        </span>
                        <span className="text-neutral-900 ml-3">Pages</span>
                    </h1>
                    <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Adjust the orientation of your PDF pages with ease. Rotate individual pages or the entire document.
                    </p>
                </div>

                <div className={`grid grid-cols-1 ${rotateFile ? 'lg:grid-cols-12' : 'max-w-3xl mx-auto'} gap-10 items-start`}>
                    {/* Left Column - Input */}
                    <div className={rotateFile ? 'lg:col-span-5' : 'w-full'}>
                        <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-neutral-200/50 transition-all hover:shadow-primary-100/30">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                                    <FaSyncAlt className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900">Upload PDF</h3>
                                    <p className="text-neutral-500 text-sm font-medium">Step 1: Choose your document</p>
                                </div>
                            </div>
                            <FileUploadStyled onFilesSelected={(f) => handleRotateFile(f[0])} />
                        </div>
                    </div>

                    {/* Right Column - Result */}
                    {rotateFile && (
                        <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
                            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-neutral-200/50 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500"></div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary-500 flex items-center justify-center shadow-lg shadow-secondary-500/30 group-hover:scale-110 transition-transform">
                                        <span className="text-white font-bold text-xl">2</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-neutral-900">Rotate & Apply</h3>
                                        <p className="text-neutral-500 text-sm font-medium">Step 2: Adjust and download</p>
                                    </div>
                                </div>

                                <div className="bg-primary-50/50 p-6 rounded-2xl border border-primary-100 flex items-center justify-between mb-8">
                                    <div>
                                        <span className="font-bold text-neutral-900 block truncate max-w-[200px]">{rotateFile.name}</span>
                                        <span className="text-xs text-primary-600 font-bold uppercase tracking-widest">{totalPages} Pages • Selected</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary-600 shadow-sm">
                                        <FaSyncAlt className="animate-spin-slow" />
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        variant="secondary"
                                        onClick={() => setShowRotatePopup(true)}
                                        icon={<FaSyncAlt />}
                                        className="flex-1 py-4 !rounded-2xl"
                                    >
                                        Rotate Pages
                                    </Button>
                                    {showRotatePopup && (
                                        <RotateControls
                                            totalPages={totalPages}
                                            rotations={rotations}
                                            onRotate={handleRotate}
                                            onClose={() => setShowRotatePopup(false)}
                                        />
                                    )}
                                    <Button
                                        onClick={handleRotateDownload}
                                        disabled={loading}
                                        loading={loading}
                                        variant="primary"
                                        className="flex-1 py-4 !rounded-2xl"
                                    >
                                        Download Rotated PDF
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RotatePdfPage;
