import { Mode } from 'contexts/ThemeContext';
import { createContext } from 'react';

interface AppContextType {
  title?: string | null;
  setTitle: (title?: string) => void;
  value?: number | null;
  setValue: (value?: number) => void;
  mode: Mode;
  toggleMode: () => void;
  reducedMotion: boolean;
}

export const defaultContext: AppContextType = {
  setTitle: () => {},
  setValue: () => {},
  mode: Mode.system,
  toggleMode: () => {},
  reducedMotion: false,
};

export const AppContext = createContext<AppContextType>(defaultContext);
