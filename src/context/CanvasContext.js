import React, { createContext, useContext, useRef } from 'react';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const canvasRef = useRef(null);

  const initCanvas = ({ width, height }) => {
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
  };

  return (
    <CanvasContext.Provider value={{ canvasRef, initCanvas }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
