    import React from "react";
import { FaUndoAlt, FaRedoAlt } from "react-icons/fa";

interface RotateButtonProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
}

const RotateButton: React.FC<RotateButtonProps> = ({ onRotateLeft, onRotateRight }) => {
  return (
    <div className="flex gap-4 justify-center mt-2">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-2"
        onClick={onRotateLeft}
      >
        <FaUndoAlt /> Left
      </button>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-2"
        onClick={onRotateRight}
      >
        <FaRedoAlt /> Right
      </button>
    </div>
  );
};

export default RotateButton;
