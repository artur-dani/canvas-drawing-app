import React from 'react';
import './style.css';

import { Canvas } from './components/Canvas1';
import { useCanvas } from './hooks/useCanvas';
// import SettingBar from "./components/SettingBar";
// import ConfigBar from "./components/ConfigBar";

export default function App1() {
  const { canvas } = useCanvas();

  return (
    <div>
      <h1>Draw App!</h1>
      <Canvas canvasRef={canvas} />
    </div>
  );
}
