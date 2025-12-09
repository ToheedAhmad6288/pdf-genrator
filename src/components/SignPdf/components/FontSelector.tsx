import React from "react";

interface FontSelectorProps {
  selectedFont: string;
  setSelectedFont: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({
  selectedFont,
  setSelectedFont,
}) => {
  return (
    <div className="font-selector">
      <label>Select Font</label>

      <select
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}
        className="font-dropdown"
      >
        <option value="Cursive">Cursive</option>
        <option value="Georgia">Georgia</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Brush Script MT">Brush Script</option>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
      </select>
    </div>
  );
};

export default FontSelector;
