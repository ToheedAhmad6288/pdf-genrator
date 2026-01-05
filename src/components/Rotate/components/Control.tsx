import React from "react";
import RotateButton from "./Rotatebtn";
import { FaTimes } from "react-icons/fa";

interface RotateControlsProps {
  totalPages: number;
  rotations: number[];
  onRotate: (pageIndex: number, direction: "left" | "right") => void;
  onClose: () => void;
}

const RotateControls: React.FC<RotateControlsProps> = ({
  totalPages,
  rotations,
  onRotate,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-green-200 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in p-4">
      <div className="bg-white/90 backdrop-blur-xl border border-white/50 w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scale-in">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 bg-white/50">
          <div>
            <h2 className="text-2xl font-bold text-neutral-800">Rotate Pages</h2>
            <p className="text-sm text-neutral-500 font-medium">Adjust orientation for individual pages</p>
          </div>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 text-neutral-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Content Grid */}
        <div className="overflow-y-auto p-6 bg-neutral-50/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl border border-neutral-200/60 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300 p-4 flex flex-col items-center justify-center min-h-[160px]"
              >
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600 border border-neutral-200">
                  {i + 1}
                </div>

                <div className="w-full flex flex-col items-center gap-3">
                  <div className="text-center text-xs font-semibold text-neutral-400 uppercase tracking-wider bg-neutral-50 px-3 py-1 rounded-full border border-neutral-100">
                    {rotations[i]}° Rotation
                  </div>
                  <RotateButton
                    onRotateLeft={() => onRotate(i, "left")}
                    onRotateRight={() => onRotate(i, "right")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-100 bg-white/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-900 text-white rounded-xl text-sm font-semibold shadow-lg shadow-neutral-500/20 transition-all transform hover:scale-105"
          >
            Done Formatting
          </button>
        </div>
      </div>
    </div>
  );
};

export default RotateControls;
