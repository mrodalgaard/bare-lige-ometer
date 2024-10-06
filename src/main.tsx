import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from 'features/App';
import './index.css';
import { reportWebVitals } from 'reportWebVitals';
import { logWebVitals } from 'util/analytics';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

reportWebVitals(logWebVitals);
