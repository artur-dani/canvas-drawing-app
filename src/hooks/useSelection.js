import { useRef, useEffect, useCallback, useState } from 'react';

import {
  drawSelection,
  clearPrevSelection,
  isHoveringSelection,
  dragSelection,
} from '../helpers';

export const useSelection = (canvas, context, isSelectingMode) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const selection = useRef(null);
  const isSelectionHovered = useRef(false);

  const handleMouseDown = useCallback((e) => {
    if (isSelectionHovered.current) return;

    setIsSelecting(true);

    if (selection.current) {
      clearPrevSelection(context.current, selection.current);
    }

    selection.current = {
      x: Math.max(e.offsetX, 0),
      y: Math.max(e.offsetY, 0),
      w: 0,
      h: 0,
    };
    // console.log("handleMouseDown ", selection.current);
  }, []);

  const handleMouseMove = useCallback((e) => {
    // mouse move logic
    isSelectionHovered.current = isHoveringSelection(
      { x: e.offsetX, y: e.offsetY },
      selection.current
    );
  }, []);

  const handleMouseUp = useCallback(
    (e) => {
      if (isSelecting) {
        setIsSelecting(false);
        selection.current = {
          x: Math.min(e.offsetX, selection.current.x),
          y: Math.min(e.offsetY, selection.current.y),
          w: Math.abs(e.offsetX - selection.current.x),
          h: Math.abs(e.offsetY - selection.current.y),
        };

        if (selection.current.w > 0 && selection.current.h > 0) {
          drawSelection(context.current, selection.current);
        }
      } else {
        // move selection
        if (selection.current) {
          dragSelection(
            context.current,
            { x: e.offsetX, y: e.offsetY },
            selection.current
          );

          //clear and update selection
          clearPrevSelection(context.current, selection.current);
          selection.current = {
            ...selection.current,
            x: e.offsetX,
            y: e.offsetY,
          };
        }
      }
    },
    [isSelecting]
  );
  const handleMouseOut = useCallback((e) => {}, []);

  useEffect(() => {
    const ref = isSelectingMode ? canvas.current : null;

    if (ref) {
      ref.addEventListener('mousedown', handleMouseDown);
      ref.addEventListener('mousemove', handleMouseMove);
      ref.addEventListener('mouseup', handleMouseUp);
      ref.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      if (ref) {
        ref.removeEventListener('mousedown', handleMouseDown);
        ref.removeEventListener('mousemove', handleMouseMove);
        ref.removeEventListener('mouseup', handleMouseUp);
        ref.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, [
    canvas,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isSelectingMode,
  ]);

  return {
    isSelecting,
    isSelectionHovered,
    selection,
  };
};
