import { meterColors } from "./constants";

export const getMeterColor = (percentage: number) => {
  const index = Math.floor(meterColors.length * (percentage / 100));
  return meterColors[Math.min(index, meterColors.length - 1)];
};

export const capValue = (value: number) => {
  return Math.min(100, Math.max(0, value));
};
