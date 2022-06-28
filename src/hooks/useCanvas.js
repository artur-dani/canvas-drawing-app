import { useEffect, useRef } from 'react';
import { useDraw } from './useDraw';

import { DEFAULT_SETTINGS } from '../constants';

export const useCanvas = (config) => {
  const canvasRef = useRef();
  const ctxRef = useRef();

  const getCanvasContext = () => {
    if (!canvasRef.current) {
      return;
    }
    ctxRef.current = canvasRef.current.getContext('2d');
  };

  const resizeCanvasToWindow = () => {
    if (!canvasRef.current) {
      return;
    }
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
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

  useDraw(canvasRef, ctxRef);

  return {
    canvasRef,
  };
};
