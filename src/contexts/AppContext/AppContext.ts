import { Mode } from 'contexts/ThemeContext';
import { Meter } from 'models/Meter';
import { createContext } from 'react';

interface AppContextType {
  title?: string | null;
  setTitle: (title?: string) => void;
  value?: number | null;
  setValue: (value?: number) => void;
  meter: Meter;
  mode: Mode;
  toggleMode: () => void;
  reducedMotion: boolean;
}

export const defaultContext: AppContextType = {
  setTitle: () => {},
  setValue: () => {},
  mode: Mode.system,
  meter: Meter.gauge,
  toggleMode: () => {},
  reducedMotion: false,
};

export const AppContext = createContext<AppContextType>(defaultContext);
