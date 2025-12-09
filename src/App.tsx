// App.tsx
import React, { useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import { saveAs } from "file-saver";
import {
  FaFileImage,
  FaFilePdf,
  FaCompress,
  FaCode,
  FaWater,
  FaSyncAlt,
  FaCut,
  FaListOl,
  FaExchangeAlt,
} from "react-icons/fa";

// --- COMPONENT IMPORTS ---
import RotateControls from "./components/Rotate/components/Control";
import HtmlPreview from "./components/Html.Pdf/components/preview";
import HtmlDownloadButton from "./components/Html.Pdf/components/Button";
import WatermarkControls from "./components/WaterMark.Pdf/components/Watermark";
import PreviewPDF from "./components/WaterMark.Pdf/components/View";
import DownloadButton from "./components/WaterMark.Pdf/components/Download";
import FileUpload from "./components/Number.Pdf/components/file";
import PageNumberSettings from "./components/Number.Pdf/components/number";
import AddPageNumbersButton from "./components/Number.Pdf/components/btn";
import Comparison from "./components/Pdf.Compare/components/Comparison";
import TextFileUpload from "./components/ExtractText/components/FileUpload";
import TextExtractor from "./components/ExtractText/components/TextExtractor";
import CompressPdfPage from "./components/CompressPdf/CompressPdfPage";
import JpgPdfPage from "./components/JPG.PDF/JpgPdfPage";
import "./App.css";
import FileUpload4 from "./components/DoublePdf/components/FileUpload1";
import MergeButton1 from "./components/DoublePdf/components/MergeButton";
// --- PDF.js WORKER SETUP (v3.x) ---
import * as pdfjsLib from "pdfjs-dist";

// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
// --- UI COMPONENTS ---
import {
  Card,
  ClickableCard,
  FileUploadStyled,
  Modal,
} from "./components/UIComponents";
import Navbar from "./components/Navbar";
import Upload from "./components/SPLIT.PDF/components/Upload";
import Download from "./components/SPLIT.PDF/components/Download";
import SplitComponent from "./components/SPLIT.PDF/components/Split";

// --- PAGE COMPONENTS ---

// -------------------------------------------
// ------------ MAIN APP COMPONENT -----------
// -------------------------------------------

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "jpg-pdf"
    | "merge"
    | "compress"
    | "split"
    | "rotate"
    | "html-pdf"
    | "watermark"
    | "page-numbers"
    | "compare"
    | "extract-text"
  >("home");
  //Merge
  // Merge PDF state
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  // Rotate
  const [rotateFile, setRotateFile] = useState<File | null>(null);
  const [rotations, setRotations] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  //split
  // Split PDF state
  const [uploadFile, setUploadFile] = useState<File[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedPages] = useState();

  // HTML → PDF
  const [htmlContent, setHtmlContent] = useState<string>("");

  // Watermark
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
      | "bottom-right",
  });

  // Page Numbering
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [position, setPosition] = useState<string>("bottom-right");
  const [fontSize, setFontSize] = useState<number>(12);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(1);

  // PDF Compare
  const [oldPdf, setOldPdf] = useState<File | null>(null);
  const [newPdf, setNewPdf] = useState<File | null>(null);
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [showComparePopup, setShowComparePopup] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);

  // Extract Text
  const [extractFile, setExtractFile] = useState<File | null>(null);

  function setSelectedPages(value: string): void {
    throw new Error("Function not implemented.");
  }

  // -------------------------------------------
  // ------------- HANDLERS ---------------------
  // -------------------------------------------


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed top-0 right-0 -z-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <Navbar />

      <main className="py-8 sm:py-12 md:py-16 relative z-10">
        {currentPage === "home" ? (
          <>
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50">
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ✨ Modern PDF Tools Suite
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-3 slide-in-down">
                PDF{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Converter Suite
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto">
                Powerful and elegant PDF tools for every need - compress, merge,
                split, rotate, and more
              </p>
            </div>

            {/* Main Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {/* JPG → PDF Card - Clickable */}
                <ClickableCard
                  title="JPG → PDF"
                  icon={<FaFileImage />}
                  onClick={() => setCurrentPage("jpg-pdf")}
                />

                {/* Merge PDFs Card - Clickable */}
                <ClickableCard
                  title="Merge PDFs"
                  icon={<FaFilePdf />}
                  onClick={() => setCurrentPage("merge")}
                />

                {/* Compress PDF Card - Clickable */}
                <ClickableCard
                  title="Compress PDF"
                  icon={<FaCompress />}
                  onClick={() => setCurrentPage("compress")}
                />

                {/* Split PDF Card - Clickable */}
                <ClickableCard
                  title="Split PDF"
                  icon={<FaCut />}
                  onClick={() => setCurrentPage("split")}
                />

                {/* Rotate PDF Card - Clickable */}
                <ClickableCard
                  title="Rotate PDF"
                  icon={<FaSyncAlt />}
                  onClick={() => setCurrentPage("rotate")}
                />

                {/* HTML → PDF Card - Clickable */}
                <ClickableCard
                  title="HTML → PDF"
                  icon={<FaCode />}
                  onClick={() => setCurrentPage("html-pdf")}
                />

                {/* PDF Watermark Card - Clickable */}
                <ClickableCard
                  title="PDF Watermark"
                  icon={<FaWater />}
                  onClick={() => setCurrentPage("watermark")}
                />

                {/* Page Numbers Card - Clickable */}
                <ClickableCard
                  title="Add Page Numbers"
                  icon={<FaListOl />}
                  onClick={() => setCurrentPage("page-numbers")}
                />

                {/* Compare PDFs Card - Clickable */}
                <ClickableCard
                  title="Compare PDFs"
                  icon={<FaExchangeAlt />}
                  onClick={() => setCurrentPage("compare")}
                />

                {/* Extract Text Card - Clickable */}
                <ClickableCard
                  title="Extract Text"
                  icon={<FaFileImage />}
                  onClick={() => setCurrentPage("extract-text")}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Page Header with Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 animate-fadeIn">
              <button
                onClick={() => setCurrentPage("home")}
                className="flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Tools
              </button>
            </div>

            {/* Service Pages */}
            {currentPage === "jpg-pdf" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-container">
                <Card
                  title="JPG → PDF - Upload and Convert"
                  icon={<FaFileImage />}
                >
                  <JpgPdfPage />
                </Card>
              </div>
            )}
            {currentPage === "merge" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-container">
                <Card
                  title="Merge PDFs - Upload and Merge"
                  icon={<FaFilePdf />}
                >
                  <FileUpload4 onFilesSelected={setMergeFiles} />
                  <MergeButton1 files={mergeFiles} />
                </Card>
              </div>
            )}

            {currentPage === "compress" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-container">
                <CompressPdfPage onBack={() => setCurrentPage("home")} />
              </div>
            )}
            {currentPage === "split" && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-container">
                <Card
                  title="Split PDF - Upload & Extract Pages"
                  icon={<FaCut />}
                >
                  {/* Upload File */}
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={async (e) => {
                      if (!e.target.files || e.target.files.length === 0)
                        return;
                      const file = e.target.files[0];
                      setUploadFile([file]);

                      // Load pages count
                      const arrayBuffer = await file.arrayBuffer();
                      const pdf = await PDFDocument.load(arrayBuffer);
                      setTotalPages(pdf.getPageCount());
                    }}
                    className="w-full border p-3 rounded"
                  />

                  {/* Show Uploaded File */}
                  {uploadFile.length > 0 && (
                    <p className="mt-2 text-gray-700 font-medium">
                      Uploaded: {uploadFile[0].name}
                    </p>
                  )}

                  {/* Show Total Pages */}
                  {totalPages > 0 && (
                    <p className="mt-1 text-gray-600">
                      Total Pages in PDF: <b>{totalPages}</b>
                    </p>
                  )}

                  {/* Page Selection */}
                  {totalPages > 0 && (
                    <div className="mt-4">
                      <label className="font-semibold text-gray-700">
                        Select Pages
                      </label>

                      <input
                        type="text"
                        placeholder="Example: 1,2,5 or 3-7"
                        className="w-full p-2 border rounded mt-2"
                        onChange={(e) => setSelectedPages(e.target.value)}
                      />
                    </div>
                  )}

                  {/* Download Button */}
                  <button
                    onClick={async () => {
                      if (!uploadFile.length)
                        return alert("Upload a PDF first!");
                      if (!selectedPages) return alert("Enter pages to split!");

                      const file = uploadFile[0];
                      const arrayBuffer = await file.arrayBuffer();
                      const pdfDoc = await PDFDocument.load(arrayBuffer);

                      // New PDF
                      const newPdf = await PDFDocument.create();

                      // Parse pages
                      let pagesToExtract: number[] = [];

                      selectedPages.split(",").forEach((part) => {
                        if (part.includes("-")) {
                          const [start, end] = part.split("-").map(Number);
                          for (let p = start; p <= end; p++)
                            pagesToExtract.push(p);
                        } else {
                          pagesToExtract.push(Number(part));
                        }
                      });

                      // Remove invalid + duplicates
                      pagesToExtract = Array.from(
                        new Set(
                          pagesToExtract.filter(
                            (p) => p >= 1 && p <= totalPages
                          )
                        )
                      );

                      if (pagesToExtract.length === 0) {
                        return alert("No valid pages selected!");
                      }

                      // Copy pages into new PDF
                      const copied = await newPdf.copyPages(
                        pdfDoc,
                        pagesToExtract.map((p) => p - 1)
                      );
                      copied.forEach((page) => newPdf.addPage(page));

                      const pdfBytes = await newPdf.save();

                      saveAs(
                        new Blob([pdfBytes], { type: "application/pdf" }),
                        "extracted_pages.pdf"
                      );
                    }}
                    className="mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Download Selected Pages in One PDF
                  </button>
                </Card>
              </div>
            )}

            {currentPage === "rotate" && (
              <div className="page-container">
                <RotatePdfPage
                  onBack={() => setCurrentPage("home")}
                  rotateFile={rotateFile}
                  setRotateFile={setRotateFile}
                  totalPages={totalPages}
                  setTotalPages={setTotalPages}
                  rotations={rotations}
                  setRotations={setRotations}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            )}
            {currentPage === "html-pdf" && (
              <div className="page-container">
                <HtmlToPdfPage
                  onBack={() => setCurrentPage("home")}
                  htmlContent={htmlContent}
                  setHtmlContent={setHtmlContent}
                />
              </div>
            )}
            {currentPage === "watermark" && (
              <div className="page-container">
                <WatermarkPdfPage
                  onBack={() => setCurrentPage("home")}
                  watermarkFile={watermarkFile}
                  setWatermarkFile={setWatermarkFile}
                  watermarkOptions={watermarkOptions}
                  setWatermarkOptions={setWatermarkOptions}
                />
              </div>
            )}
            {currentPage === "page-numbers" && (
              <div className="page-container">
                <PageNumbersPage
                  onBack={() => setCurrentPage("home")}
                  pdfFile={pdfFile}
                  setPdfFile={setPdfFile}
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
            )}
            {currentPage === "compare" && (
              <div className="page-container">
                <ComparePdfsPage
                  onBack={() => setCurrentPage("home")}
                  oldPdf={oldPdf}
                  setOldPdf={setOldPdf}
                  newPdf={newPdf}
                  setNewPdf={setNewPdf}
                  oldText={oldText}
                  setOldText={setOldText}
                  newText={newText}
                  setNewText={setNewText}
                  showComparePopup={showComparePopup}
                  setShowComparePopup={setShowComparePopup}
                  ocrLoading={ocrLoading}
                  setOcrLoading={setOcrLoading}
                  ocrError={ocrError}
                  setOcrError={setOcrError}
                />
              </div>
            )}
            {currentPage === "extract-text" && (
              <div className="page-container">
                <ExtractTextPage
                  onBack={() => setCurrentPage("home")}
                  extractFile={extractFile}
                  setExtractFile={setExtractFile}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

// -------------------------------------------
const RotatePdfPage: React.FC<{
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
const HtmlToPdfPage: React.FC<{
  onBack: () => void;
  htmlContent: string;
  setHtmlContent: React.Dispatch<React.SetStateAction<string>>;
}> = ({ htmlContent, setHtmlContent }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Card title="HTML → PDF - Upload and Convert" icon={<FaCode />}>
      <FileUploadStyled
        onFilesSelected={async (f) => setHtmlContent(await f[0].text())}
      />
      {htmlContent ? (
        <>
          <div className="max-h-40 overflow-auto border p-2 bg-gray-50 mt-2">
            <HtmlPreview htmlContent={htmlContent} />
          </div>
          <HtmlDownloadButton targetId="preview-content" />
        </>
      ) : (
        <p className="text-sm text-gray-500 mt-4">
          Upload an HTML file to preview & convert.
        </p>
      )}
    </Card>
  </div>
);

// Watermark PDF Page
const WatermarkPdfPage: React.FC<{
  onBack: () => void;
  watermarkFile: File | null;
  setWatermarkFile: React.Dispatch<React.SetStateAction<File | null>>;
  watermarkOptions: any;
  setWatermarkOptions: React.Dispatch<React.SetStateAction<any>>;
}> = ({
  watermarkFile,
  setWatermarkFile,
  watermarkOptions,
  setWatermarkOptions,
}) => {
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
              <WatermarkControls
                options={watermarkOptions}
                onChange={setWatermarkOptions}
              />
              <div className="mt-4 text-center">
                <DownloadButton
                  file={watermarkFile}
                  watermark={watermarkOptions}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// Page Numbers Page
const PageNumbersPage: React.FC<{
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
const ComparePdfsPage: React.FC<{
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
const ExtractTextPage: React.FC<{
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

export default App;
