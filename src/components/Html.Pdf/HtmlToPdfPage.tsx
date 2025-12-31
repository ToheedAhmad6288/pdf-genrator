import React from "react";
import { FaCode } from "react-icons/fa";
import { Container, Heading, PageCard, FileUploadStyled } from "../UI";
import HtmlPreview from "./components/preview";
import HtmlDownloadButton from "./components/Button";

interface HtmlToPdfPageProps { }

const HtmlToPdfPage: React.FC<HtmlToPdfPageProps> = () => {
    const [htmlContent, setHtmlContent] = React.useState<string>("");

    return (
        <Container>
            <PageCard title="HTML → PDF" icon={<FaCode />}>
                <FileUploadStyled
                    onFilesSelected={async (f) => setHtmlContent(await f[0].text())}
                />
                {htmlContent ? (
                    <div className="mt-6 animate-fadeIn">
                        <Heading level={4} className="mb-2">Preview</Heading>
                        <div className="max-h-60 overflow-auto border rounded-xl p-4 bg-gray-50 mb-4 shadow-inner">
                            <HtmlPreview htmlContent={htmlContent} />
                        </div>
                        <HtmlDownloadButton targetId="preview-content" />
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        Upload an HTML file to see a preview and download as PDF.
                    </div>
                )}
            </PageCard>
        </Container>
    );
};

export default HtmlToPdfPage;
