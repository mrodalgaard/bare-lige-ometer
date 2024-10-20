import { AppContext } from 'contexts/AppContext';
import { useContext, useMemo } from 'react';
import { useTheme } from 'styled-components';

export const useMeterColor = () => {
  const { value } = useContext(AppContext);
  const {
    colors: { meter, primary },
  } = useTheme();

  return useMemo(() => {
    if (value === undefined || value === null) {
      return primary;
    }
    const index = Math.floor(meter.length * (value / 100));
    return meter[Math.min(index, meter.length - 1)];
  }, [value, meter, primary]);
};
