import { AppContext } from 'contexts/AppContext';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { useContext, useEffect, useState } from 'react';
import { logEvent } from 'util/analytics';
import { METER_MAX, METER_MIN } from 'util/constants';

export const useMeter = () => {
  const [meterValue, setMeterValue] = useState<number>();
  const { value, setValue, reducedMotion } = useContext(AppContext);

  const checkAndUpdateMeterValue = (value: number) => {
    const newMeterValue = Math.min(METER_MAX, Math.max(METER_MIN, Math.round(value)));
    setMeterValue(newMeterValue);
    return newMeterValue;
  };

  // Set gauge value to query parameter after render
  useEffect(() => {
    if (value !== undefined && value !== null && !isNaN(value)) {
      checkAndUpdateMeterValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update query parameter when meter value changes
  useEffect(() => {
    setValue(meterValue);
  }, [meterValue, setValue]);

  const updateMeterValue = (value: number) => {
    const newMeterValue = checkAndUpdateMeterValue(value);
    logEvent(AnalyticsEvent.ValueChange, { newMeterValue });
  };

  return { meterValue, updateMeterValue, reducedMotion };
};
