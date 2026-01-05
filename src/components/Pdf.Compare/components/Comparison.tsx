
import React from "react";

interface ComparisonProps {
  oldFile: File | null;
  newFile: File | null;
  oldText: string;
  newText: string;
  showPopup: boolean;
  onClose: () => void;
  onRunOcr?: (target: "old" | "new" | "both") => Promise<void>;
  ocrLoading?: boolean;
  ocrError?: string | null;
}

const Comparison: React.FC<ComparisonProps> = ({
  oldFile,
  newFile,
  oldText,
  newText,
  showPopup,
  onClose,
  onRunOcr,
  ocrLoading,
  ocrError,
}) => {
  const downloadFile = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl h-[80vh] rounded-2xl shadow-lg relative overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-50"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-center mt-4 text-indigo-700 drop-shadow-sm">
          PDF Comparison Result
        </h3>

        {ocrError && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
            <div className="flex items-center justify-between">
              <div>
                <strong>OCR Error:</strong>
                <div className="text-sm mt-1">{ocrError}</div>
              </div>
              {onRunOcr && (
                <button
                  onClick={() => onRunOcr("both")}
                  disabled={ocrLoading}
                  className="ml-4 px-4 py-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-md transition-all"
                >
                  Retry OCR
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-1 mt-4 overflow-auto">
          {/* Old File */}
          <div className="w-1/2 border-r p-4 overflow-y-auto">
            <h4 className="text-center font-semibold mb-2 text-indigo-600">
              Old File: {oldFile?.name}
            </h4>
            {oldText ? (
              <pre className="text-sm whitespace-pre-wrap text-gray-700">{oldText}</pre>
            ) : (
              <div>
                <p className="text-gray-400">No text extracted.</p>
                <p className="text-sm text-gray-500 mt-1">
                  This PDF may contain scanned images (no selectable/searchable text). To compare
                  the visual content you need OCR (optical character recognition).
                </p>
                {onRunOcr && (
                  <button
                    onClick={() => onRunOcr("old")}
                    disabled={ocrLoading}
                    className="mt-4 px-4 py-2 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg shadow-indigo-200 shadow-lg transition-all"
                  >
                    {ocrLoading ? "Running OCR..." : "Run OCR on Old PDF"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* New File */}
          <div className="w-1/2 p-4 overflow-y-auto">
            <h4 className="text-center font-semibold mb-2 text-indigo-600">
              New File: {newFile?.name}
            </h4>
            {newText ? (
              <pre className="text-sm whitespace-pre-wrap text-gray-700">{newText}</pre>
            ) : (
              <div>
                <p className="text-gray-400">No text extracted.</p>
                <p className="text-sm text-gray-500 mt-1">
                  This PDF may contain scanned images (no selectable/searchable text). To compare
                  the visual content you need OCR.
                </p>
                {onRunOcr && (
                  <button
                    onClick={() => onRunOcr("new")}
                    disabled={ocrLoading}
                    className="mt-4 px-4 py-2 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg shadow-indigo-200 shadow-lg transition-all"
                  >
                    {ocrLoading ? "Running OCR..." : "Run OCR on New PDF"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* OCR both button when both texts missing */}
        {onRunOcr && !oldText && !newText && (
          <div className="p-4 flex justify-center">
            <button
              onClick={() => onRunOcr("both")}
              disabled={ocrLoading}
              className="px-6 py-2.5 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
            >
              {ocrLoading ? "Running OCR on both..." : "Run OCR on Both PDFs"}
            </button>
          </div>
        )}

        <div className="p-4 flex justify-center gap-4 border-t">
          <button
            onClick={() => downloadFile(oldFile)}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
          >
            Download Old
          </button>
          <button
            onClick={() => downloadFile(newFile)}
            className="bg-gradient-to-br from-indigo-500 to-pink-600 hover:from-indigo-600 hover:to-pink-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
          >
            Download New
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
