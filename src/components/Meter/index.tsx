import { AppContext } from 'contexts/AppContext';
import { Meter as MeterType } from 'models/Meter';
import { useContext } from 'react';
import { MeterGauge } from './MeterGauge';
import { MeterNumber } from './MeterNumber';

export const Meter = () => {
  const { meter } = useContext(AppContext);

  return meter === MeterType.number ? <MeterNumber /> : <MeterGauge />;
};
