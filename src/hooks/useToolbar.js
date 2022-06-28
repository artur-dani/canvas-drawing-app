import { useState } from 'react';

import { DEFAULT_SETTINGS } from '../constants';

export const useToolbar = () => {
  const [brushConfig, setBrushConfig] = useState({
    globalCompositeOperation: DEFAULT_SETTINGS.globalCompositeOperation,
    strokeStyle: DEFAULT_SETTINGS.strokeStyle,
    lineWidth: DEFAULT_SETTINGS.lineWidth,
  });

  const handleConfigChange = (e) => {
    const { value, name } = e.currentTarget;
    setBrushConfig({ ...brushConfig, [name]: value });
  };

  return { brushConfig, handleConfigChange };
};
