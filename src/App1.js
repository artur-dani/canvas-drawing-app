import React from 'react';
import './style.css';

import { Canvas, Toolbar } from './components';
import { useCanvas, useToolbar } from './hooks';
// import SettingBar from "./components/SettingBar";
// import ConfigBar from "./components/ConfigBar";

export default function App1() {
  const { brushConfig, handleConfigChange } = useToolbar();
  const { canvas } = useCanvas(brushConfig);

  return (
    <div>
      <h1>Draw App!</h1>
      <Toolbar onConfigChange={handleConfigChange} />
      <Canvas canvasRef={canvas} />
    </div>
  );
}
