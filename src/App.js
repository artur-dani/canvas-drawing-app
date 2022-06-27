import React from 'react';
import './style.css';

import Canvas from './components/Canvas';
import SettingBar from "./components/SettingBar";
import ConfigBar from "./components/ConfigBar";

export default function App() {
  return (
    <div>
      <h1>Draw App!</h1>
      <div style={{ display: "flex" }}>
        <SettingBar />
        <ConfigBar />
      </div>
      <Canvas width="540" height="320" />
    </div>
  );
}
