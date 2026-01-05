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
            <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[100px] animate-pulse mix-blend-multiply" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-200/40 rounded-full blur-[100px] animate-pulse delay-700 mix-blend-multiply" />
                        <div className="absolute top-[40%] left-[40%] w-[40%] h-[40%] bg-pink-200/40 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-multiple" />
                    </div>
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.04] mix-blend-overlay" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-white/60 text-indigo-700 text-sm font-bold mb-6 hover:bg-white/90 transition-colors cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        ANALYZE
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight drop-shadow-sm">
                        <span className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent py-1">
                            Compare PDF
                        </span>
                        <span className="text-neutral-900 ml-3">Versions</span>
                    </h1>
                    <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Detect differences and track changes between two versions of your documents with pixel-perfect precision.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    <div>
                        <div className="group bg-white/40 backdrop-blur-2xl p-1 rounded-[2rem] shadow-2xl shadow-indigo-200/40 border border-white/60 ring-1 ring-white/60 transition-all">
                          <div className="bg-white/50 rounded-[1.8rem] p-6 border border-white/50">
                            <div className="flex items-center gap-4 mb-8">
                              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200/30 group-hover:scale-110 transition-transform">
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
                        </div>
                    </div>

                    <div>
                        <div className="group bg-white/40 backdrop-blur-2xl p-1 rounded-[2rem] shadow-2xl shadow-indigo-200/40 border border-white/60 ring-1 ring-white/60 transition-all">
                          <div className="bg-white/50 rounded-[1.8rem] p-6 border border-white/50">
                            <div className="flex items-center gap-4 mb-8">
                              <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-200/30 group-hover:scale-110 transition-transform">
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
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <Button
                        onClick={handleCompare}
                        disabled={!oldPdf || !newPdf}
                        variant="primary"
                        className="px-12 py-4 rounded-[1.2rem] font-bold text-lg shadow-2xl shadow-indigo-200/40 hover:shadow-indigo-300 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"
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
