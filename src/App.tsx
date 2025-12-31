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
    <div className="min-h-screen bg-[#FAFAFA] relative font-sans selection:bg-primary-100 selection:text-primary-900">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-purple-50/40 to-white/0 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-100/40 via-amber-50/40 to-white/0 pointer-events-none -z-10" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-200/20 rounded-full blur-[120px] -z-10 mix-blend-multiply animate-pulse-slow overflow-hidden" />

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none -z-10 brightness-100 contrast-150" />

      <Navbar onNavigate={(page) => setCurrentPage(page as any)} />

      <main className="pt-8 pb-8 sm:pt-16 sm:pb-12 md:pt-20 md:pb-16 relative z-10">
        {currentPage === "home" ? (
          <>
            <Section className="!pt-8 !pb-10 sm:!pt-16 sm:!pb-16 text-center relative pointer-events-none">
              <div className="pointer-events-auto relative z-10">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-white/60 backdrop-blur-md rounded-full shadow-sm border border-white/50 animate-fadeIn">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold tracking-wide uppercase text-gray-600">
                    Free & Secure PDF Tools
                  </span>
                </div>

                <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  Master your <br />
                  <span className="inline-block bg-gradient-to-r from-primary-600 via-violet-600 to-secondary-500 bg-clip-text text-transparent py-2">
                    Documents
                  </span>
                </h1>

                <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed mb-10 px-4">
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
export default App;
