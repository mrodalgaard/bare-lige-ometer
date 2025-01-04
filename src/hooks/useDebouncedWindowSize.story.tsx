import { useDebouncedWindowSize } from './useDebouncedWindowSize';

export const DebouncedWindowSizeStory = () => {
  const { size, loading } = useDebouncedWindowSize();

  return (
    <>
      <p>TEST</p>
      <h1 data-testid="size">{JSON.stringify(size)}</h1>
      {loading && <h1 data-testid="loading">Loading</h1>}
    </>
  );
};
