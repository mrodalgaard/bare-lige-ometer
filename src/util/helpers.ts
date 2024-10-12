import { MeterColorPercent } from 'models/MeterColorPercent';
import { METER_COLORS } from './constants';

export const getMeterColor = (percentage: number): string => {
  const index = Math.floor(METER_COLORS.length * (percentage / 100));
  return METER_COLORS[Math.min(index, METER_COLORS.length - 1)];
};

export const getMeterColorPercents = (): MeterColorPercent[] => {
  return METER_COLORS.map((color, index) => ({
    strokeStyle: color,
    min: Math.floor(index * (100 / METER_COLORS.length)),
    max: Math.ceil((index + 1) * (100 / METER_COLORS.length)),
  }));
};

export const capValue = (value: number): number => {
  return Math.min(100, Math.max(0, value));
};
