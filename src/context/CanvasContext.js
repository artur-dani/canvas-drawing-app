import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [strokeColor, setStrokeColor] = useState("#000");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [canvasWidth, setCanvasWidth] = useState(220);
  const [canvasHeight, setCanvasHeight] = useState(140);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasWidth * 2; // * 2 for retina
    canvas.height = canvasHeight * 2;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    ctx.scale(2, 2);
    ctx.lineCap = "round";
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    const ctx = ctxRef.current;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
  }, [strokeColor, strokeWidth]);

  const handleMouseMove = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const handleMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctxRef = canvas.getContext("2d");
    ctxRef.fillStyle = "white";
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
