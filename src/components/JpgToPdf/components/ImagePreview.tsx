import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '../../UI';
import { FaTrash, FaFilePdf, FaMagic } from 'react-icons/fa';

interface ImagePreviewProps {
    images: File[];
    onRemove: (index: number) => void;
    onClear: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images, onRemove, onClear }) => {
    const [loading, setLoading] = useState(false);

    const convertToPdf = async () => {
        setLoading(true);
        try {
            const pdf = new jsPDF();

            for (let i = 0; i < images.length; i++) {
                const img = images[i];
                const imgData = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.readAsDataURL(img);
                });

                if (i > 0) pdf.addPage();

                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            }

            pdf.save('converted.pdf');
        } catch (error) {
            console.error('Error converting images to PDF:', error);
            alert('Error converting images to PDF. Please try again.');
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
                    <span className="bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">Selected Images</span>
                    <span className="text-xs font-bold text-primary-600 bg-primary-50 border border-primary-100 px-2 py-0.5 rounded-full ml-1 shadow-sm">{images.length}</span>
                </h3>
                <button
                    onClick={onClear}
                    className="group flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all border border-transparent hover:border-rose-100"
                >
                    <FaTrash className="transition-transform group-hover:scale-110" size={12} />
                    <span>Clear All</span>
                </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[400px] overflow-y-auto p-2 pr-3 custom-scrollbar">
                {images.map((file, index) => (
                    <div
                        key={`${file.name}-${index}`}
                        className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-0.5 bg-white border border-neutral-100 hover:border-primary-200 ring-0 hover:ring-2 ring-primary-500/20 animate-fade-in-scale"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="absolute inset-0 bg-neutral-100 animate-pulse" />
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />

                        <div className="absolute bottom-1.5 left-1.5 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <span className="text-white text-[10px] font-bold bg-white/20 backdrop-blur-md border border-white/30 px-1.5 py-0.5 rounded-md shadow-sm">
                                #{index + 1}
                            </span>
                        </div>

                        <button
                            onClick={() => onRemove(index)}
                            className="absolute top-1.5 right-1.5 z-30 p-1.5 bg-white/90 text-rose-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-rose-500 hover:text-white hover:scale-110 translate-y--2 group-hover:translate-y-0"
                            title="Remove image"
                        >
                            <FaTrash size={10} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="pt-5 border-t border-neutral-100 flex flex-col items-center justify-center gap-3">
                <div className="w-full max-w-xs">
                    <Button
                        onClick={convertToPdf}
                        loading={loading}
                        disabled={loading || images.length === 0}
                        size="md"
                        variant="primary"
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-[1.02] transition-all duration-300 border-0"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 font-bold text-base py-1">
                            {loading ? (
                                <span className="animate-pulse">Converting...</span>
                            ) : (
                                <>
                                    <span>Convert to PDF</span>
                                    <FaMagic className="group-hover:rotate-12 transition-transform text-sm text-yellow-300" />
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    </Button>
                </div>
                <p className="text-[10px] text-neutral-500 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {images.length} image{images.length !== 1 && 's'} ready for conversion
                </p>
            </div>
        </div>
    );
};

export default ImagePreview;
