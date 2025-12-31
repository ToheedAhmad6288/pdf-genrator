import React from "react";
import { FaFileImage } from "react-icons/fa";
import { PageCard } from "../UI";
import TextFileUpload from "./components/FileUpload";
import TextExtractor from "./components/TextExtractor";

interface ExtractTextPageProps { }

const ExtractTextPage: React.FC<ExtractTextPageProps> = () => {
    const [extractFile, setExtractFile] = React.useState<File | null>(null);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageCard title="Extract Text" icon={<FaFileImage />}>
                <TextFileUpload file={extractFile} onFileChange={setExtractFile} />
                <TextExtractor file={extractFile} />
            </PageCard>
        </div>
    );
};

export default ExtractTextPage;
