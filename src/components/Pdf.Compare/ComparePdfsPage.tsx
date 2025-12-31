import React from "react";
import * as pdfjsLib from "pdfjs-dist";
import { FaExchangeAlt } from "react-icons/fa";
import { Button, FileUploadStyled } from "../UI";
import Comparison from "./components/Comparison";

interface ComparePdfsPageProps { }

const ComparePdfsPage: React.FC<ComparePdfsPageProps> = () => {
    const [oldPdf, setOldPdf] = React.useState<File | null>(null);
    const [newPdf, setNewPdf] = React.useState<File | null>(null);
    const [oldText, setOldText] = React.useState("");
    const [newText, setNewText] = React.useState("");
    const [showComparePopup, setShowComparePopup] = React.useState(false);


    const extractTextFromPdf = async (file: File): Promise<string> => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let text = "";
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const strings = content.items.map((it: any) => it.str || "");
                const pageText = strings.join(" ");
                text += pageText + "\n";
            }
            return text.trim();
        } catch (error) {
            console.error("Error extracting PDF text:", error);
            return "";
        }
    };

    const handleCompare = async () => {
        if (!oldPdf || !newPdf) {
            alert("Please upload both PDFs!");
            return;
        }
        try {
            const oldTxt = await extractTextFromPdf(oldPdf);
            const newTxt = await extractTextFromPdf(newPdf);
            setOldText(oldTxt);
            setNewText(newTxt);
            setShowComparePopup(true);
        } catch (error) {
            console.error("Error during comparison:", error);
            alert("Error comparing PDFs. Check console for details.");
        }
    };

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
                        ANALYZE
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                        <span className="inline-block bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent py-1">
                            Compare PDF
                        </span>
                        <span className="text-neutral-900 ml-3">Versions</span>
                    </h1>
                    <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Detect differences and track changes between two versions of your documents with pixel-perfect precision.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Left Page - Original */}
                    <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-neutral-200/50 transition-all hover:shadow-primary-100/30">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-xl">1</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900">Original Document</h3>
                                <p className="text-neutral-500 text-sm font-medium">The base version for comparison</p>
                            </div>
                        </div>
                        <FileUploadStyled onFilesSelected={(f) => setOldPdf(f[0])} />
                        {oldPdf && (
                            <div className="mt-6 p-4 bg-success-50/50 rounded-2xl border border-success-100 animate-fade-in">
                                <p className="text-xs text-success-700 font-bold flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse"></span>
                                    {oldPdf.name}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Page - New */}
                    <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-2xl shadow-neutral-200/50 transition-all hover:shadow-secondary-100/30">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-secondary-500 flex items-center justify-center shadow-lg shadow-secondary-500/30 group-hover:scale-110 transition-transform">
                                <span className="text-white font-bold text-xl">2</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900">New Document</h3>
                                <p className="text-neutral-500 text-sm font-medium">The updated version to check</p>
                            </div>
                        </div>
                        <FileUploadStyled onFilesSelected={(f) => setNewPdf(f[0])} />
                        {newPdf && (
                            <div className="mt-6 p-4 bg-success-50/50 rounded-2xl border border-success-100 animate-fade-in">
                                <p className="text-xs text-success-700 font-bold flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse"></span>
                                    {newPdf.name}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <Button
                        onClick={handleCompare}
                        disabled={!oldPdf || !newPdf}
                        variant="primary"
                        className="px-12 py-5 rounded-[1.5rem] font-bold text-lg shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="flex items-center gap-3">
                            <FaExchangeAlt />
                            Compare Now
                        </div>
                    </Button>
                </div>
            </div>

            <Comparison
                oldFile={oldPdf}
                newFile={newPdf}
                oldText={oldText}
                newText={newText}
                showPopup={showComparePopup}
                onClose={() => setShowComparePopup(false)}
                onRunOcr={async () => { }}
                ocrLoading={false}
                ocrError={null}
            />
        </div>
    );
};

export default ComparePdfsPage;
