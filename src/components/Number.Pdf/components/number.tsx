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
    <div style={{ margin: "10px 0" }}>
      <div>
        <label className="border-2">Position: </label>
        <select value={position} onChange={(e) => setPosition(e.target.value)}>
          <option value="top-left">Top Left</option>
          <option value="top-right">Top Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="bottom-right">Bottom Right</option>
          <option value="center">Center</option>
        </select>
      </div>

      <div>
        <label >Font Size: </label>
        <input
          type="number"
          value={fontSize}
          min={8}
          max={100}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
        />
      </div>

      <div>
        <label>Page Range: </label>
        <input
        className="border-2"
          type="number"
          value={startPage}
          min={1}
          onChange={(e) => setStartPage(parseInt(e.target.value))}
        />
        -
        <input
        className="border-2 mt-2"
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
