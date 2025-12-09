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
        className="bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5"
        onClick={onRotateLeft}
      >
        <FaUndoAlt /> Left
      </button>
      <button
        className="bg-gradient-to-br from-emerald-400 to-teal-600 hover:from-emerald-500 hover:to-teal-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-200 transition-all duration-300 hover:-translate-y-0.5"
        onClick={onRotateRight}
      >
        <FaRedoAlt /> Right
      </button>
    </div>
  );
};

export default RotateButton;
