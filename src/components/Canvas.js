import React, { useEffect } from 'react';
import { useCanvas } from '../context/CanvasContext';

const canvasStyles = {
  border: '1px solid #333',
};

export default function Canvas() {
  const { canvasRef, initCanvas } = useCanvas();

  useEffect(() => {
    initCanvas({ width: 540, height: 320 });
  }, []);

  return <canvas ref={canvasRef} style={canvasStyles} />;
}
