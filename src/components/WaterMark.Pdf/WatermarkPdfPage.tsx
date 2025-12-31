import React, { useState } from "react";
import { FaWater } from "react-icons/fa";
import { Container, Heading, Text, PageCard, FileUploadStyled, Modal } from "../UI";
import WatermarkControls from "./components/Watermark";
import PreviewPDF from "./components/View";
import DownloadButton from "./components/Download";

interface WatermarkPdfPageProps { }

const WatermarkPdfPage: React.FC<WatermarkPdfPageProps> = () => {
    const [watermarkFile, setWatermarkFile] = useState<File | null>(null);
    const [watermarkOptions, setWatermarkOptions] = useState({
        text: "Watermark",
        fontSize: 30,
        color: "#000000",
        opacity: 0.3,
        position: "center" as
            | "top-left"
            | "top-right"
            | "center"
            | "bottom-left"
            | "bottom-right"
            | "diagonal"
            | "anti-diagonal",
    });
    const [showWatermarkPopup, setShowWatermarkPopup] = useState(false);

    return (
        <Container>
            <PageCard title="Watermark PDF" icon={<FaWater />}>
                <FileUploadStyled
                    onFilesSelected={(f) => {
                        setWatermarkFile(f[0]);
                        setShowWatermarkPopup(true);
                    }}
                />
                <Text color="muted" size="sm" className="mt-4 text-center">
                    Upload a PDF to add a custom watermark.
                </Text>
            </PageCard>

            {showWatermarkPopup && watermarkFile && (
                <Modal onClose={() => setShowWatermarkPopup(false)}>
                    <div className="flex flex-col md:flex-row h-[80vh]">
                        <div className="w-full md:w-2/3 p-6 bg-gray-100 overflow-auto">
                            <Heading level={4} className="mb-4">PDF Preview</Heading>
                            <PreviewPDF file={watermarkFile} watermark={watermarkOptions as any} />
                        </div>
                        <div className="w-full md:w-1/3 p-6 border-l bg-white overflow-auto">
                            <Heading level={4} className="mb-6">Watermark Settings</Heading>
                            <WatermarkControls
                                options={watermarkOptions as any}
                                onChange={setWatermarkOptions}
                            />
                            <div className="mt-8 text-center">
                                <DownloadButton
                                    file={watermarkFile}
                                    watermark={watermarkOptions as any}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </Container>
    );
};

export default WatermarkPdfPage;
