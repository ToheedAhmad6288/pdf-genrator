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
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        {loading ? 'Extracting...' : 'Extract Text'}
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
            className="w-full h-48 p-3 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-900 font-mono text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <FaCopy /> Copy
            </button>
            <button
              onClick={downloadAsText}
              className="flex items-center gap-2 bg-success-600 hover:bg-success-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              <FaDownload /> Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextExtractor;
