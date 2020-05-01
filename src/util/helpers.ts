import { meterColors } from "./constants";
import { MeterColorPercent } from "./types";

export const getMeterColor = (percentage: number): string => {
  const index = Math.floor(meterColors.length * (percentage / 100));
  return meterColors[Math.min(index, meterColors.length - 1)];
};

export const getMeterColorPercents = (): MeterColorPercent[] => {
  return meterColors.map((color, index) => ({
    strokeStyle: color,
    min: Math.floor(index * (100 / meterColors.length)),
    max: Math.ceil((index + 1) * (100 / meterColors.length)),
  }));
};

export const capValue = (value: number): number => {
  return Math.min(100, Math.max(0, value));
};
