// src/components/WaterMark.Pdf/components/WatermarkControls.tsx
import React from "react";

interface WatermarkOptions {
  text: string;
  fontSize: number;
  color: string;
  opacity: number;
  position:
    | "top-left"
    | "top-right"
    | "center"
    | "bottom-left"
    | "bottom-right"
    | "diagonal"
    | "anti-diagonal";
}

interface WatermarkControlsProps {
  options: WatermarkOptions;
  onChange: (options: WatermarkOptions) => void;
}

const WatermarkControls: React.FC<WatermarkControlsProps> = ({ options, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded-md border-gray-300">
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Watermark Text</label>
        <input
          type="text"
          value={options.text}
          onChange={(e) => onChange({ ...options, text: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2" 
          placeholder="Enter watermark text"
        />
      </div>

      <div className="flex items-end gap-3">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
          <input
            type="number"
            value={options.fontSize}
            onChange={(e) => onChange({ ...options, fontSize: parseInt(e.target.value || '0') })}
            min={8}
            max={100}
            className="border border-gray-300 rounded px-2 py-2 w-full"
          />
        </div>
      </div>

      <div className="flex items-end gap-3">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Opacity</label>
          <input
            type="number"
            value={options.opacity}
            onChange={(e) => onChange({ ...options, opacity: parseFloat(e.target.value || '0') })}
            min={0}
            max={1}
            step={0.1}
            className="border border-gray-300 rounded px-2 py-2 w-full"
          />
        </div>
      </div>

      <div className="flex items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <input
            type="color"
            value={options.color}
            onChange={(e) => onChange({ ...options, color: e.target.value })}
            className="w-12 h-10 p-0 border-0 rounded"
          />
        </div>
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
        <select
          value={options.position}
          onChange={(e) =>
            onChange({ ...options, position: e.target.value as WatermarkOptions["position"] })
          }
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="center">Center</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
          <option value="diagonal">Diagonal (↘)</option>
          <option value="anti-diagonal">Anti-Diagonal (↙)</option>
        </select>
      </div>
    </div>
  );
};

export default WatermarkControls;
