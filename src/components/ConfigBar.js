import React from "react";
import { useCanvas } from "../context/CanvasContext";

function ConfigBar() {
  const { setIsDrawingMode, setStrokeColor } = useCanvas();

  return (
    <div style={{ display: "flex", marginLeft: "12px" }}>
      <div>
        <button
          onClick={() => setIsDrawingMode(false)}
          style={{ backgroundColor: "#33de00" }}
        >
          Select
        </button>
        <button
          onClick={() => setIsDrawingMode(true)}
          style={{ backgroundColor: "#a3dea0" }}
        >
          Draw
        </button>
      </div>
      <div style={{ marginLeft: "4px" }}>
        <button
          onClick={() => setStrokeColor("#e3de00")}
          style={{ width: "40px", height: "100%", backgroundColor: "#e3de00" }}
        />
        <button
          onClick={() => setStrokeColor("#23d")}
          style={{ width: "40px", height: "100%", backgroundColor: "#23d" }}
        />
        <button
          onClick={() => setStrokeColor("#9ad")}
          style={{ width: "40px", height: "100%", backgroundColor: "#9ad" }}
        />
        <button
          onClick={() => setStrokeColor("#e3d")}
          style={{ width: "40px", height: "100%", backgroundColor: "#e3d" }}
        />
      </div>
    </div>
  );
}

export default ConfigBar;
