import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import App from './App';
import App1 from './App1';
import { CanvasProvider } from './context/CanvasContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    {/* <CanvasProvider> */}
    <App1 />
    {/* </CanvasProvider> */}
  </StrictMode>
);
