import { ClickPosition } from 'models/ClickPosition';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { ClickEffectRipple } from './ClickEffectRipple';

const Container = styled.div`
  display: flex;
  cursor: pointer;
`;

export const ClickEffect = ({
  onClickPosition,
  children,
}: {
  onClickPosition: (position: ClickPosition) => void;
  children: ReactNode;
}) => {
  const [positions, setPositions] = useState<ClickPosition[]>([]);

  // Callback and add click position to state
  const onContentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const position: ClickPosition = [event.clientX, event.clientY];
    setPositions((prev) => [...prev, position]);
    onClickPosition(position);
  };

  return (
    <Container onClick={onContentClick}>
      {children}
      {positions.map((position, index) => (
        <ClickEffectRipple key={index} position={position} />
      ))}
    </Container>
  );
};
