export interface ShareData {
  title: string;
  text?: string;
  url: string;
}

export interface MeterColorPercent {
  strokeStyle: string;
  min: number;
  max: number;
}

export enum QueryParameter {
  title = "title",
  value = "value",
}
