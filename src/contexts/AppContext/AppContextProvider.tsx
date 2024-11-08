import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NumberParam, QueryParamProvider, StringParam, useQueryParam } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { setUserProperty } from 'util/analytics';
import { AppContext } from './AppContext';
import { LOCAL_STORAGE_KEY } from './constants';
import { QueryParameter } from './QueryParameter';
import { useAppContextInitializer } from './useAppContextInitializer';
import { useReducedMotion } from './useReducedMotion';

const AppContextProviderWithQueryParam = ({ children }: { children: ReactNode }) => {
  const initialState = useAppContextInitializer();

  // Title and value are stored as query parameters
  const [title, setTitle] = useQueryParam(QueryParameter.title, StringParam);
  const [value, setValue] = useQueryParam(QueryParameter.value, NumberParam);

  const reducedMotion = useReducedMotion();

  // Context state for mode
  const [mode, setMode] = useState(initialState.mode);
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Persist state when updated
  useEffect(() => {
    setUserProperty(AnalyticsEvent.Mode, mode);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ mode }));
  }, [mode]);

  return (
    <AppContext.Provider value={{ title, setTitle, value, setValue, mode, toggleMode, reducedMotion }}>
      {children}
    </AppContext.Provider>
  );
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <AppContextProviderWithQueryParam>{children}</AppContextProviderWithQueryParam>
      </QueryParamProvider>
    </BrowserRouter>
  );
};
