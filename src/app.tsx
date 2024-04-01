import React from 'react';
import { createRoot } from 'react-dom/client';

import MainMarkup from './mainMarkup';

const rootElement = document.getElementById('root');

if (rootElement !== null) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <MainMarkup />
    </React.StrictMode>,
  );
}
