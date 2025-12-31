import React, { useState } from "react";
import SplitComponent from "./components/Split";
import Download from "./components/Download";
import { Container, PageCard, FileUploadStyled } from "../UI";
import { FaCut } from "react-icons/fa";

const SplitPdfPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitBlob, setSplitBlob] = useState<Blob | null>(null);

  return (
    <Container>
      <PageCard
        title="Split PDF"
        icon={<FaCut />}
      >
        <div className="flex flex-col gap-6 items-center w-full">
          <FileUploadStyled onFilesSelected={(f) => { setFile(f[0]); setSplitBlob(null); }} />
          {file && <SplitComponent file={file} onSplit={setSplitBlob} />}
          {splitBlob && <Download pages={splitBlob} />}
        </div>
      </PageCard>
    </Container>
  );
};

export default SplitPdfPage;
