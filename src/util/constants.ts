import { Colors } from "./theme";

export const meterColors = [Colors.Success, Colors.Warning, Colors.Error];

export const getMeterColor = (percentage: number) => {
  const index = Math.floor(meterColors.length * percentage);
  return meterColors[index];
};

export const githubLink = "https://github.com/mrodalgaard/bare-lige-ometer.git";
