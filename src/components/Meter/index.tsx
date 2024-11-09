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

const minMaxValue = (value: number): number => {
  return Math.min(MAX_VALUE, Math.max(MIN_VALUE, Math.round(value)));
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
      setGaugeValue(minMaxValue(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update query parameter and gauge when value changes
  useEffect(() => {
    setValue(gaugeValue);
    gaugeRef?.current?.set(gaugeValue ?? MIN_VALUE);
  }, [gaugeValue, setValue]);

  const updateGauge = (percent: number) => {
    const value = minMaxValue(percent);
    setGaugeValue(value);
    logEvent(AnalyticsEvent.ValueChange, { value });
  };

  const calculateAngle = (position: ClickPosition) => {
    // Get gauge coordinate and dimensions
    const { x, y, width, height } = canvasRef.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };

    // Get center of gauge pin (compensate for pin offset from bottom)
    const centerX = width / 2;
    const centerY = height * 0.9;

    // Calculate angle of click from center of gauge
    const diffX = position[0] - x - centerX;
    const diffY = position[1] - y - centerY;
    const angle = Math.atan2(-diffY, diffX) * (180 / Math.PI);

    // Solve click below gauge by normalizing angle to 0-180
    if (angle < -90) {
      return 0;
    }

    // Invert angle to match gauge direction
    return 180 - angle;
  };

  const onContentClick = (position: ClickPosition) => {
    // Update gauge by percentage of angle
    updateGauge(calculateAngle(position) / 1.8);
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
    gauge.minValue = MIN_VALUE;
    gauge.maxValue = MAX_VALUE;
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
