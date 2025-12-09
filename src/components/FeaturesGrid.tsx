import React from 'react';
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
import ToolCard from './ToolCard';
import { Container, Section } from './UI';

interface FeaturesGridProps {
    setCurrentPage: (page: any) => void;
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ setCurrentPage }) => {
    return (
        <Section className="!pt-0 relative z-20">
            <Container maxWidth="7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 px-4 sm:px-0">
                    <ToolCard
                        title="JPG to PDF"
                        description="Convert your images to high-quality PDF documents instantly."
                        icon={<FaFileImage />}
                        onClick={() => setCurrentPage("jpg-pdf")}
                        colorClass="bg-gradient-to-br from-blue-500 to-indigo-600"
                    />
                    <ToolCard
                        title="Merge PDFs"
                        description="Combine multiple PDF files into a single organized document."
                        icon={<FaFilePdf />}
                        onClick={() => setCurrentPage("merge")}
                        colorClass="bg-gradient-to-br from-violet-500 to-purple-600"
                    />
                    <ToolCard
                        title="Compress PDF"
                        description="Reduce file size while maintaining document quality."
                        icon={<FaCompress />}
                        onClick={() => setCurrentPage("compress")}
                        colorClass="bg-gradient-to-br from-pink-500 to-rose-600"
                    />
                    <ToolCard
                        title="Split PDF"
                        description="Extract pages or split your PDF into multiple files."
                        icon={<FaCut />}
                        onClick={() => setCurrentPage("split")}
                        colorClass="bg-gradient-to-br from-orange-400 to-red-500"
                    />
                    <ToolCard
                        title="Rotate PDF"
                        description="Rotate your PDF pages permanently."
                        icon={<FaSyncAlt />}
                        onClick={() => setCurrentPage("rotate")}
                        colorClass="bg-gradient-to-br from-emerald-400 to-teal-600"
                    />
                    <ToolCard
                        title="HTML to PDF"
                        description="Convert web pages or HTML code to PDF."
                        icon={<FaCode />}
                        onClick={() => setCurrentPage("html-pdf")}
                        colorClass="bg-gradient-to-br from-gray-600 to-slate-700"
                    />
                    <ToolCard
                        title="Watermark"
                        description="Add text or image watermarks to your documents."
                        icon={<FaWater />}
                        onClick={() => setCurrentPage("watermark")}
                        colorClass="bg-gradient-to-br from-cyan-400 to-blue-500"
                    />
                    <ToolCard
                        title="Page Numbers"
                        description="Insert page numbers with custom formatting."
                        icon={<FaListOl />}
                        onClick={() => setCurrentPage("page-numbers")}
                        colorClass="bg-gradient-to-br from-yellow-400 to-orange-500"
                    />
                    <ToolCard
                        title="Compare PDFs"
                        description="Compare two PDFs side by side to find differences."
                        icon={<FaExchangeAlt />}
                        onClick={() => setCurrentPage("compare")}
                        colorClass="bg-gradient-to-br from-fuchsia-500 to-pink-600"
                    />
                    <ToolCard
                        title="Extract Text"
                        description="Extract all text content from your PDF files."
                        icon={<FaFileImage />}
                        onClick={() => setCurrentPage("extract-text")}
                        colorClass="bg-gradient-to-br from-lime-500 to-green-600"
                    />
                </div>
            </Container>
        </Section>
    );
};

export default FeaturesGrid;
