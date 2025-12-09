
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

        <h3 className="text-xl font-bold text-center mt-4 text-indigo-700">
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
                  className="ml-4 px-3 py-1 bg-red-600 text-white rounded"
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
            <h4 className="text-center font-semibold mb-2 text-red-600">
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
                    className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded"
                  >
                    {ocrLoading ? "Running OCR..." : "Run OCR on Old PDF"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* New File */}
          <div className="w-1/2 p-4 overflow-y-auto">
            <h4 className="text-center font-semibold mb-2 text-green-600">
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
                    className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded"
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
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              {ocrLoading ? "Running OCR on both..." : "Run OCR on Both PDFs"}
            </button>
          </div>
        )}

        <div className="p-4 flex justify-center gap-4 border-t">
          <button
            onClick={() => downloadFile(oldFile)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Download Old
          </button>
          <button
            onClick={() => downloadFile(newFile)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Download New
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
