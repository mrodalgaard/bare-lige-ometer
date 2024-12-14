import { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { METER_MAX } from 'util/constants';

export const useMeterColor = (value: number | undefined | null) => {
  const {
    colors: { meter, primary },
  } = useTheme();

  return useMemo(() => {
    if (value === undefined || value === null) {
      return primary;
    }
    const index = Math.floor(meter.length * (value / METER_MAX));
    return meter[Math.min(index, meter.length - 1)];
  }, [value, meter, primary]);
};
