import React from "react";

const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({
  onClose,
  children,
}) => (
  <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
    <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col animate-slideInUp">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-neutral-600 hover:text-neutral-900 text-2xl z-10 hover:bg-neutral-100 rounded-full p-2 transition-all"
      >
        ✕
      </button>
      <div className="overflow-auto">
        {children}
      </div>
    </div>
  </div>
);

export default Modal;
