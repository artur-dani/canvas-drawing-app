import React from 'react';

const canvasStyles = {
  border: '1px solid #333',
};

export const Canvas = ({ canvasRef }) => {
  return <canvas ref={canvasRef} style={canvasStyles} />;
};
