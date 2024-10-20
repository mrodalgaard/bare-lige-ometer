import { createContext } from 'react';

interface AppContextType {
  title?: string | null;
  setTitle: (title?: string) => void;
  value?: number | null;
  setValue: (value?: number) => void;
}

export const AppContext = createContext<AppContextType>({
  setTitle: () => {},
  setValue: () => {},
});
