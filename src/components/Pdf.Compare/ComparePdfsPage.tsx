import React from "react";
import * as pdfjsLib from "pdfjs-dist";
import { FaExchangeAlt } from "react-icons/fa";
import { Container, Button, PageCard, FileUploadStyled } from "../UI";
import Comparison from "./components/Comparison";

interface ComparePdfsPageProps { }

const ComparePdfsPage: React.FC<ComparePdfsPageProps> = () => {
    const [oldPdf, setOldPdf] = React.useState<File | null>(null);
    const [newPdf, setNewPdf] = React.useState<File | null>(null);
    const [oldText, setOldText] = React.useState("");
    const [newText, setNewText] = React.useState("");
    const [showComparePopup, setShowComparePopup] = React.useState(false);
    const [ocrLoading, setOcrLoading] = React.useState(false);
    const [ocrError, setOcrError] = React.useState<string | null>(null);
    const extractTextFromPdf = async (file: File): Promise<string> => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let text = "";
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const strings = content.items.map((it: any) => it.str || "");
                const pageText = strings.join(" ");
                text += pageText + "\n";
            }
            return text.trim();
        } catch (error) {
            console.error("Error extracting PDF text:", error);
            return "";
        }
    };

    const handleCompare = async () => {
        if (!oldPdf || !newPdf) {
            alert("Please upload both PDFs!");
            return;
        }
        try {
            const oldTxt = await extractTextFromPdf(oldPdf);
            const newTxt = await extractTextFromPdf(newPdf);
            setOldText(oldTxt);
            setNewText(newTxt);
            setShowComparePopup(true);
        } catch (error) {
            console.error("Error during comparison:", error);
            alert("Error comparing PDFs. Check console for details.");
        }
    };

    return (
        <Container>
            <PageCard title="Compare PDFs" icon={<FaExchangeAlt />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Original PDF</label>
                        <FileUploadStyled onFilesSelected={(f) => setOldPdf(f[0])} />
                        {oldPdf && <p className="text-xs text-green-600">✓ {oldPdf.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">New PDF</label>
                        <FileUploadStyled onFilesSelected={(f) => setNewPdf(f[0])} />
                        {newPdf && <p className="text-xs text-green-600">✓ {newPdf.name}</p>}
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <Button
                        onClick={handleCompare}
                        disabled={!oldPdf || !newPdf}
                        variant="primary"
                        size="lg"
                    >
                        Compare Files
                    </Button>
                </div>
            </PageCard>

            <Comparison
                oldFile={oldPdf}
                newFile={newPdf}
                oldText={oldText}
                newText={newText}
                showPopup={showComparePopup}
                onClose={() => setShowComparePopup(false)}
                onRunOcr={async () => { }}
                ocrLoading={ocrLoading}
                ocrError={ocrError}
            />
        </Container>
    );
};

export default ComparePdfsPage;
