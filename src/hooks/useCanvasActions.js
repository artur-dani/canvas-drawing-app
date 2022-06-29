export const useCanvasActions = (canvasRef, contextRef) => {
  const handleCanvasClear = () => {
    if (!canvasRef || !contextRef) return;

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  return { handleCanvasClear };
};
