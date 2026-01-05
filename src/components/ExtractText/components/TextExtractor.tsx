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
  const [copied, setCopied] = useState(false);

  const extractText = async () => {
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      // @ts-ignore
      const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += `\n--- Page ${i} ---\n${pageText}`;
      }

      setExtractedText(fullText.trim());
    } catch (err) {
      setError('Failed to extract text from PDF. Please ensure it is a valid PDF file.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    saveAs(blob, `${file?.name.replace('.pdf', '')}_extracted.txt`);
  };

  return (
    <div className="space-y-8">
      {!extractedText && (
        <div className="relative">
          <button
            onClick={extractText}
            disabled={!file || loading}
            className={`
              w-full font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl flex items-center justify-center gap-4 relative overflow-hidden group/btn
              ${loading
                ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-indigo-200/25 hover:shadow-indigo-300 hover:-translate-y-1 active:scale-95'
              }
            `}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-3 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="animate-pulse">Analyzing Document...</span>
              </>
            ) : (
              <>
                <span>Extract Content from PDF</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              </>
            )}
          </button>

          {loading && (
            <div className="mt-4 h-1.5 w-full bg-indigo-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 animate-[progress_2s_ease-in-out_infinite] w-1/3 origin-left"></div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl animate-shake flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <p className="font-medium">{error}</p>
        </div>
      )}

      {extractedText && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="relative group/text">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-3xl blur opacity-25 group-hover/text:opacity-50 transition duration-1000"></div>
            <textarea
              value={extractedText}
              readOnly
              className="relative w-full h-80 p-6 border-2 border-neutral-100 rounded-3xl bg-white/80 backdrop-blur-sm text-neutral-800 font-mono text-sm focus:ring-4 focus:border-indigo-100 transition-all resize-none shadow-inner"
              placeholder="Extracted text will appear here..."
            />
            <div className="absolute top-4 right-4 flex items-center gap-3">
              <span className="bg-indigo-900/90 backdrop-blur-md text-white text-[11px] px-3 py-1.5 rounded-full shadow-lg uppercase font-bold tracking-widest border border-white/10">
                {extractedText.length.toLocaleString()} CHARS
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={copyToClipboard}
              className={`
                flex-1 flex items-center justify-center gap-2 font-bold py-4 px-8 rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:scale-95
                ${copied
                  ? 'bg-indigo-600 text-white shadow-indigo-200/25'
                  : 'bg-neutral-900 text-white hover:bg-black shadow-neutral-900/20'
                }
              `}
            >
              {copied ? '✓ Copied' : <><FaCopy /> Copy Text</>}
            </button>
            <button
              onClick={downloadAsText}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-indigo-200/30 hover:shadow-indigo-300/40 hover:-translate-y-1 active:scale-95 transition-all"
            >
              <FaDownload /> Download .txt
            </button>
          </div>

          <button
            onClick={() => { setExtractedText(''); setError(''); }}
            className="w-full text-neutral-400 hover:text-red-500 text-sm font-bold transition-colors py-2 flex items-center justify-center gap-2 group"
          >
            <span className="w-4 h-px bg-neutral-200 group-hover:bg-red-200 transition-colors"></span>
            Clear and start over
            <span className="w-4 h-px bg-neutral-200 group-hover:bg-red-200 transition-colors"></span>
          </button>
        </div>
      )}

      {!file && !loading && !extractedText && (
        <div className="text-center py-16 px-8 border-2 border-dashed border-neutral-100 rounded-3xl bg-neutral-50/30 opacity-60">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 grayscale opacity-50">
            <FaCopy className="text-2xl text-neutral-400" />
          </div>
          <p className="text-neutral-500 font-medium italic">Ready to transform your document</p>
        </div>
      )}
    </div>
  );
};

export default TextExtractor;
