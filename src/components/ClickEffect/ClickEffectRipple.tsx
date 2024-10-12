import { ClickPosition } from 'models/ClickPosition';
import { useState } from 'react';
import styled from 'styled-components';

const ClickRipple = styled.div<{ $position: ClickPosition }>`
  top: ${({ $position }) => $position[1]}px;
  left: ${({ $position }) => $position[0]}px;

  position: fixed;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.header};
  border-radius: 50%;
  animation: clickRipple 0.4s ease-out;

  @keyframes clickRipple {
    0% {
      opacity: 1;
      width: 0;
      height: 0;
      margin: 0;
      border-width: 5px;
    }
    100% {
      opacity: 0.2;
      width: 240px;
      height: 240px;
      margin: -120px;
      border-width: 0;
    }
  }
`;

export const ClickEffectRipple = ({ position }: { position: ClickPosition }) => {
  const [animated, setAnimated] = useState(false);

  if (animated) {
    return null;
  }
  return <ClickRipple $position={position} onAnimationEnd={() => setAnimated(true)} />;
};
