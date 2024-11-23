import { ClickEffect } from 'components/ClickEffect';
import { Gauge } from 'gaugeJS';
import { ClickPosition } from 'models/ClickPosition';
import { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { METER_MAX, METER_MIN } from 'util/constants';
import { useMeter } from './useMeter';

const StyledCanvas = styled.canvas`
  flex: 1;
  max-height: calc(100vh - 260px);
  width: 100%;
`;

const calculateGaugeAngle = (rect: DOMRect | undefined, position: ClickPosition) => {
  // Get gauge coordinate and dimensions
  const { x, y, width, height } = rect ?? { x: 0, y: 0, width: 0, height: 0 };

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

export const MeterGauge = () => {
  const {
    colors: { primary, meter },
  } = useTheme();

  const { meterValue, updateMeterValue, reducedMotion } = useMeter();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gaugeRef = useRef<typeof Gauge>(null);

  const onContentClick = (position: ClickPosition) => {
    const angle = calculateGaugeAngle(canvasRef.current?.getBoundingClientRect(), position);
    // Update gauge by percentage of angle
    updateMeterValue((angle / 180) * 100);
  };

  // Update gauge when meter value changes
  useEffect(() => {
    gaugeRef?.current?.set(meterValue ?? METER_MIN);
  }, [meterValue]);

  // Create gauge
  useEffect(() => {
    // Calculate gauge colors based on meter color percents
    const staticZones = meter.map((color, index) => ({
      strokeStyle: color,
      min: Math.floor(index * (100 / meter.length)),
      max: Math.ceil((index + 1) * (100 / meter.length)),
    }));

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
      staticZones,
    };

    const gauge = new Gauge(canvasRef.current).setOptions(options);
    gauge.minValue = METER_MIN;
    gauge.maxValue = METER_MAX;
    gauge.animationSpeed = reducedMotion ? 1 : 100;
    gauge.set(METER_MIN);
    gaugeRef.current = gauge;
  }, [primary, meter, reducedMotion]);

  return (
    <ClickEffect onClickPosition={onContentClick}>
      <StyledCanvas
        ref={canvasRef}
        role="meter"
        aria-valuenow={meterValue ?? METER_MIN}
        aria-valuemin={METER_MIN}
        aria-valuemax={METER_MAX}
        aria-label="Percentage meter"
      />
    </ClickEffect>
  );
};
