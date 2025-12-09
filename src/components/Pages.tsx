import React, { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { saveAs } from "file-saver";
import {
  FaFileImage,
  FaFilePdf,
  FaCode,
  FaWater,
  FaSyncAlt,
  FaCut,
  FaListOl,
  FaExchangeAlt,
} from "react-icons/fa";

// --- COMPONENT IMPORTS ---
import FileUpload1 from "./DoublePdf/components/FileUpload1";
import ConvertButton from "./JPG.PDF/components/ConvertBUtton";
import ImagePreview from "./JPG.PDF/components/ImagePreview";
import MergeButton from "./DoublePdf/components/MergeButton";
import SplitComponent from "./SPLIT.PDF/components/Split";
import Download from "./SPLIT.PDF/components/Download";
import RotateControls from "./Rotate/components/Control";
import HtmlPreview from "./Html.Pdf/components/preview";
import HtmlDownloadButton from "./Html.Pdf/components/Button";
import WatermarkControls from "./WaterMark.Pdf/components/Watermark";
import PreviewPDF from "./WaterMark.Pdf/components/View";
import DownloadButton from "./WaterMark.Pdf/components/Download";
import FileUpload from "./Number.Pdf/components/file";
import PageNumberSettings from "./Number.Pdf/components/number";
import AddPageNumbersButton from "./Number.Pdf/components/btn";
import Comparison from "./Pdf.Compare/components/Comparison";
import TextFileUpload from "./ExtractText/components/FileUpload";
import TextExtractor from "./ExtractText/components/TextExtractor";

// --- UTILITY COMPONENTS ---
import Card from "./UIComponents/Card";
import FileUploadStyled from "./UIComponents/FileUploadStyled";
import Modal from "./UIComponents/Modal";

// --- UTILITY FUNCTIONS ---
import {
  extractTextFromPdf,
} from "../utils/pdfExtraction";

// JPG to PDF Page
export const JPGToPdfPage: React.FC<{
  onBack: () => void;
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  handleRemove: (index: number) => void;
  handleFilesSelected: (newFiles: File[]) => void;
}> = ({ images, handleRemove, handleFilesSelected }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Card title="JPG → PDF - Upload and Convert" icon={<FaFileImage />}>
      <FileUploadStyled onFilesSelected={handleFilesSelected} />
      <ImagePreview images={images} onRemove={handleRemove} />
      <ConvertButton images={images} />
    </Card>
  </div>
);

// Merge PDFs Page
export const MergePdfsPage: React.FC<{
  onBack: () => void;
  pdfFiles: File[];
  setPdfFiles: React.Dispatch<React.SetStateAction<File[]>>;
}> = ({ pdfFiles, setPdfFiles }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Card title="Merge PDFs - Upload and Merge" icon={<FaFilePdf />}>
      <FileUploadStyled onFilesSelected={setPdfFiles} />
      <MergeButton files={pdfFiles} />
    </Card>
  </div>
);

// Split PDF Page
export const SplitPdfPage: React.FC<{
  onBack: () => void;
  splitFile: File | null;
  setSplitFile: React.Dispatch<React.SetStateAction<File | null>>;
  splitPdfBlob: Blob | null;
  setSplitPdfBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
}> = ({ splitFile, setSplitFile, splitPdfBlob, setSplitPdfBlob }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Card title="Split PDF - Upload and Split" icon={<FaCut />}>
      <FileUploadStyled onFilesSelected={(f) => setSplitFile(f[0])} />
      {splitFile && <SplitComponent file={splitFile} onSplit={setSplitPdfBlob} />}
      {splitPdfBlob && <Download pdf={splitPdfBlob} />}
    </Card>
  </div>
);

// Rotate PDF Page
export const RotatePdfPage: React.FC<{
  onBack: () => void;
  rotateFile: File | null;
  setRotateFile: React.Dispatch<React.SetStateAction<File | null>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  rotations: number[];
  setRotations: React.Dispatch<React.SetStateAction<number[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  rotateFile,
  setRotateFile,
  totalPages,
  setTotalPages,
  rotations,
  setRotations,
  loading,
  setLoading,
}) => {
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
        i === index ? (direction === "left" ? (r - 90 + 360) % 360 : (r + 90) % 360) : r
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
    saveAs(new Blob([pdfBytes as BlobPart]), "rotated.pdf");

    setLoading(false);
  };

  const [showRotatePopup, setShowRotatePopup] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card title="Rotate PDF - Upload and Rotate" icon={<FaSyncAlt />}>
        <FileUploadStyled onFilesSelected={(f) => handleRotateFile(f[0])} />
        {rotateFile && (
          <>
            <p className="text-gray-600 mt-2">Pages: {totalPages}</p>
            <button
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              onClick={() => setShowRotatePopup(true)}
            >
              Open Rotate Controls
            </button>
            {showRotatePopup && (
              <RotateControls
                totalPages={totalPages}
                rotations={rotations}
                onRotate={handleRotate}
                onClose={() => setShowRotatePopup(false)}
              />
            )}
            <button
              onClick={handleRotateDownload}
              disabled={loading}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? "Processing..." : "Download Rotated PDF"}
            </button>
          </>
        )}
      </Card>
    </div>
  );
};

// HTML to PDF Page
export const HtmlToPdfPage: React.FC<{
  onBack: () => void;
  htmlContent: string;
  setHtmlContent: React.Dispatch<React.SetStateAction<string>>;
}> = ({ htmlContent, setHtmlContent }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Card title="HTML → PDF - Upload and Convert" icon={<FaCode />}>
      <FileUploadStyled onFilesSelected={async (f) => setHtmlContent(await f[0].text())} />
      {htmlContent ? (
        <>
          <div className="max-h-40 overflow-auto border p-2 bg-gray-50 mt-2">
            <HtmlPreview htmlContent={htmlContent} />
          </div>
          <HtmlDownloadButton targetId="preview-content" />
        </>
      ) : (
        <p className="text-sm text-gray-500 mt-4">Upload an HTML file to preview & convert.</p>
      )}
    </Card>
  </div>
);

// Watermark PDF Page
export const WatermarkPdfPage: React.FC<{
  onBack: () => void;
  watermarkFile: File | null;
  setWatermarkFile: React.Dispatch<React.SetStateAction<File | null>>;
  watermarkOptions: any;
  setWatermarkOptions: React.Dispatch<React.SetStateAction<any>>;
}> = ({ watermarkFile, setWatermarkFile, watermarkOptions, setWatermarkOptions }) => {
  const [showWatermarkPopup, setShowWatermarkPopup] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card title="PDF Watermark - Upload and Add Watermark" icon={<FaWater />}>
        <FileUploadStyled
          onFilesSelected={(f) => {
            setWatermarkFile(f[0]);
            setShowWatermarkPopup(true);
          }}
        />
      </Card>

      {showWatermarkPopup && watermarkFile && (
        <Modal onClose={() => setShowWatermarkPopup(false)}>
          <div className="flex h-full">
            <div className="w-2/3 p-4 bg-gray-100 overflow-auto">
              <h3 className="font-bold mb-4">PDF Preview</h3>
              <PreviewPDF file={watermarkFile} watermark={watermarkOptions} />
            </div>
            <div className="w-1/3 p-4 border-l overflow-auto">
              <h3 className="font-bold mb-4">Watermark Settings</h3>
              <WatermarkControls options={watermarkOptions} onChange={setWatermarkOptions} />
              <div className="mt-4 text-center">
                <DownloadButton file={watermarkFile} watermark={watermarkOptions} />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Page Numbers Page
export const PageNumbersPage: React.FC<{
  onBack: () => void;
  pdfFile: File | null;
  setPdfFile: React.Dispatch<React.SetStateAction<File | null>>;
  position: string;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  startPage: number;
  setStartPage: React.Dispatch<React.SetStateAction<number>>;
  endPage: number;
  setEndPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  pdfFile,
  setPdfFile,
  position,
  setPosition,
  fontSize,
  setFontSize,
  startPage,
  setStartPage,
  endPage,
  setEndPage,
}) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Card title="Add Page Numbers - Upload and Configure" icon={<FaListOl />}>
      <FileUpload onFileSelect={setPdfFile} />
      {pdfFile && <p className="text-sm text-gray-600">{pdfFile.name}</p>}
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
      <AddPageNumbersButton
        pdfFile={pdfFile}
        position={position}
        fontSize={fontSize}
        startPage={startPage}
        endPage={endPage}
      />
    </Card>
  </div>
);

// Compare PDFs Page
export const ComparePdfsPage: React.FC<{
  onBack: () => void;
  oldPdf: File | null;
  setOldPdf: React.Dispatch<React.SetStateAction<File | null>>;
  newPdf: File | null;
  setNewPdf: React.Dispatch<React.SetStateAction<File | null>>;
  oldText: string;
  setOldText: React.Dispatch<React.SetStateAction<string>>;
  newText: string;
  setNewText: React.Dispatch<React.SetStateAction<string>>;
  showComparePopup: boolean;
  setShowComparePopup: React.Dispatch<React.SetStateAction<boolean>>;
  ocrLoading: boolean;
  setOcrLoading: React.Dispatch<React.SetStateAction<boolean>>;
  ocrError: string | null;
  setOcrError: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({
  oldPdf,
  setOldPdf,
  newPdf,
  setNewPdf,
  oldText,
  setOldText,
  newText,
  setNewText,
  showComparePopup,
  setShowComparePopup,
  ocrLoading,
  ocrError,
}) => {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card title="Compare PDFs - Upload and Compare" icon={<FaExchangeAlt />}>
        <FileUploadStyled onFilesSelected={(f) => setOldPdf(f[0])} />
        <FileUploadStyled onFilesSelected={(f) => setNewPdf(f[0])} />
        <button
          onClick={handleCompare}
          disabled={!oldPdf || !newPdf}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          Compare Files
        </button>
      </Card>

      <Comparison
        oldFile={oldPdf}
        newFile={newPdf}
        oldText={oldText}
        newText={newText}
        showPopup={showComparePopup}
        onClose={() => setShowComparePopup(false)}
        onRunOcr={async () => {}}
        ocrLoading={ocrLoading}
        ocrError={ocrError}
      />
    </div>
  );
};

// Extract Text Page
export const ExtractTextPage: React.FC<{
  onBack: () => void;
  extractFile: File | null;
  setExtractFile: React.Dispatch<React.SetStateAction<File | null>>;
}> = ({ extractFile, setExtractFile }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Card title="Extract Text - Upload and Extract" icon={<FaFileImage />}>
      <TextFileUpload file={extractFile} onFileChange={setExtractFile} />
      <TextExtractor file={extractFile} />
    </Card>
  </div>
);
