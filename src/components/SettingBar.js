import React from "react";
import { useCanvas } from "../context/CanvasContext";

function SettingBar() {
  const { clearCanvas } = useCanvas();
  return (
    <div>
      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
}

export default SettingBar;
