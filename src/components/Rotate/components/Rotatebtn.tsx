import React from "react";
import { FaUndoAlt, FaRedoAlt } from "react-icons/fa";

interface RotateButtonProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
}

const RotateButton: React.FC<RotateButtonProps> = ({ onRotateLeft, onRotateRight }) => {
  return (
    <div className="flex flex-row gap-1 w-full mt-3">
      <button
        className="flex-1 bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-2 py-2 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 hover:shadow-md hover:shadow-emerald-100/50 -ml-2 mr-2 h-8 w-10"
        onClick={onRotateLeft}
        title="Rotate Left"
      >
        <FaUndoAlt className="text-sm" /> Left
      </button>
      <button
        className="flex-1  bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-2 py-2 rounded-lg flex items-center justify-center  text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:shadow-emerald-500/30 hover:-translate-y-0.5 -ml-2 h-8 w-10"
        onClick={onRotateRight}
        title="Rotate Right"
      >
        <FaRedoAlt className="text-sm" /> Right
      </button>
    </div>
  );
};

export default RotateButton;
