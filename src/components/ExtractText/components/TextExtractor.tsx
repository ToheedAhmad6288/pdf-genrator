import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FaCopy, FaDownload } from 'react-icons/fa';
import { saveAs } from 'file-saver';

interface TextExtractorProps {
  file: File | null;
}

const TextExtractor: React.FC<TextExtractorProps> = ({ file }) => {
  const [extractedText, setExtractedText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const extractText = async () => {
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      // @ts-ignore
      const pdf = await pdfjsLib.getDocument(file).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += `\n--- Page ${i} ---\n${pageText}`;
      }

      setExtractedText(fullText);
    } catch (err) {
      setError('Failed to extract text from PDF');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
  };

  const downloadAsText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    saveAs(blob, `${file?.name.replace('.pdf', '')}_extracted.txt`);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={extractText}
        disabled={!file || loading}
        className="w-full bg-gradient-to-br from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 disabled:from-neutral-400 disabled:to-neutral-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-lime-200 hover:-translate-y-0.5"
      >
        {loading ? 'Extracting...' : 'Extract Text from PDF'}
      </button>

      {error && (
        <div className="bg-danger-100 border border-danger-400 text-danger-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {extractedText && (
        <div className="space-y-3">
          <textarea
            value={extractedText}
            readOnly
            className="w-full h-48 p-3 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-900 font-mono text-sm focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
          />
          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all hover:-translate-y-0.5"
            >
              <FaCopy /> Copy Text
            </button>
            <button
              onClick={downloadAsText}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-md transition-all hover:-translate-y-0.5"
            >
              <FaDownload /> Download .txt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextExtractor;
