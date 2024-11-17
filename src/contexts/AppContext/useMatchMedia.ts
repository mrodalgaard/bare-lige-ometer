import { useEffect, useState } from 'react';

export const useMatchMedia = (query: string) => {
  const [match, setMatch] = useState(() => matchMedia?.(query).matches);

  useEffect(() => {
    const mediaQueryList = matchMedia?.(query);

    const listener = (event: MediaQueryListEvent) => {
      setMatch(event.matches);
    };

    mediaQueryList?.addEventListener('change', listener);

    return () => {
      mediaQueryList?.removeEventListener('change', listener);
    };
  }, [query]);

  return match;
};
