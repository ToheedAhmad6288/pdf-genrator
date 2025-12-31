import React, { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { saveAs } from "file-saver";
import { FaSyncAlt } from "react-icons/fa";
import { Container, Button, PageCard, FileUploadStyled } from "../UI";
import RotateControls from "./components/Control";

interface RotatePdfPageProps { }

const RotatePdfPage: React.FC<RotatePdfPageProps> = () => {
    const [rotateFile, setRotateFile] = useState<File | null>(null);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [rotations, setRotations] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const handleRotateFile = async (file: File) => {
        setRotateFile(file);
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setTotalPages(pdfDoc.getPages().length);
        setRotations(Array(pdfDoc.getPages().length).fill(0));
    };

    const handleRotate = (index: number, direction: "left" | "right") => {
        setRotations((prev) =>
            prev.map((r, i) =>
                i === index
                    ? direction === "left"
                        ? (r - 90 + 360) % 360
                        : (r + 90) % 360
                    : r
            )
        );
    };

    const handleRotateDownload = async () => {
        if (!rotateFile) return alert("Upload a PDF first!");
        setLoading(true);
        const arrayBuffer = await rotateFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        pdfDoc.getPages().forEach((page, i) => {
            page.setRotation(degrees(rotations[i]));
        });
        const pdfBytes = await pdfDoc.save();
        saveAs(
            new Blob([pdfBytes as BlobPart], { type: "application/pdf" }),
            "rotated.pdf"
        );
        setLoading(false);
    };

    const [showRotatePopup, setShowRotatePopup] = useState(false);

    return (
        <Container>
            <PageCard title="Rotate PDF" icon={<FaSyncAlt />}>
                <FileUploadStyled onFilesSelected={(f) => handleRotateFile(f[0])} />
                {rotateFile && (
                    <div className="animate-fadeIn mt-4">
                        <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between mb-4">
                            <span className="font-medium text-blue-900">Selected File: {rotateFile.name}</span>
                            <span className="text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded">Pages: {totalPages}</span>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="secondary"
                                onClick={() => setShowRotatePopup(true)}
                                icon={<FaSyncAlt />}
                            >
                                Rotate Pages
                            </Button>
                            {showRotatePopup && (
                                <RotateControls
                                    totalPages={totalPages}
                                    rotations={rotations}
                                    onRotate={handleRotate}
                                    onClose={() => setShowRotatePopup(false)}
                                />
                            )}
                            <Button
                                onClick={handleRotateDownload}
                                disabled={loading}
                                loading={loading}
                                variant="primary"
                            >
                                Download Rotated PDF
                            </Button>
                        </div>
                    </div>
                )}
            </PageCard>
        </Container>
    );
};

export default RotatePdfPage;
