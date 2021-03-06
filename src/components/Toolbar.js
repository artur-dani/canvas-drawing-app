import React from 'react';

import { DEFAULT_SETTINGS } from '../constants';

export const Toolbar = ({ onConfigChange, handleCanvasClear }) => {
  return (
    <aside
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: DEFAULT_SETTINGS.width,
      }}
    >
      <div>
        <input
          type="radio"
          onChange={onConfigChange}
          id="tool-brush"
          name="globalCompositeOperation"
          value="source-over"
          defaultChecked
        />
        <label htmlFor="tool-brush">Brush</label>
      </div>
      <div>
        <input
          type="radio"
          onChange={onConfigChange}
          id="tool-eraser"
          name="globalCompositeOperation"
          value="destination-out"
        />
        <label htmlFor="tool-eraser">Eraser</label>
      </div>

      <input
        onChange={onConfigChange}
        type="color"
        name="strokeStyle"
        defaultValue={DEFAULT_SETTINGS.strokeStyle}
      />
      <input
        onChange={onConfigChange}
        type="range"
        name="lineWidth"
        min="1"
        max="30"
        defaultValue={DEFAULT_SETTINGS.lineWidth}
      />

      <button onClick={handleCanvasClear}>Clear</button>
    </aside>
  );
};
