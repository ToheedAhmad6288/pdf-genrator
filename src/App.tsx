// App.tsx
import React, { useState } from "react";

// --- COMPONENT IMPORTS ---
import CompressPdfPage from "./components/CompressPdf/CompressPdfPage";
import JpgPdfPage from "./components/JpgToPdf/JpgPdfPage";
import SplitPdfPage from "./components/SPLIT.PDF/SplitPdfPage";
import MergePdfPage from "./components/DoublePdf/MergePdfPage";
import FeaturesGrid from "./components/FeaturesGrid";
import About from "./components/About";
import Navbar from "./components/Navbar";

// --- TOOL PAGE COMPONENTS ---
import RotatePdfPage from "./components/Rotate/RotatePdfPage";
import HtmlToPdfPage from "./components/Html.Pdf/HtmlToPdfPage";
import WatermarkPdfPage from "./components/WaterMark.Pdf/WatermarkPdfPage";
import PageNumbersPage from "./components/Number.Pdf/PageNumbersPage";
import ComparePdfsPage from "./components/Pdf.Compare/ComparePdfsPage";
import ExtractTextPage from "./components/ExtractText/ExtractTextPage";

// --- UI COMPONENTS ---
import {
  Container,
  Section,
  Button,
} from "./components/UI";

import "./App.css";

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 animate-fadeIn pt-8 border-b border-gray-100 pb-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage("home")}
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                }
              >
                Back to Tools
              </Button>
            </div>

            <div key={currentPage} className="animate-fade-in-up">
              {currentPage === "jpg-pdf" && <JpgPdfPage />}
              {currentPage === "merge" && <MergePdfPage />}
              {currentPage === "compress" && (
                <Container>
                  <CompressPdfPage />
                </Container>
              )}
              {currentPage === "split" && (
                <Container>
                  <SplitPdfPage />
                </Container>
              )}
              {currentPage === "rotate" && <RotatePdfPage />}
              {currentPage === "html-pdf" && <HtmlToPdfPage />}
              {currentPage === "watermark" && <WatermarkPdfPage />}
              {currentPage === "page-numbers" && <PageNumbersPage />}
              {currentPage === "compare" && <ComparePdfsPage />}
              {currentPage === "extract-text" && <ExtractTextPage />}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

<<<<<<< HEAD
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

ompare PDFs Page
t ComparePdfsPage: React.FC < {
  ck: () => void;
  df: File | null;
  ldPdf: React.Dispatch<React.SetStateAction<File | null>>;
  df: File | null;
  ewPdf: React.Dispatch<React.SetStateAction<File | null>>;
  ext: string;
  ldText: React.Dispatch<React.SetStateAction<string>>;
  ext: string;
  ewText: React.Dispatch<React.SetStateAction<string>>;
  ComparePopup: boolean;
  howComparePopup: React.Dispatch<React.SetStateAction<boolean>>;
  oading: boolean;
  crLoading: React.Dispatch<React.SetStateAction<boolean>>;
  rror: string | null;
  crError: React.Dispatch<React.SetStateAction<string | null>>;
 ({
    df,
    ldPdf,
    df,
    ewPdf,
    ext,
    ldText,
    ext,
    ewText,
    ComparePopup,
    howComparePopup,
    oading,
    rror,
> {
    t extractTextFromPdf = async (file: File): Promise<string> => {
      {
        t arrayBuffer = await file.arrayBuffer();
        t pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        text = "";
        (let i = 1; i <= pdf.numPages; i++) {
          t page = await pdf.getPage(i);
          t content = await page.getTextContent();
          t strings = content.items.map((it: any) => it.str || "");
          t pageText = strings.join(" ");
           += pageText + "\n";
        
        rn text.trim();
  tch(error) {
    ole.error("Error extracting PDF text:", error);
        rn "";
      
    

    t handleCompare = async () => {
      !oldPdf || !newPdf) {
        t("Please upload both PDFs!");
        rn;

        {
        t oldTxt = await extractTextFromPdf(oldPdf);
        t newTxt = await extractTextFromPdf(newPdf);
          ldText(oldTxt);
          ewText(newTxt);
          howComparePopup(true);
          tch(error) {
            ole.error("Error during comparison:", error);
            t("Error comparing PDFs. Check console for details.");



            rn(
              tainer >
              eCard title = "Compare PDFs" icon = {< FaExchangeAlt />}>
                className="grid grid-cols-1 md:grid-cols-2 gap-6" >
                  className="space-y-2" >
                    el className = "text-sm font-semibold" > Original PDF</label >
                      eUploadStyled onFilesSelected = {(f) => setOldPdf(f[0])
        } />
        Pdf && <p className="text-xs text-green-600">✓ {oldPdf.name}</p>
      }
      v >
        className="space-y-2" >
          el className = "text-sm font-semibold" > New PDF</label >
            eUploadStyled onFilesSelected = {(f) => setNewPdf(f[0])
    } />
    Pdf && <p className="text-xs text-green-600">✓ {newPdf.name}</p>
  }
  v >
    v >
    className="mt-6 flex justify-center" >
      ton
  ick = { handleCompare }
  bled = {!oldPdf || !newPdf
}
ant = "primary"
  = "lg"
            
              are Files
tton >
  v >
  geCard >

  parison
ile = { oldPdf }
ile = { newPdf }
ext = { oldText }
ext = { newText }
Popup = { showComparePopup }
ose = {() => setShowComparePopup(false)}
nOcr = { async() => { }}
oading = { ocrLoading }
rror = { ocrError }

ntainer >



  xtract Text Page
t ExtractTextPage: React.FC<{
    ck: () => void;
    actFile: File | null;
    xtractFile: React.Dispatch<React.SetStateAction<File | null>>;
    ({ extractFile, setExtractFile }) => (
      className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
        eCard title = "Extract Text - Upload and Extract" icon = {< FaFileImage />}>
      tFileUpload file = { extractFile } onFileChange = { setExtractFile } />
  tExtractor file = { extractFile } />
    geCard >
    v >


    rt default App;
=======
export default App;
>>>>>>> c734a41ceb272cae3d4fb1332fa6c94aa0d3d96d
