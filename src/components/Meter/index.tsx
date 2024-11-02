import { ClickEffect } from 'components/ClickEffect';
import { AppContext } from 'contexts/AppContext';
import { Gauge } from 'gaugeJS';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { ClickPosition } from 'models/ClickPosition';
import { useContext, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { logEvent } from 'util/analytics';
import { useMeterColorPercents } from './useMeterColorPercents';

const Number = styled.p`
  ${({ theme }) => theme.typography('title')};
  color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  margin: ${({ theme }) => theme.spacing(1)};
  text-align: center;
`;

const StyledCanvas = styled.canvas`
  flex: 1;
  max-height: calc(100vh - 260px);
  width: 100%;
`;

const MIN_VALUE = 0;
const MAX_VALUE = 100;

const capValue = (value: number): number => {
  return Math.min(MAX_VALUE, Math.max(MIN_VALUE, value));
};

export const Meter = ({ showAsNumber = false }: { showAsNumber?: boolean }) => {
  const {
    colors: { primary },
  } = useTheme();
  const meterColorPercents = useMeterColorPercents();

  const [gaugeValue, setGaugeValue] = useState<number>();
  const { value, setValue, reducedMotion } = useContext(AppContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gaugeRef = useRef<typeof Gauge>(null);

  // Set gauge value to query parameter after render
  useEffect(() => {
    if (value !== undefined && value !== null && !isNaN(value)) {
      setGaugeValue(capValue(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update query parameter and gauge when value changes
  useEffect(() => {
    setValue(gaugeValue);
    gaugeRef?.current?.set(gaugeValue ?? MIN_VALUE);
  }, [gaugeValue, setValue]);

  const updateGauge = (value: number) => {
    const percent = Math.round(capValue(value * 100));
    setGaugeValue(percent);
    logEvent(AnalyticsEvent.ValueChange, { value: percent });
  };

  const onContentClick = (position: ClickPosition) => {
    updateGauge(position[0] / innerWidth);
  };

  // Create gauge
  useEffect(() => {
    if (showAsNumber) {
      return;
    }

    const options = {
      angle: 0,
      lineWidth: 0.4,
      radiusScale: 1,
      pointer: {
        length: 0.55,
        strokeWidth: 0.1,
        color: primary,
      },
      limitMax: false,
      limitMin: true,
      highDpiSupport: true,
      staticZones: meterColorPercents,
    };

    const gauge = new Gauge(canvasRef.current).setOptions(options);
    gauge.maxValue = MAX_VALUE;
    gauge.minValue = MIN_VALUE;
    gauge.animationSpeed = reducedMotion ? 1 : 100;
    gauge.set(MIN_VALUE);
    gaugeRef.current = gauge;
  }, [primary, meterColorPercents, showAsNumber, reducedMotion]);

  return (
    <ClickEffect onClickPosition={onContentClick}>
      {showAsNumber ? (
        <Number>{gaugeValue ?? MIN_VALUE}%</Number>
      ) : (
        <StyledCanvas
          ref={canvasRef}
          role="meter"
          aria-valuenow={gaugeValue ?? MIN_VALUE}
          aria-valuemin={MIN_VALUE}
          aria-valuemax={MAX_VALUE}
          aria-label="Percentage meter"
        ></StyledCanvas>
      )}
    </ClickEffect>
  );
};
