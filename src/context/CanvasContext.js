import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';

import {
  drawSelection,
  clearPrevSelection,
  isHoverSelection,
  dragSelection,
} from '../helpers';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [isDraging, setIsDraging] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#000');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [canvasWidth, setCanvasWidth] = useState(220);
  const [canvasHeight, setCanvasHeight] = useState(140);
  const [selection, setSelection] = useState(null);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasWidth * 2; // * 2 for retina
    canvas.height = canvasHeight * 2;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    ctx.scale(2, 2);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    const ctx = ctxRef.current;

    clearPrevSelection(ctx, selection);

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
  }, [strokeColor, strokeWidth, isDrawingMode]);

  const handleMouseMove = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (isDrawingMode) {
      if (!isDrawing) {
        return;
      }

      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
    } else {
      if (isHoverSelection({ x: offsetX, y: offsetY }, selection)) {
        canvasRef.current.style.cursor = 'pointer';

        if (isDraging)
          dragSelection(ctxRef.current, { x: offsetX, y: offsetY }, selection);
      } else {
        canvasRef.current.style.cursor = 'default';
      }
    }
  };

  const handleMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (isDrawingMode) {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    } else {
      setSelection({ x: offsetX, y: offsetY });

      if (selection?.w) clearPrevSelection(ctxRef.current, selection);

      if (isHoverSelection({ x: offsetX, y: offsetY }, selection))
        setIsDraging(true);
    }
  };

  const handleMouseUp = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (isDrawingMode) {
      ctxRef.current.closePath();
    } else {
      setSelection((prev) => {
        if (!prev) return;

        const { x, y } = prev;
        const newSelection = {
          x: Math.min(x, offsetX),
          y: Math.min(y, offsetY),
          w: Math.abs(x - offsetX),
          h: Math.abs(y - offsetY),
        };

        setSelection(newSelection);
        drawSelection(ctxRef.current, newSelection);
      });
    }

    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctxRef = canvas.getContext('2d');
    ctxRef.fillStyle = 'white';
    ctxRef.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        handleMouseMove,
        handleMouseDown,
        handleMouseUp,
        clearCanvas,
        setStrokeColor,
        setStrokeWidth,
        setIsDrawingMode,
        setCanvasWidth,
        setCanvasHeight,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
