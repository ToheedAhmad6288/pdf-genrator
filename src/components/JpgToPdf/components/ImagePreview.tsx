import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '../../UI';
import { FaTrash, FaFilePdf, FaArrowRight } from 'react-icons/fa';

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
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaFilePdf className="text-pink-500" />
                    Selected Images ({images.length})
                </h3>
                <button
                    onClick={onClear}
                    className="text-sm font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                    <FaTrash size={12} /> Clear All
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-auto p-2">
                {images.map((file, index) => (
                    <div key={index} className="group relative aspect-square rounded-xl overflow-hidden border-2 border-white shadow-md hover:shadow-xl transition-all duration-300">
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`preview-${index}`}
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={() => onRemove(index)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                            <FaTrash size={12} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-center">
                <Button
                    onClick={convertToPdf}
                    loading={loading}
                    disabled={loading || images.length === 0}
                    size="lg"
                    variant="primary"
                    icon={<FaArrowRight />}
                    className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 shadow-xl hover:shadow-indigo-200"
                >
                    Convert to PDF
                </Button>
            </div>
        </div>
    );
};

export default ImagePreview;
