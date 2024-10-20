import { ClickEffect } from 'components/ClickEffect';
import { AppContext } from 'contexts/AppContext';
import { Gauge } from 'gaugeJS';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { ClickPosition } from 'models/ClickPosition';
import { MeterColorPercent } from 'models/MeterColorPercent';
import { useContext, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { logEvent } from 'util/analytics';
import { METER_COLORS } from 'util/constants';

const Number = styled.p`
  font-size: 190px;
  color: ${({ theme }) => theme.colors.header};
  width: 100%;
  margin: 10px;
  text-align: center;
`;

const StyledCanvas = styled.canvas`
  flex: 1;
  max-height: calc(100vh - 260px);
  width: 100%;
`;

const getMeterColorPercents = (): MeterColorPercent[] => {
  return METER_COLORS.map((color, index) => ({
    strokeStyle: color,
    min: Math.floor(index * (100 / METER_COLORS.length)),
    max: Math.ceil((index + 1) * (100 / METER_COLORS.length)),
  }));
};

const capValue = (value: number): number => {
  return Math.min(100, Math.max(0, value));
};

export const Meter = ({ showAsNumber = false }: { showAsNumber?: boolean }) => {
  const {
    colors: { header },
  } = useTheme();
  const [gaugeValue, setGaugeValue] = useState(0);
  const { value, setValue } = useContext(AppContext);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gaugeRef = useRef<typeof Gauge>(null);

  // Set gauge value to query parameter after render
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setGaugeValue(capValue(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update query parameter and gauge when value changes
  useEffect(() => {
    setValue(gaugeValue || undefined);
    gaugeRef?.current?.set(gaugeValue);
  }, [gaugeValue, setValue]);

  const updateGauge = (value: number) => {
    const percent = Math.round(capValue(value * 100));
    setGaugeValue(percent);
    logEvent(AnalyticsEvent.ValueChange, { value: percent });
  };

  const onContentClick = (position: ClickPosition) => {
    updateGauge(position[0] / window.innerWidth);
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
        color: header,
      },
      limitMax: false,
      limitMin: true,
      highDpiSupport: true,
      staticZones: getMeterColorPercents(),
    };

    const gauge = new Gauge(canvasRef.current).setOptions(options);
    gauge.maxValue = 100;
    gauge.minValue = 0;
    gauge.animationSpeed = 100;
    gauge.set(0);
    gaugeRef.current = gauge;
  }, [header, showAsNumber]);

  return (
    <ClickEffect onClickPosition={onContentClick}>
      {showAsNumber ? <Number>{gaugeValue}%</Number> : <StyledCanvas ref={canvasRef}></StyledCanvas>}
    </ClickEffect>
  );
};
