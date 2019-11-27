import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import { useQueryParam, NumberParam } from "use-query-params";

import { meterColors, getMeterColor } from "../util/constants";

const Meter = () => {
  const [gaugeValue, setGaugeValue] = useState(0);
  const [paramValue, setParamValue] = useQueryParam("value", NumberParam);

  useEffect(() => {
    if (paramValue !== undefined) {
      setGaugeValue(paramValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setGaugeValue]);

  useEffect(() => {
    setParamValue(gaugeValue);
  }, [setParamValue, gaugeValue]);

  const updateGauge = (value: number) => {
    const capValue = Math.min(100, Math.max(0, value * 100));
    setGaugeValue(Math.round(capValue));
  };

  const onContentClick = (event: any) => {
    const xPosition = event.screenX;
    const width = (window as any).screen.width;
    updateGauge(xPosition / width);
  };

  return (
    <div onClick={onContentClick}>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={3}
        textColor={getMeterColor(gaugeValue)}
        colors={meterColors}
        percent={gaugeValue / 100}
      />
    </div>
  );
};

export default Meter;
