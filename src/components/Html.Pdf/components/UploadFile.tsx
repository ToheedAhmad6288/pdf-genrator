import React from "react";

interface HtmlFileUploadProps {
  onFileRead: (content: string) => void;
}

const HtmlFileUpload: React.FC<HtmlFileUploadProps> = ({ onFileRead }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/html") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onFileRead(content);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid HTML file.");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".html"
        onChange={handleFileChange}
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default HtmlFileUpload;
