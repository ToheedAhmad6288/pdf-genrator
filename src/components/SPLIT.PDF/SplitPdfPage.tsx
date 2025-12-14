import React, { useState } from "react";
import SplitComponent from "./components/Split";
import Download from "./components/Download";
import FileUploadStyled from "../UIComponents/FileUploadStyled";
import Card from "../UIComponents/Card";
import { FaCut } from "react-icons/fa";

const SplitPdfPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitBlob, setSplitBlob] = useState<Blob | null>(null);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-8 pb-8 px-2 sm:px-6 lg:px-8 overflow-x-hidden w-full animate-fadeIn bg-transparent">
      {/* Glassy background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-red-100 to-yellow-100 animate-gradientShift opacity-95" style={{backgroundSize:'200% 200%'}}></div>
        <div className="absolute left-1/4 top-1/4 w-1/2 h-1/2 bg-orange-300 opacity-40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute right-1/4 bottom-1/4 w-1/3 h-1/3 bg-red-200 opacity-30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute left-1/3 bottom-0 w-1/4 h-1/4 bg-yellow-200 opacity-40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl" style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.18)'}}></div>
      </div>

      {/* Header Section */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center mb-8 mt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg mb-3 text-center">Split PDF</h1>
        <p className="text-lg text-gray-700 font-medium text-center max-w-2xl mb-2">Extract specific pages from your PDF. Upload, select a range, and download your new file instantly.</p>
      </div>

      {/* Main Content Layout */}
      <div className="w-full flex justify-center items-start">
        <div className="w-full max-w-2xl">
          <Card
            title="Split PDF - Upload and Split"
            icon={<FaCut />}
            colorClass="bg-gradient-to-br from-orange-50 via-yellow-50 to-red-100"
            iconColorClass="bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400"
          >
            <div className="flex flex-col gap-6 items-center w-full">
              <FileUploadStyled onFilesSelected={(f) => { setFile(f[0]); setSplitBlob(null); }} />
              {file && <SplitComponent file={file} onSplit={setSplitBlob} />}
              {splitBlob && <Download pages={splitBlob} />}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SplitPdfPage;
