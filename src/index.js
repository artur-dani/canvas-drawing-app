import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { CanvasProvider } from './context/CanvasContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <CanvasProvider>
      <App />
    </CanvasProvider>
  </StrictMode>
);
