import { useEffect, useRef } from 'react';
import { useDraw } from './useDraw';

import { DEFAULT_SETTINGS } from '../constants';

export const useCanvas = () => {
  const canvas = useRef();
  const context = useRef();

  const getCanvasContext = () => {
    if (!canvas.current) {
      return;
    }
    context.current = canvas.current.getContext('2d');
  };

  const resizeCanvasToWindow = () => {
    if (!canvas.current) {
      return;
    }
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;
  };

  const configureCanvasSettings = () => {
    if (!context.current) {
      return;
    }

    Object.assign(context.current, DEFAULT_SETTINGS);
  };

  useEffect(resizeCanvasToWindow, []);
  useEffect(getCanvasContext, []);
  useEffect(configureCanvasSettings, []);

  useDraw(canvas, context);

  return {
    canvas,
  };
};
