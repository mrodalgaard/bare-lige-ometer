import { useLayoutEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type WindowSize = [number, number];

export const useDebouncedWindowSize = (debounce = 250) => {
  const [size, setSize] = useState<WindowSize>([innerWidth, innerHeight]);
  const [loading, setLoading] = useState(false);

  // Debounce size update
  const debouncedLoading = useDebouncedCallback((size: WindowSize) => {
    setSize(size);
    setLoading(false);
  }, debounce);

  // Update size on window resize
  useLayoutEffect(() => {
    const updateSize = () => {
      setLoading(true);
      debouncedLoading.callback([innerWidth, innerHeight]);
    };

    addEventListener('resize', updateSize);

    return () => {
      removeEventListener('resize', updateSize);
      debouncedLoading.cancel();
    };
  }, [debouncedLoading]);

  return { size, loading };
};
