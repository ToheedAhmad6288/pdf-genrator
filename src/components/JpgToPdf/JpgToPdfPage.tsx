import React, { useState } from "react";
import FileUpload from "./Components/FileUpload";
import ConvertButton from "./Components/ConvertButton";

const JpgToPdfPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="flex flex-col gap-6">
      <FileUpload onFilesSelected={setFiles} />
      <ConvertButton files={files} />
    </div>
  );
};

export default JpgToPdfPage;
