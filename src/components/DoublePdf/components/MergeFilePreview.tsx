
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '../../UI';
import { FaTrash, FaFilePdf, FaMagic, FaGripVertical } from 'react-icons/fa';

interface MergeFilePreviewProps {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    onRemove: (index: number) => void;
    onClear: () => void;
}

const MergeFilePreview: React.FC<MergeFilePreviewProps> = ({ files, setFiles, onRemove, onClear }) => {
    const [loading, setLoading] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
        // e.dataTransfer.setDragImage(e.currentTarget, 20, 20); // Optional: customize drag image
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newFiles = [...files];
        const [movedFile] = newFiles.splice(draggedIndex, 1);
        newFiles.splice(index, 0, movedFile);

        setFiles(newFiles);
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleMerge = async () => {
        if (files.length < 2) {
            alert("Please select at least 2 PDF files to merge!");
            return;
        }

        setLoading(true);

        try {
            const mergedPdf = await PDFDocument.create();

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "merged.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Merge failed:", error);
            alert("Failed to merge PDFs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full space-y-5 animate-fade-in">
            <div className="flex items-center justify-between mb-2 px-1">
                <h3 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                    <div className="p-1.5 bg-rose-100 rounded-lg text-rose-600 shadow-sm">
                        <FaFilePdf size={16} />
                    </div>
                    <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">Selected PDFs</span>
                    <span className="text-xs font-bold text-primary-600 bg-primary-50 border border-primary-100 px-2 py-0.5 rounded-full ml-1 shadow-sm">{files.length}</span>
                </h3>
                <button
                    onClick={onClear}
                    className="group flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all border border-transparent hover:border-rose-100"
                >
                    <FaTrash className="transition-transform group-hover:scale-110" size={12} />
                    <span>Clear All</span>
                </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto p-2 pr-3 custom-scrollbar">
                {files.map((file, index) => (
                    <div
                        key={`${file.name}-${index}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`
                            group relative flex items-center gap-4 p-4 rounded-xl shadow-sm hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 bg-white border border-neutral-100 hover:border-primary-200 ring-0 hover:ring-2 ring-primary-500/20 cursor-move
                            ${draggedIndex === index ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}
                        `}
                    >
                        <div className="text-neutral-300 group-hover:text-primary-400 cursor-move">
                            <FaGripVertical />
                        </div>

                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 flex items-center justify-center shrink-0 border border-rose-200/50">
                            <FaFilePdf className="text-rose-500 text-xl" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-neutral-800 text-sm truncate">{file.name}</h4>
                            <p className="text-[10px] text-neutral-500 font-medium">
                                {(file.size / 1024 / 1024).toFixed(2)} MB • #{index + 1}
                            </p>
                        </div>

                        <button
                            onClick={() => onRemove(index)}
                            className="p-2 text-neutral-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                            title="Remove file"
                        >
                            <FaTrash size={14} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="pt-5 border-t border-neutral-100 flex flex-col items-center justify-center gap-3">
                <div className="w-full max-w-xs">
                    <Button
                        onClick={handleMerge}
                        loading={loading}
                        disabled={loading || files.length < 2}
                        size="md"
                        variant="primary"
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02] transition-all duration-300 border-0"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-base py-1">
                            {loading ? (
                                <span className="animate-pulse">Merging PDFs...</span>
                            ) : (
                                <>
                                    <span>Merge PDFs</span>
                                    <FaMagic className="group-hover:rotate-12 transition-transform text-sm text-yellow-300" />
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    </Button>
                </div>
                <p className="text-[10px] text-neutral-500 font-medium flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${files.length >= 2 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                    {files.length} file{files.length !== 1 && 's'} ready for merging (min 2)
                </p>
            </div>
        </div>
    );
};

export default MergeFilePreview;
