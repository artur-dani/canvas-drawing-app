import React from 'react';
import './style.css';

import { Canvas, Toolbar } from './components';
import { useCanvas, useToolbar } from './hooks';

export default function App() {
  const { config, handleConfigChange } = useToolbar();
  const { canvasRef, setIsDrawingMode, actions, isDrawingMode } =
    useCanvas(config);

  return (
    <div
      style={{
        margin: '0 auto',
        padding: '10px 16px',
        maxWidth: '780px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ marginBottom: '16px' }}>Drawing App!</h1>
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setIsDrawingMode(!isDrawingMode)}
          style={{ padding: '6px 12px' }}
        >
          Toggle Drawing Mode
        </button>
      </div>
      <Toolbar onConfigChange={handleConfigChange} {...actions} />
      <div>
        <Canvas canvasRef={canvasRef} />
      </div>
    </div>
  );
}
