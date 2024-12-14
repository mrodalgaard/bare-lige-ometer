declare const __APP_NAME__: string;
declare const __APP_VERSION__: string;
declare const __APP_GIT__: string;

declare module 'gaugeJS' {
  export class Gauge {
    animationSpeed: number;
    minValue: number;
    maxValue: number;

    constructor(target: HTMLElement | null);
    set(val: number): void;
    setOptions(opts?: GaugeOptions): Gauge;
  }

  interface Pointer {
    color: string;
    length: number;
    strokeWidth: number;
  }

  interface StaticZone {
    max: number;
    min: number;
    strokeStyle: string;
  }

  export interface GaugeOptions {
    angle?: number;
    highDpiSupport?: boolean;
    limitMax?: boolean;
    limitMin?: boolean;
    lineWidth?: number;
    pointer?: Pointer;
    radiusScale?: number;
    staticZones?: StaticZone[];
  }
}
