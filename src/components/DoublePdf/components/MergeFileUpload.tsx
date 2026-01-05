
import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt, FaFilePdf } from 'react-icons/fa';

interface MergeFileUploadProps {
    onFilesSelected: (files: File[]) => void;
}

const MergeFileUpload: React.FC<MergeFileUploadProps> = ({ onFilesSelected }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const filesArray = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
            if (filesArray.length > 0) {
                onFilesSelected(filesArray);
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFilesSelected(Array.from(e.target.files));
        }
    };

    return (
        <div className="w-full animate-fade-in-up delay-100">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                className={`
                    relative group cursor-pointer 
                    border-3 border-dashed rounded-2xl p-8
                    flex flex-col items-center justify-center text-center 
                    transition-all duration-500 ease-out
                    ${isDragging
                        ? 'border-indigo-500 bg-indigo-50/80 scale-[1.02] shadow-2xl shadow-indigo-500/20 ring-4 ring-indigo-500/10'
                        : 'border-neutral-200 hover:border-indigo-400 hover:bg-white/90 hover:shadow-xl hover:shadow-indigo-500/10'
                    }
                    bg-white/60 backdrop-blur-md
                `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className={`
                    w-20 h-20 rounded-2xl flex items-center justify-center mb-6
                    transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-lg
                    ${isDragging ? 'bg-indigo-600 shadow-indigo-500/40 rotate-12' : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/20'}
                `}>
                    <FaCloudUploadAlt className={`text-4xl transition-colors duration-300 text-white`} />
                </div>

                <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isDragging ? 'text-indigo-600' : 'text-neutral-800 group-hover:text-indigo-700'}`}>
                    {isDragging ? 'Drop PDFs Here' : 'Click or Drag PDF Files'}
                </h3>
                <p className="text-neutral-500 text-sm max-w-sm mx-auto mb-6 group-hover:text-neutral-600">
                    Upload multiple <span className="font-semibold text-rose-500">PDFs</span> to merge them into one document.
                </p>

                <div className={`
                    flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full border transition-all duration-300
                    ${isDragging
                        ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                        : 'bg-neutral-50 text-neutral-500 border-neutral-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100'}
                `}>
                    <FaFilePdf className="text-sm text-rose-500" />
                    <span>Multiple files supported</span>
                </div>
            </div>
        </div>
    );
};

export default MergeFileUpload;
