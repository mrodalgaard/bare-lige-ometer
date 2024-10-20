import { useMemo } from 'react';
import { defaultContext } from './AppContext';
import { AppContextType } from './AppContextType';
import { LOCAL_STORAGE_KEY } from './constants';

export const useAppContextInitializer = () => {
  return useMemo<AppContextType>(() => {
    const state = { ...defaultContext };

    // Hydrate with persisted state from local storage
    const localStorageState = localStorage?.getItem(LOCAL_STORAGE_KEY);
    if (localStorageState) {
      const parsedState = JSON.parse(localStorageState);
      if (parsedState) {
        return parsedState;
      }
    }

    // Try to guess the users preferred color scheme
    if (typeof window !== 'undefined') {
      const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      state.mode = themeQuery.matches ? 'dark' : 'light';
    }

    return state;
  }, []);
};
