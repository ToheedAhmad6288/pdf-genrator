import React from "react";

interface HtmlPreviewProps {
  htmlContent: string;
}

const HtmlPreview: React.FC<HtmlPreviewProps> = ({ htmlContent }) => {
  return (
    <div
      id="preview-content"
      className="bg-white p-4 rounded-lg shadow-inner border border-gray-200 overflow-auto"
      style={{
        minHeight: "400px",
        maxHeight: "500px",
        width: "100%",
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default HtmlPreview;
