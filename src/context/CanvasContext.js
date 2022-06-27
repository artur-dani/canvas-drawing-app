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
  const [isSelecting, setIsSelecting] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [strokeColor, setStrokeColor] = useState("#000");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [canvasWidth, setCanvasWidth] = useState(220);
  const [canvasHeight, setCanvasHeight] = useState(140);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });

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
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    const ctx = ctxRef.current;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
  }, [strokeColor, strokeWidth]);

  const handleMouseMove = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (isDrawingMode) {
      if (!isDrawing) {
        return;
      }

      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
    }
  };

  const handleMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (isDrawingMode) {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    } else {
      setIsSelecting(true);
      setSelectionStart({ x: offsetX, y: offsetY });
    }
  };

  const drawRectangle = (ctx, start, end) => {
    ctx.beginPath();
    ctx.rect(start.x, start.y, end.x, end.y);
    ctx.stroke();
  };

  const handleMouseUp = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (isDrawingMode) {
      ctxRef.current.closePath();
    } else {
      drawRectangle(ctxRef.current, selectionStart, { x: offsetX, y: offsetY });
    }

    setIsDrawing(false);
    setIsSelecting(false);
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
