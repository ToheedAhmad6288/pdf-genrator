import React, { useState } from "react";
import CompressButton from "./Components/CompressButton";
import FileUpload2 from "./Components/FileUpload2";

const CompressPdfPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <FileUpload2 onFilesSelected={(files) => setFile(files[0])} />
      <CompressButton file={file} />
    </div>
  );
};

export default CompressPdfPage;
