import React from "react";
import Draggable from "react-draggable";

interface DragSignatureProps {
  signatureImage: string | null;
  position: { x: number; y: number };
  setPosition: (pos: { x: number; y: number }) => void;
}

const DragSignature: React.FC<DragSignatureProps> = ({
  signatureImage,
  position,
  setPosition,
}) => {
  if (!signatureImage) return null;

  return (
    <div className="drag-area">
      <Draggable
        defaultPosition={position}
        onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
      >
        <img
          src={signatureImage}
          alt="signature"
          className="signature-img"
        />
      </Draggable>
    </div>
  );
};

export default DragSignature;
