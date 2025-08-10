'use client';

import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';

type ColorPickerProps = {
  setBadgeColor: (color: string) => void;
};

const ColorPicker = ({ setBadgeColor }: ColorPickerProps) => {
  const [color, setColor] = useState('#aabbcc');

  return (
    <div className="flex flex-col items-start gap-4">
      <label className="text-sm font-medium">Pick a color:</label>
      <HexColorPicker
        color={color}
        onChange={(newColor) => {
          setColor(newColor);
          setBadgeColor(newColor);
        }}
        className="h-10 w-10"
      />
      <div
        className="mt-4 h-12 w-32 rounded border"
        style={{ backgroundColor: color }}
      >
        {color}
      </div>
    </div>
  );
};
export default ColorPicker;
