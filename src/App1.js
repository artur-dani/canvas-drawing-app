import React from 'react';
import './style.css';

import { Canvas, Toolbar } from './components';
import { useCanvas, useToolbar } from './hooks';

export default function App1() {
  const { config, handleConfigChange } = useToolbar();
  const { canvasRef } = useCanvas(config);

  return (
    <div>
      <h1>Draw App!</h1>
      <Toolbar onConfigChange={handleConfigChange} />
      <Canvas canvasRef={canvasRef} />
    </div>
  );
}
