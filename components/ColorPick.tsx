'use client';

import { HexColorPicker } from 'react-colorful';
import { useState } from 'react';

const ColorPicker = () => {
  const [color, setColor] = useState('#aabbcc');

  return (
    <div className="flex flex-col items-start gap-4">
      <label className="text-sm font-medium">Pick a color:</label>
      <HexColorPicker color={color} onChange={setColor} />
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
