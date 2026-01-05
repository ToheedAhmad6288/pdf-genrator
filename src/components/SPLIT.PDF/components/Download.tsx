import React from "react";

interface Props {
  pages: Blob | null;
}

const Download: React.FC<Props> = ({ pages }) => {
  if (!pages) return null;

  const downloadFile = () => {
    const url = URL.createObjectURL(pages);
    const a = document.createElement("a");
    a.href = url;
    a.download = "selected-pages.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={downloadFile}
      className="mt-3 bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white px-6 py-2.5 rounded-xl w-full font-bold shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all duration-300 hover:-translate-y-0.5"
    >
      Download PDF
    </button>
  );
};

export default Download;
