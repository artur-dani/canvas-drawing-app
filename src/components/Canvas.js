import React, { useEffect } from "react";
import { useCanvas } from "../context/CanvasContext";

const canvasStyles = {
  border: "1px solid #333",
};

export default function Canvas({ width, height }) {
  const {
    canvasRef,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    setCanvasWidth,
    setCanvasHeight,
  } = useCanvas();

  useEffect(() => {
    setCanvasWidth(width);
    setCanvasHeight(height);
  }, [width, height]);

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={canvasStyles}
      />
    </>
  );
}
