import React from 'react';

interface FileUploadProps {
    onFilesSelected: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelected }) => {
    return (
        <div className="w-full">
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files) {
                        onFilesSelected(Array.from(e.target.files));
                    }
                }}
                className="w-full px-4 py-3 border-2 border-dashed border-indigo-300 rounded-2xl hover:border-indigo-500 transition-colors cursor-pointer bg-white/50"
            />
        </div>
    );
};

export default FileUpload;
