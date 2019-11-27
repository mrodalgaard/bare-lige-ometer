import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import { useQueryParam, NumberParam } from "use-query-params";

import { meterColors } from "../util/constants";
import { capValue, getMeterColor } from "../util/helpers";

const Meter = () => {
  const [gaugeValue, setGaugeValue] = useState(0);
  const [paramValue, setParamValue] = useQueryParam("value", NumberParam);

  useEffect(() => {
    if (paramValue !== undefined) {
      setGaugeValue(capValue(paramValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setGaugeValue]);

  useEffect(() => {
    setParamValue(gaugeValue);
  }, [gaugeValue, setParamValue]);

  const updateGauge = (value: number) => {
    setGaugeValue(Math.round(capValue(value * 100)));
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
