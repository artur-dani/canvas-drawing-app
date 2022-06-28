import { useRef, useEffect, useCallback } from 'react';

export const useDraw = (canvas, context) => {
  const isDrawing = useRef(false);
  const previousCoordinates = useRef([0, 0]);

  const updateCoordinates = (e) => {
    console.log(e.offsetX, e.offsetY);
    previousCoordinates.current = [e.offsetX, e.offsetY];
  };

  const drawStart = useCallback((e) => {
    isDrawing.current = true;
    updateCoordinates(e);
  }, []);

  const drawStop = () => {
    isDrawing.current = false;
  };

  const drawLine = useCallback(
    (e) => {
      if (!context.current) {
        return;
      }

      context.current.beginPath();
      context.current.moveTo(...previousCoordinates.current);
      context.current.lineTo(e.offsetX, e.offsetY);
      context.current.stroke();
    },
    [context]
  );

  const drawMove = useCallback(
    (e) => {
      if (!isDrawing.current || !context.current) {
        return;
      }

      drawLine(e);
      updateCoordinates(e);
    },
    [context, drawLine]
  );

  useEffect(() => {
    const ref = canvas.current;

    if (ref) {
      ref.addEventListener('mousedown', drawStart);
      ref.addEventListener('mousemove', drawMove);
      ref.addEventListener('mouseup', drawStop);
      ref.addEventListener('mouseout', drawStop);
    }

    return () => {
      if (ref) {
        ref.removeEventListener('mousedown', drawStart);
        ref.removeEventListener('mousemove', drawMove);
        ref.removeEventListener('mouseup', drawStop);
        ref.removeEventListener('mouseout', drawStop);
      }
    };
  }, [canvas, drawMove, drawStart]);
};
