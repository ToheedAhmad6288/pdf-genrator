import React, { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { saveAs } from "file-saver";
import { FaSyncAlt, FaArrowLeft, FaShieldAlt, FaBolt, FaMagic } from "react-icons/fa";
import { Button, FileUploadStyled } from "../UI";
import RotateControls from "./components/Control";

interface RotatePdfPageProps {
    onBack: () => void;
}

const RotatePdfPage: React.FC<RotatePdfPageProps> = ({ onBack }) => {
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

    const handleClear = () => {
        setRotateFile(null);
        setTotalPages(0);
        setRotations([]);
    };

    return (
        <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-200/40 rounded-full blur-[100px] animate-pulse mix-blend-multiply" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-200/40 rounded-full blur-[100px] animate-pulse delay-700 mix-blend-multiply" />
                    <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] bg-cyan-200/40 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-multiple" />
                </div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <button onClick={onBack} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-neutral-700 hover:text-emerald-600 bg-white/50 hover:bg-white/80 border border-white/60 shadow-sm transition-all duration-300 hover:scale-105 mb-8 group cursor-pointer">
                    <div className="p-1.5 rounded-lg bg-white/60 group-hover:bg-emerald-50 transition-colors">
                        <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
                    </div>
                    Back to Tools
                </button>

                {/* Header Section */}
                <div className="text-center mb-10 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center p-1 font-semibold text-neutral-800 bg-white/80 backdrop-blur-md rounded-full border border-white/50 shadow-sm animate-fade-in-scale delay-300 ring-1 ring-neutral-100">
                        <span className="px-3 py-0.5 text-[10px] font-bold tracking-wide uppercase text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-inner">
                            New
                        </span>
                        <span className="ml-2 text-xs text-neutral-600 pr-3">
                            Easy PDF Rotation
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight drop-shadow-sm">
                        <span className="inline-block bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 bg-clip-text text-transparent">
                            Rotate PDF
                        </span>
                        <span className="block mt-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x pb-1">
                            Pages Instantly
                        </span>
                    </h1>

                    <p className="max-w-xl mx-auto text-base text-neutral-500 leading-relaxed font-medium">
                        Permanently rotate PDF pages to the correct orientation.
                        Fix upside-down PDFs in seconds.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className={`
             grid grid-cols-1 gap-6 transition-all duration-500 ease-in-out
             ${rotateFile ? 'lg:grid-cols-12' : 'max-w-3xl mx-auto'}
        `}>

                    {/* Upload Section */}
                    <div className={`
              transition-all duration-500
              ${rotateFile ? 'lg:col-span-5' : 'w-full'}
          `}>
                        <div className="bg-white/40 backdrop-blur-2xl p-1 rounded-[2rem] shadow-2xl shadow-emerald-200/40 border border-white/60 ring-1 ring-white/60">
                            <div className="bg-white/50 rounded-[1.8rem] p-6 border border-white/50">
                                {!rotateFile ? (
                                    <>
                                        <FileUploadStyled onFilesSelected={(f) => handleRotateFile(f[0])} />
                                        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                                            {[
                                                { label: 'Secure', desc: 'Local Only', icon: <FaShieldAlt />, color: 'bg-emerald-50 text-emerald-600' },
                                                { label: 'Fast', desc: 'Instant Fix', icon: <FaBolt />, color: 'bg-teal-50 text-teal-600' },
                                                { label: 'Easy', desc: 'Simple UI', icon: <FaMagic />, color: 'bg-cyan-50 text-cyan-600' },
                                            ].map((item, idx) => (
                                                <div key={idx} className={`p-2.5 rounded-xl border border-white/60 shadow-sm transition-transform hover:scale-105 ${item.color}`}>
                                                    <div className="text-lg mb-1 flex justify-center">{item.icon}</div>
                                                    <div className="font-bold text-sm">{item.label}</div>
                                                    <div className="text-[10px] opacity-80 font-medium">{item.desc}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 mx-auto bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm">
                                            <FaSyncAlt />
                                        </div>
                                        <h3 className="text-xl font-bold text-neutral-800 mb-2 truncate px-4">{rotateFile.name}</h3>
                                        <p className="text-neutral-500 text-sm mb-6">{totalPages} Pages Detected</p>
                                        <button
                                            onClick={handleClear}
                                            className="px-4 py-2 bg-white border border-neutral-200 text-neutral-600 rounded-xl text-sm font-semibold hover:bg-neutral-50 transition-colors shadow-sm"
                                        >
                                            Upload Different File
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    {rotateFile && (
                        <div className="lg:col-span-7 animate-fade-in-up delay-200">
                            <div className="h-full bg-white/40 backdrop-blur-2xl p-1 rounded-[2rem] shadow-2xl shadow-emerald-200/40 border border-white/60 ring-1 ring-white/60">
                                <div className="h-full bg-white/50 rounded-[1.8rem] p-8 border border-white/50 flex flex-col justify-center items-center text-center">

                                    <div className="mb-8 max-w-md mx-auto">
                                        <h3 className="text-2xl font-bold text-neutral-800 mb-3">Ready to Rotate?</h3>
                                        <p className="text-neutral-500">
                                            Click the button below to open the visual rotation editor, or use quick actions.
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                                        <Button
                                            variant="secondary"
                                            onClick={() => setShowRotatePopup(true)}
                                            icon={<FaSyncAlt />}
                                            className="flex-1 py-4 !rounded-2xl !bg-white/80 hover:!bg-white !border-emerald-200 !text-emerald-700 shadow-sm"
                                        >
                                            Rotate Pages
                                        </Button>

                                        <Button
                                            onClick={handleRotateDownload}
                                            disabled={loading}
                                            loading={loading}
                                            variant="primary"
                                            className="flex-1 py-4 !rounded-2xl !bg-gradient-to-r !from-emerald-600 !to-teal-600 hover:!from-emerald-700 hover:!to-teal-700 shadow-lg shadow-emerald-500/30"
                                        >
                                            Download PDF
                                        </Button>
                                    </div>

                                    {showRotatePopup && (
                                        <RotateControls
                                            totalPages={totalPages}
                                            rotations={rotations}
                                            onRotate={handleRotate}
                                            onClose={() => setShowRotatePopup(false)}
                                        />
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

export default RotatePdfPage;
