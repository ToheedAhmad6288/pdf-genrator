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
import FeaturesGrid from "./components/FeaturesGrid";
import About from "./components/About";
// --- PDF.js WORKER SETUP (v3.x) ---
import * as pdfjsLib from "pdfjs-dist";

// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
// --- UI COMPONENTS ---
import {
  Container,
  Section,
  Heading,
  Text,
  Button,
  Input,
} from "./components/UI";
import {
  FileUploadStyled,
  Modal,
} from "./components/UIComponents";

import Navbar from "./components/Navbar";
// --- PAGE COMPONENTS ---

// -------------------------------------------
// ------------ MAIN APP COMPONENT -----------
// -------------------------------------------

// -------------------------------------------
// ------------ HELPER COMPONENTS ------------
// -------------------------------------------



const PageCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <div className="animate-fade-in-up w-full max-w-7xl mx-auto">
    {/* Page Header */}
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3.5 bg-white shadow-md rounded-2xl text-primary-600 text-2xl border border-gray-100">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
        <p className="text-gray-500 text-sm font-medium mt-1">Professional PDF Tool</p>
      </div>
    </div>

    {/* Content Area */}
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 rounded-full blur-3xl -z-10" />
      {children}
    </div>
  </div>
);



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
    | "features"
    | "about"
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
  const [selectedPages, setSelectedPages] = useState<string>("");

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

  // -------------------------------------------
  // ------------- HANDLERS ---------------------
  // -------------------------------------------


  return (
    <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden font-sans selection:bg-primary-100 selection:text-primary-900">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-purple-50/40 to-white/0 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-100/40 via-amber-50/40 to-white/0 pointer-events-none -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-200/20 rounded-full blur-[120px] -z-10 mix-blend-multiply animate-pulse-slow" />

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none -z-10 brightness-100 contrast-150" />

      <Navbar onNavigate={(page) => setCurrentPage(page as any)} />

      <main className="pt-0 pb-8 sm:pt-4 sm:pb-12 md:pt-8 md:pb-16 relative z-10">
        {currentPage === "home" ? (
          <>
            {/* Hero Section */}
            <Section className="!pt-4 !pb-10 sm:!pt-12 sm:!pb-16 text-center relative pointer-events-none">
              <div className="pointer-events-auto relative z-10">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-white/50 animate-fadeIn">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold tracking-wide uppercase text-gray-600">
                    Free & Secure PDF Tools
                  </span>
                </div>

                <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                  Master your <br />
                  <span className="bg-gradient-to-r from-primary-600 via-violet-600 to-secondary-500 bg-clip-text text-transparent pb-1">
                    Documents
                  </span>
                </h1>

                <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
                  All the tools you need to manage your PDFs in one place.
                  Simple, fast, and completely free.
                </p>
              </div>
            </Section>

            {/* Main Grid */}
            <FeaturesGrid setCurrentPage={setCurrentPage} />
          </>
        ) : currentPage === "features" ? (
          <div className="animate-fade-in-up">
            <Container maxWidth="7xl">
              <div className="text-center mb-12 pt-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">All Tools & Features</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Explore our comprehensive suite of PDF tools designed to help you manage documents efficiently.</p>
              </div>
            </Container>
            <FeaturesGrid setCurrentPage={setCurrentPage} />
          </div>
        ) : currentPage === "about" ? (
          <About onNavigateHome={() => setCurrentPage("home")} />
        ) : (
          <>
            {/* Page Header with Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 animate-fadeIn pt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage("home")}
                icon={
                  <svg
                    className="w-4 h-4"
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
                }
              >
                Back to Tools
              </Button>
            </div>

            {/* Service Pages */}
            <div key={currentPage} className="animate-fade-in-up">
              {currentPage === "jpg-pdf" && (
                <Container>
                  <PageCard
                    title="JPG → PDF"
                    icon={<FaFileImage />}
                  >
                    <JpgPdfPage />
                  </PageCard>
                </Container>
              )}
              {currentPage === "merge" && (
                <Container>
                  <PageCard
                    title="Merge PDFs"
                    icon={<FaFilePdf />}
                  >
                    <FileUpload4 onFilesSelected={setMergeFiles} />
                    <MergeButton1 files={mergeFiles} />
                  </PageCard>
                </Container>
              )}

              {currentPage === "compress" && (
                <Container>
                  <PageCard title="Compress PDF" icon={<FaCompress />}>
                    <CompressPdfPage />
                  </PageCard>
                </Container>
              )}
              {currentPage === "split" && (
                <Container>
                  <PageCard
                    title="Split PDF"
                    icon={<FaCut />}
                  >
                    {/* Upload File */}
                    <div className="space-y-6">
                      <Input
                        type="file"
                        label="Upload PDF"
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
                      />

                      {/* Show Uploaded File */}
                      {uploadFile.length > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-800">
                          <p className="font-medium">Selected File: {uploadFile[0].name}</p>
                          {totalPages > 0 && (
                            <p className="text-sm mt-1">Total Pages: <b>{totalPages}</b></p>
                          )}
                        </div>
                      )}

                      {/* Page Selection */}
                      {totalPages > 0 && (
                        <Input
                          type="text"
                          label="Select Pages to Extract"
                          placeholder="e.g. 1,2,5 or 3-7"
                          onChange={(e) => setSelectedPages(e.target.value)}
                          helperText="Enter page numbers (e.g., 1, 5) or ranges (e.g., 2-4)"
                        />
                      )}

                      {/* Download Button */}
                      <div className="pt-2">
                        <Button
                          fullWidth
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
                              new Blob([pdfBytes as any], { type: "application/pdf" }),
                              "extracted_pages.pdf"
                            );
                          }}
                          className="bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 shadow-orange-200 text-white"
                        >
                          Download Selected Pages
                        </Button>
                      </div>
                    </div>
                  </PageCard>
                </Container>
              )}

              {currentPage === "rotate" && (
                <Container>
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
                </Container>
              )}
              {currentPage === "html-pdf" && (
                <Container>
                  <HtmlToPdfPage
                    onBack={() => setCurrentPage("home")}
                    htmlContent={htmlContent}
                    setHtmlContent={setHtmlContent}
                  />
                </Container>
              )}
              {currentPage === "watermark" && (
                <Container>
                  <WatermarkPdfPage
                    onBack={() => setCurrentPage("home")}
                    watermarkFile={watermarkFile}
                    setWatermarkFile={setWatermarkFile}
                    watermarkOptions={watermarkOptions}
                    setWatermarkOptions={setWatermarkOptions}
                  />
                </Container>
              )}
              {currentPage === "page-numbers" && (
                <Container>
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
                </Container>
              )}
              {currentPage === "compare" && (
                <Container>
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
                </Container>
              )}
              {currentPage === "extract-text" && (
                <Container>
                  <ExtractTextPage
                    onBack={() => setCurrentPage("home")}
                    extractFile={extractFile}
                    setExtractFile={setExtractFile}
                  />
                </Container>
              )}
            </div>
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

// HTML to PDF Page
const HtmlToPdfPage: React.FC<{
  onBack: () => void;
  htmlContent: string;
  setHtmlContent: React.Dispatch<React.SetStateAction<string>>;
}> = ({ htmlContent, setHtmlContent }) => (
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
                <PreviewPDF file={watermarkFile} watermark={watermarkOptions} />
              </div>
              <div className="w-full md:w-1/3 p-6 border-l bg-white overflow-auto">
                <Heading level={4} className="mb-6">Watermark Settings</Heading>
                <WatermarkControls
                  options={watermarkOptions}
                  onChange={setWatermarkOptions}
                />
                <div className="mt-8 text-center">
                  <DownloadButton
                    file={watermarkFile}
                    watermark={watermarkOptions}
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
      </Container>
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

// Extract Text Page
const ExtractTextPage: React.FC<{
  onBack: () => void;
  extractFile: File | null;
  setExtractFile: React.Dispatch<React.SetStateAction<File | null>>;
}> = ({ extractFile, setExtractFile }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <PageCard title="Extract Text - Upload and Extract" icon={<FaFileImage />}>
      <TextFileUpload file={extractFile} onFileChange={setExtractFile} />
      <TextExtractor file={extractFile} />
    </PageCard>
  </div>
);

export default App;
