import { useRef, useEffect, useCallback } from 'react';

import { drawSelection, isHoverSelection } from '../helpers';

export const useDrag = (canvas, context, isDragingMode) => {
  const isDragingRef = useRef(false);
  const previousCoordinatesRef = useRef(null);
  const selectionRef = useRef(null);

  const updateCoordinates = (e) => {
    previousCoordinatesRef.current = { x: e.offsetX, y: e.offsetY };
  };

  const updateSelection = (e) => {
    console.log(previousCoordinatesRef);
    if (!previousCoordinatesRef.current) return;
    const x = Math.min(e.offsetX, previousCoordinatesRef.current.x);
    const y = Math.min(e.offsetY, previousCoordinatesRef.current.y);
    const w = Math.abs(x - e.offsetX);
    const h = Math.abs(y - e.offsetY);
    console.log({ x, offset: e.offsetX });

    selectionRef.current = { x, y, w, h };
  };

  const dragStart = useCallback((e) => {
    console.log('dragStart');
    isDragingRef.current = true;
    updateCoordinates(e);
  }, []);

  const selectStart = useCallback((e) => {
    console.log('selectStart');
    isDragingRef.current = false;
    updateSelection(e);
  }, []);

  const dragStop = () => {
    console.log('dragStop');
    isDragingRef.current = false;
  };

  const handleMouseDown = useCallback(
    (e) => {
      updateCoordinates(e);

      if (
        isHoverSelection({ x: e.offsetX, y: e.offsetY }, selectionRef.current)
      ) {
        console.log('hoovering');
        dragStart(e);
      } else {
        selectStart(e);
      }
    },
    [isHoverSelection]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragingRef.current || !context.current) {
        return;
      }

      if (!isDragingRef.current) {
        console.log('updateSelection');
        updateSelection(e);
        return;
      }

      // updateCoordinates(e);
      updateSelection(e);
    },
    [context]
  );

  const handleMouseUp = useCallback(
    (e) => {
      if (!context.current) {
        return;
      }

      if (!isDragingRef.current) {
        drawSelection(context.current, selectionRef.current);
        return;
      }

      // selection move logic here
      console.log('handleMouseUp => ', 'move selection');
      dragStop();
    },
    [context]
  );

  useEffect(() => {
    const ref = isDragingMode ? canvas.current : null;

    if (ref) {
      ref.addEventListener('mousedown', handleMouseDown);
      ref.addEventListener('mousemove', handleMouseMove);
      ref.addEventListener('mouseup', handleMouseUp);
      // ref.addEventListener('mouseout', dragStop);
    }

    return () => {
      if (ref) {
        ref.removeEventListener('mousedown', handleMouseDown);
        ref.removeEventListener('mousemove', handleMouseMove);
        ref.removeEventListener('mouseup', handleMouseUp);
        // ref.removeEventListener('mouseout', dragStop);
      }
    };
  }, [canvas, handleMouseDown, handleMouseMove, handleMouseUp, isDragingMode]);
};
