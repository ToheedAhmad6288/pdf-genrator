import React, { useState } from "react";
import UploadPDF from "../components/UploadPDF";
import SignatureEditor from "../components/SignatureEditor";
import FontSelector from "../components/FontSelector";
import DragSignature from "../components/DragSignature";

import "./Editor.css";

const Editor: React.FC = () => {
  const [pdfBuffer, setPdfBuffer] = useState<ArrayBuffer | null>(null);
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [signaturePosition, setSignaturePosition] = useState<{ x: number; y: number }>({ x: 20, y: 20 });
  const [selectedFont, setSelectedFont] = useState<string>("Cursive");

  const handleDownload = async () => {
    if (!pdfBuffer || !signatureImage) {
      alert("Please upload PDF and create a signature first.");
      return;
    }

    const pos = { pageIndex: 0, x: signaturePosition.x, y: signaturePosition.y, scale: 1 };
    const signedPdf = await insertSignatureIntoPdf(pdfBuffer, signatureImage, pos);

    const blob = new Blob([signedPdf], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "signed.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="editor-container">
      <div className="left-panel">
        <UploadPDF setPdfBuffer={setPdfBuffer} />

        <FontSelector selectedFont={selectedFont} setSelectedFont={setSelectedFont} />

        <SignatureEditor signatureImage={signatureImage} setSignatureImage={setSignatureImage} />

        <button onClick={handleDownload} className="btn download-btn">
          Download Signed PDF
        </button>
      </div>

      <div className="right-panel">
        {pdfBuffer ? (
          <div className="pdf-preview">
            <iframe
              title="pdf-preview"
              src={URL.createObjectURL(new Blob([pdfBuffer], { type: "application/pdf" }))}
              className="pdf-iframe"
            />
            {signatureImage && (
              <DragSignature
                signatureImage={signatureImage}
                position={signaturePosition}
                setPosition={setSignaturePosition}
              />
            )}
          </div>
        ) : (
          <div className="pdf-empty">Upload a PDF to see preview here</div>
        )}
      </div>
    </div>
  );
};

export default Editor;
