import { ClickEffect } from 'components/ClickEffect';
import { useMeterColor } from 'hooks/useMeterColor';
import { ClickPosition } from 'models/ClickPosition';
import { useState } from 'react';
import CountUp from 'react-countup';
import styled from 'styled-components';
import { METER_MIN } from 'util/constants';
import { useMeter } from './useMeter';

const Number = styled(CountUp)<{ color: string }>`
  ${({ theme }) => theme.typography('title')};
  color: ${({ color }) => color};
  width: 100%;
  margin: ${({ theme }) => theme.spacing(1)};
  text-align: center;

  @media (prefers-reduced-motion: no-preference) {
    transition: color 1s ease;
  }
`;

const calculateMeterValue = (position: ClickPosition) => {
  return position[0] / innerWidth;
};

export const MeterNumber = () => {
  const { meterValue, updateMeterValue, reducedMotion } = useMeter();
  const [prevMeterValue, setPrevMeterValue] = useState<number | undefined>();

  const color = useMeterColor(meterValue);

  const onContentClick = (position: ClickPosition) => {
    // Update number according to click position in window
    updateMeterValue(calculateMeterValue(position) * 100);
  };

  return (
    <ClickEffect onClickPosition={onContentClick}>
      <Number
        start={prevMeterValue ?? METER_MIN}
        end={meterValue ?? METER_MIN}
        duration={reducedMotion ? 0 : 2}
        onEnd={() => setPrevMeterValue(meterValue)}
        suffix="%"
        color={color}
      />
    </ClickEffect>
  );
};
