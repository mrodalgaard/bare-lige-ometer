import { useMatchMedia } from 'hooks/useMatchMedia';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { ReactNode, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NumberParam, QueryParamProvider, StringParam, useQueryParam } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { setUserProperty } from 'util/analytics';
import { AppContext } from './AppContext';
import { MeterParam } from './MeterParam';
import { QueryParameter } from './QueryParameter';
import { useToggleMode } from './useToggleMode';

const AppContextProviderWithQueryParam = ({ children }: { children: ReactNode }) => {
  // Persist and intelligently toggle app mode
  const { mode, toggleMode } = useToggleMode();

  // Title and value are stored as query parameters
  const [title, setTitle] = useQueryParam(QueryParameter.title, StringParam);
  const [value, setValue] = useQueryParam(QueryParameter.value, NumberParam);
  const [meter] = useQueryParam(QueryParameter.meter, MeterParam);

  // Check if the user prefers reduced motion
  const reducedMotion = !useMatchMedia('(prefers-reduced-motion: no-preference)');

  // Log mode changes to analytics
  useEffect(() => {
    setUserProperty(AnalyticsEvent.Mode, mode);
  }, [mode]);

  return (
    <AppContext.Provider value={{ title, setTitle, value, setValue, meter, mode, toggleMode, reducedMotion }}>
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
