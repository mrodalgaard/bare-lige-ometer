import { App } from 'features/App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'reset.css';
import { monitorPerformance } from 'util/firebase';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

monitorPerformance();
