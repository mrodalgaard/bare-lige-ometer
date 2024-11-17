import { Mode, modeZodType } from 'contexts/ThemeContext';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { ReactNode, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NumberParam, QueryParamProvider, StringParam, useQueryParam } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { setUserProperty } from 'util/analytics';
import { AppContext } from './AppContext';
import { QueryParameter } from './QueryParameter';
import { useMatchMedia } from './useMatchMedia';
import { useStorageState } from './useStorageState';

const AppContextProviderWithQueryParam = ({ children }: { children: ReactNode }) => {
  // Try to guess the users preferred color scheme as default mode
  const osMode = useMatchMedia('(prefers-color-scheme: dark)') ? Mode.dark : Mode.light;

  // Persist mode to local storage
  const [mode, setMode] = useStorageState('mode', modeZodType, osMode);

  const toggleMode = () => {
    setMode((mode) => (mode === Mode.light ? Mode.dark : Mode.light));
  };

  // Title and value are stored as query parameters
  const [title, setTitle] = useQueryParam(QueryParameter.title, StringParam);
  const [value, setValue] = useQueryParam(QueryParameter.value, NumberParam);

  // Check if the user prefers reduced motion
  const reducedMotion = !useMatchMedia('(prefers-reduced-motion: no-preference)');

  // Log mode changes to analytics
  useEffect(() => {
    setUserProperty(AnalyticsEvent.Mode, mode);
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
