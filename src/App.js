import React from 'react';
import './style.css';

import { Canvas, Toolbar } from './components';
import { useCanvas, useToolbar } from './hooks';

export default function App() {
  const { config, handleConfigChange } = useToolbar();
  const { canvasRef, setIsDrawingMode, actions, isDrawingMode } = useCanvas(config);

  return (
    <div style={{ margin: "0 auto", padding: "10px 16px" }}>
      <h1>Draw App!</h1>
      <button onClick={() => setIsDrawingMode(!isDrawingMode)}>
        Toggle Drawing Mode
      </button>
      <Toolbar onConfigChange={handleConfigChange} {...actions} />
      <Canvas canvasRef={canvasRef} />
    </div>
  );
}
