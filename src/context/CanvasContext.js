import React, { createContext, useContext, useRef } from 'react';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const initCanvas = ({ width, height }) => {
    const canvas = canvasRef.current;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
  };

  const handleMouseMove = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log({ x: offsetX, y: offsetY });

    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  return (
    <CanvasContext.Provider value={{ canvasRef, initCanvas, handleMouseMove }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
