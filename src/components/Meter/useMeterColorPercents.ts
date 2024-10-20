import { useMemo } from 'react';
import { useTheme } from 'styled-components';

export const useMeterColorPercents = () => {
  const {
    colors: { meter },
  } = useTheme();

  return useMemo(
    () =>
      meter.map((color, index) => ({
        strokeStyle: color,
        min: Math.floor(index * (100 / meter.length)),
        max: Math.ceil((index + 1) * (100 / meter.length)),
      })),
    [meter]
  );
};
