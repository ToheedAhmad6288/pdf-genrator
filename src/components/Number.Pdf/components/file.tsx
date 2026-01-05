import React from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  return (
    <div className="">
      <label className="block cursor-pointer">
        <div className="border-2 border-dashed rounded-xl p-6 text-center bg-white/50 hover:bg-white/60 transition-colors">
          <input
            className="hidden"
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                onFileSelect(e.target.files[0]);
              }
            }}
          />
          <div className="text-sm font-medium text-neutral-600">Click to upload a PDF file</div>
          <div className="text-[12px] text-neutral-400 mt-1">Supports single PDF document</div>
        </div>
      </label>
    </div>
  );
};

export default FileUpload;
