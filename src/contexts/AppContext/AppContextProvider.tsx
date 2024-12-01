import { useMatchMedia } from 'hooks/useMatchMedia';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { Meter } from 'models/Meter';
import { ReactNode, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  createEnumParam,
  NumberParam,
  QueryParamProvider,
  StringParam,
  useQueryParam,
  withDefault,
} from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { setUserProperty } from 'util/analytics';
import { AppContext, defaultContext } from './AppContext';
import { QueryParameter } from './QueryParameter';
import { useToggleMode } from './useToggleMode';

const AppContextProviderWithQueryParam = ({ children }: { children: ReactNode }) => {
  // Persist and intelligently toggle app mode
  const { mode, toggleMode } = useToggleMode(defaultContext.mode);

  // Title, value and meter are stored as query parameters
  const [title, setTitle] = useQueryParam(QueryParameter.title, StringParam);
  const [value, setValue] = useQueryParam(QueryParameter.value, NumberParam);
  const [meter] = useQueryParam(
    QueryParameter.meter,
    withDefault(createEnumParam(Object.keys(Meter) as Meter[]), defaultContext.meter)
  );

  // Check if the user prefers reduced motion
  const reducedMotion = !useMatchMedia('(prefers-reduced-motion: no-preference)', defaultContext.reducedMotion);

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
