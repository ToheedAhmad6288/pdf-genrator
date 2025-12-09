import React, { useEffect, useRef, useState } from "react";

interface SignatureEditorProps {
  signatureImage: string | null;
  setSignatureImage: (img: string | null) => void;
}

const SignatureEditor: React.FC<SignatureEditorProps> = ({
  signatureImage,
  setSignatureImage,
}) => {
  const [name, setName] = useState("");
  const [font, setFont] = useState("Cursive");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate the PNG signature from text
  const generateSignature = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 200;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = `48px ${font}`;
    ctx.textBaseline = "middle";

    ctx.fillText(name, 20, 100);

    const png = canvas.toDataURL("image/png");
    setSignatureImage(png);
  };

  useEffect(() => {
    if (name.trim() !== "") {
      generateSignature();
    }
  }, [name, font]);

  return (
    <div className="signature-editor">
      <h3>Add Signature</h3>

      <input
        type="text"
        placeholder="Type your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-input"
      />

      <select
        value={font}
        onChange={(e) => setFont(e.target.value)}
        className="font-dropdown"
      >
        <option value="Cursive">Cursive</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Brush Script MT">Brush Script</option>
      </select>

      <div className="signature-preview">
        {signatureImage ? (
          <img src={signatureImage} alt="signature preview" />
        ) : (
          <p>Signature preview will appear here</p>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default SignatureEditor;
