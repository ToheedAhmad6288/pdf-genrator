import React from "react";

interface SettingsProps {
  position: string;
  setPosition: (pos: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  startPage: number;
  setStartPage: (page: number) => void;
  endPage: number;
  setEndPage: (page: number) => void;
}

const PageNumberSettings: React.FC<SettingsProps> = ({
  position,
  setPosition,
  fontSize,
  setFontSize,
  startPage,
  setStartPage,
  endPage,
  setEndPage,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <label className="text-sm font-medium text-neutral-700">Position</label>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white/80"
        >
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
          <option value="center">Center</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <label className="text-sm font-medium text-neutral-700">Font Size</label>
        <input
          type="number"
          value={fontSize}
          min={8}
          max={100}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="w-full px-3 py-2 rounded-lg border border-neutral-200"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <label className="text-sm font-medium text-neutral-700">Page Range</label>
        <input
          className="w-full px-3 py-2 rounded-lg border border-neutral-200"
          type="number"
          value={startPage}
          min={1}
          onChange={(e) => setStartPage(parseInt(e.target.value))}
        />
        <input
          className="w-full px-3 py-2 rounded-lg border border-neutral-200"
          type="number"
          value={endPage}
          min={1}
          onChange={(e) => setEndPage(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default PageNumberSettings;
