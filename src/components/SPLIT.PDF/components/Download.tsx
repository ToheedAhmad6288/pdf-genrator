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
      className="mt-3 bg-green-600 text-white px-4 py-2 rounded w-full"
    >
      Download PDF
    </button>
  );
};

export default Download;
