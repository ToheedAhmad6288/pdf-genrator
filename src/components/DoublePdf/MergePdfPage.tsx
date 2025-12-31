import React, { useState } from "react";
import { Container, PageCard } from "../UI";
import FileUpload4 from "./components/FileUpload1";
import MergeButton1 from "./components/MergeButton";
import { FaFilePdf } from "react-icons/fa";

interface MergePdfPageProps { }

const MergePdfPage: React.FC<MergePdfPageProps> = () => {
    const [mergeFiles, setMergeFiles] = useState<File[]>([]);

    return (
        <Container>
            <PageCard title="Merge PDFs" icon={<FaFilePdf />}>
                <FileUpload4 onFilesSelected={setMergeFiles} />
                <MergeButton1 files={mergeFiles} />
            </PageCard>
        </Container>
    );
};

export default MergePdfPage;
