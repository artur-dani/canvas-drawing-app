import React from 'react';
import './style.css';

import Canvas from './components/Canvas';
import ClearCanvasButton from './components/ClearCanvasButton';

export default function App() {
  return (
    <div>
      <h1>Draw App!</h1>
      <div>
        <ClearCanvasButton />
      </div>
      <Canvas width="540" height="320" />
    </div>
  );
}
