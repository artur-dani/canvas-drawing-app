import { useEffect, useRef, useState } from 'react';
import { useDraw, useCanvasActions, useSelection } from './';

import { DEFAULT_SETTINGS } from '../constants';

export const useCanvas = (config) => {
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const canvasRef = useRef();
  const ctxRef = useRef();

  const getCanvasContext = () => {
    if (!canvasRef.current) {
      return;
    }
    ctxRef.current = canvasRef.current.getContext("2d");
  };

  const resizeCanvasToWindow = () => {
    if (!canvasRef.current) {
      return;
    }
    canvasRef.current.width = DEFAULT_SETTINGS.width;
    canvasRef.current.height = DEFAULT_SETTINGS.height;
  };

  const configureCanvasSettings = () => {
    if (!ctxRef.current) {
      return;
    }

    Object.assign(ctxRef.current, DEFAULT_SETTINGS, config);
  };

  useEffect(resizeCanvasToWindow, []);
  useEffect(getCanvasContext, []);
  useEffect(configureCanvasSettings, [config]);

  useDraw(canvasRef, ctxRef, isDrawingMode);
  useSelection(canvasRef, ctxRef, !isDrawingMode);

  const actions = useCanvasActions(canvasRef, ctxRef);

  return {
    canvasRef,
    setIsDrawingMode,
    isDrawingMode,
    actions,
  };
};;
