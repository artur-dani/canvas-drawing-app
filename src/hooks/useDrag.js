import { useRef, useEffect, useCallback } from 'react';


export const useDrag = (canvas, context, isDragable) => {
  const isDragingRef = useRef(false);

  const handleMouseDown = useCallback(
    (e) => {
      if (!isDragable) return;

      isDragingRef.current = true;
      console.log("useDrag ", isDragingRef.current, isDragable);
    },
    [isDragable]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragable) return;
    },
    [isDragable]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (!isDragable) return;

      // selection move logic here
      console.log("handleMouseUp => ", "move selection");
    },
    [isDragable]
  );

  useEffect(() => {
    const ref = isDragable ? canvas.current : null;

    if (ref) {
      ref.addEventListener("mousedown", handleMouseDown);
      ref.addEventListener("mousemove", handleMouseMove);
      ref.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("mousedown", handleMouseDown);
        ref.removeEventListener("mousemove", handleMouseMove);
        ref.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [canvas, handleMouseDown, handleMouseMove, handleMouseUp, isDragable]);
};
