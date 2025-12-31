import React from "react";
import { FaListOl } from "react-icons/fa";
import { Container, PageCard } from "../UI";
import FileUpload from "./components/file";
import PageNumberSettings from "./components/number";
import AddPageNumbersButton from "./components/btn";

interface PageNumbersPageProps { }

const PageNumbersPage: React.FC<PageNumbersPageProps> = () => {
    const [pdfFile, setPdfFile] = React.useState<File | null>(null);
    const [position, setPosition] = React.useState<string>("bottom-right");
    const [fontSize, setFontSize] = React.useState<number>(12);
    const [startPage, setStartPage] = React.useState<number>(1);
    const [endPage, setEndPage] = React.useState<number>(1);

    return (
        <Container>
            <PageCard title="Add Page Numbers" icon={<FaListOl />}>
                <FileUpload onFileSelect={setPdfFile} />
                {pdfFile && <p className="text-sm text-gray-600 mt-2 text-center bg-gray-50 py-1 rounded">Selected: {pdfFile.name}</p>}
                <div className="mt-6">
                    <PageNumberSettings
                        position={position}
                        setPosition={setPosition}
                        fontSize={fontSize}
                        setFontSize={setFontSize}
                        startPage={startPage}
                        setStartPage={setStartPage}
                        endPage={endPage}
                        setEndPage={setEndPage}
                    />
                </div>
                <div className="mt-6 flex justify-center">
                    <AddPageNumbersButton
                        pdfFile={pdfFile}
                        position={position}
                        fontSize={fontSize}
                        startPage={startPage}
                        endPage={endPage}
                    />
                </div>
            </PageCard>
        </Container>
    );
};

export default PageNumbersPage;
