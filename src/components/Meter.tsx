import { Gauge } from "gaugeJS";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { NumberParam, useQueryParam } from "use-query-params";
import { capValue, getMeterColorPercents } from "../util/helpers";
import { Colors } from "../util/theme";

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
  const [paramValue, setParamValue] = useQueryParam("value", NumberParam);

  const canvas = useRef<HTMLCanvasElement>(null);
  const gauge = useRef<any>(null);

  useEffect(() => {
    if (paramValue !== undefined) {
      setGaugeValue(capValue(paramValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setGaugeValue]);

  useEffect(() => {
    setParamValue(gaugeValue);

    if (gauge && gauge.current) {
      gauge.current.set(gaugeValue);
    }
  }, [gaugeValue, setParamValue]);

  const updateGauge = (value: number) =>
    setGaugeValue(Math.round(capValue(value * 100)));

  const onContentClick = (event: MouseEvent) =>
    updateGauge(event.clientX / window.screen.width);

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

    gauge.current = new Gauge(canvas.current).setOptions(options);
    gauge.current.maxValue = 100;
    gauge.current.setMinValue(0);
    gauge.current.set(0);
  }, []);

  return (
    <Container onClick={onContentClick}>
      <canvas ref={canvas}></canvas>
    </Container>
  );
};

export default Meter;
