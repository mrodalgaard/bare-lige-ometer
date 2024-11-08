import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';

type Value<T extends z.ZodType> = z.infer<T>;

export const useStorageState = <T extends z.ZodType<unknown>>(
  key: string,
  zodType: T,
  initialState: Value<T> | (() => Value<T>)
) => {
  // Rehydrate and validate persisted state from local storage
  const persistedState = useMemo<Value<T> | undefined>(() => {
    try {
      const data = JSON.parse(localStorage?.getItem(key) ?? '');
      return zodType.parse(data);
    } catch {
      return undefined;
    }
  }, [key, zodType]);

  // Hooked react state for storage state
  const [state, setState] = useState(persistedState ?? initialState);

  // Persist state when updated
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};
