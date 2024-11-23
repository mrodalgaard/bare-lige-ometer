import { Meter } from 'models/Meter';
import { decodeString, encodeString } from 'use-query-params';

export const MeterParam = {
  encode: (meter: Meter) => encodeString(meter),

  decode: (input: string | (string | null)[] | null | undefined) => {
    return Meter[decodeString(input) as keyof typeof Meter] ?? Meter.gauge;
  },
};
