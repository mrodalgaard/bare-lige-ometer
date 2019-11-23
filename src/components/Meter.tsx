import React, { useState } from "react";
import GaugeChart from "react-gauge-chart";

import { meterColors, getMeterColor } from "../util/constants";

const Meter = () => {
  const [gaugeValue, setGaugeValue] = useState(0);

  const updateGauge = (value: number) => {
    const capValue = Math.min(100, Math.max(0, value * 100));
    setGaugeValue(Math.round(capValue) / 100);
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
        percent={gaugeValue}
      />
    </div>
  );
};

export default Meter;
