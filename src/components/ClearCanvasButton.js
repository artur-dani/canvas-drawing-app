import React from 'react';
import { useCanvas } from '../context/CanvasContext';

const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas();

  return <button onClick={clearCanvas}>Clear</button>;
};

export default ClearCanvasButton;
