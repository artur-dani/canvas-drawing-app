import React from 'react';
import './style.css';

import { Canvas, Toolbar } from './components';
import { useCanvas, useToolbar } from './hooks';

export default function App() {
  const { config, handleConfigChange } = useToolbar();
  const { canvasRef, setIsDrawingMode, actions } = useCanvas(config);

  return (
    <div>
      <h1>Draw App!</h1>
      <Toolbar onConfigChange={handleConfigChange} {...actions} />
      <Canvas canvasRef={canvasRef} />
    </div>
  );
}
