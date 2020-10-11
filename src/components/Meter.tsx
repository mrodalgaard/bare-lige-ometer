import { Gauge } from "gaugeJS";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { NumberParam, useQueryParam } from "use-query-params";
import { capValue, getMeterColorPercents } from "../util/helpers";
import { Colors } from "../util/theme";
import { QueryParameter } from "../util/types";

const Container = styled.div`
  display: flex;

  canvas {
    flex: 1;
    max-height: calc(100vh - 260px);
    width: 100%;
  }
`;

const Meter = () => {
  const [gaugeValue, setGaugeValue] = useState(0);
  const [paramValue, setParamValue] = useQueryParam(
    QueryParameter.value,
    NumberParam
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gaugeRef = useRef<any>(null);

  // Set gauge value to query parameter after render
  useEffect(() => {
    if (paramValue !== undefined && paramValue !== null) {
      setGaugeValue(capValue(paramValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setGaugeValue]);

  // Update query parameter and gauge when value changes
  useEffect(() => {
    setParamValue(gaugeValue || undefined);
    gaugeRef?.current?.set(gaugeValue);
  }, [gaugeValue, setParamValue]);

  const updateGauge = (value: number) =>
    setGaugeValue(Math.round(capValue(value * 100)));

  const onContentClick = (event: MouseEvent) =>
    updateGauge(event.clientX / window.innerWidth);

  useEffect(() => {
    const options = {
      angle: 0,
      lineWidth: 0.4,
      radiusScale: 1,
      pointer: {
        length: 0.55,
        strokeWidth: 0.1,
        color: Colors.Header,
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
  }, []);

  return (
    <Container onClick={onContentClick}>
      <canvas ref={canvasRef}></canvas>
    </Container>
  );
};

export default Meter;
