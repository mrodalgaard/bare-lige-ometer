import { Gauge } from 'gaugeJS';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { NumberParam, useQueryParam } from 'use-query-params';
import { AnalyticsEvent, logEvent } from 'util/analytics';
import { QueryParameter } from 'util/custom-types';
import { capValue, getMeterColorPercents } from 'util/helpers';

const Container = styled.div`
  display: flex;
  cursor: pointer;

  canvas {
    flex: 1;
    max-height: calc(100vh - 260px);
    width: 100%;
  }
`;

const Number = styled.p`
  font-size: 190px;
  color: ${({ theme }) => theme.colors.header};
  width: 100%;
  margin: 10px;
  text-align: center;
`;

interface IProps {
  showAsNumber?: boolean;
}

export const Meter = ({ showAsNumber = false }: IProps) => {
  const {
    colors: { header },
  } = useTheme();
  const [gaugeValue, setGaugeValue] = useState(0);
  const [paramValue, setParamValue] = useQueryParam(QueryParameter.value, NumberParam);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gaugeRef = useRef<typeof Gauge>(null);

  // Set gauge value to query parameter after render
  useEffect(() => {
    if (paramValue !== undefined && paramValue !== null) {
      setGaugeValue(capValue(paramValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update query parameter and gauge when value changes
  useEffect(() => {
    setParamValue(gaugeValue || undefined);
    gaugeRef?.current?.set(gaugeValue);
  }, [gaugeValue, setParamValue]);

  const updateGauge = (value: number) => {
    const percent = Math.round(capValue(value * 100));
    setGaugeValue(percent);
    logEvent(AnalyticsEvent.ValueChange, { value: percent });
  };

  const onContentClick = (event: MouseEvent) => {
    updateGauge(event.clientX / window.innerWidth);
  };

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

    gaugeRef.current = new Gauge(canvasRef.current).setOptions(options);
    gaugeRef.current.maxValue = 100;
    gaugeRef.current.setMinValue(0);
    gaugeRef.current.set(0);
  }, [header, showAsNumber]);

  return (
    <Container onClick={onContentClick}>
      {showAsNumber ? <Number>{gaugeValue}%</Number> : <canvas ref={canvasRef}></canvas>}
    </Container>
  );
};
