import { App } from 'features/App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { monitorPerformance } from 'util/firebase';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

monitorPerformance();
