import React from "react";
import RotateButton from "./Rotatebtn";

interface RotateControlsProps {
  totalPages: number;
  rotations: number[];
  onRotate: (pageIndex: number, direction: "left" | "right") => void;
  onClose: () => void; // to close modal
}

const RotateControls: React.FC<RotateControlsProps> = ({
  totalPages,
  rotations,
  onRotate,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4 text-center">Rotate Pages</h2>
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg shadow-sm bg-gray-50 flex flex-col items-center"
            >
              <p className="font-semibold text-gray-700 mb-2">Page {i + 1}</p>
              <p className="text-gray-500 text-sm mb-2">
                Current rotation: {rotations[i]}°
              </p>
              <RotateButton
                onRotateLeft={() => onRotate(i, "left")}
                onRotateRight={() => onRotate(i, "right")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RotateControls;
