import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ClickPosition } from 'util/ClickPosition';

const Container = styled.div`
  display: flex;
  cursor: pointer;
`;

const StyledClick = styled.div<{ $position: ClickPosition }>`
  top: ${({ $position }) => $position[1]}px;
  left: ${({ $position }) => $position[0]}px;

  position: fixed;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.header};
  border-radius: 50%;
  animation: clickEffect 0.4s ease-out;

  @keyframes clickEffect {
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

export const ClickEffect = ({
  onClickPosition,
  children,
}: {
  onClickPosition: (position: ClickPosition) => void;
  children: ReactNode;
}) => {
  const [clickPosition, setClickPosition] = useState<ClickPosition | undefined>();

  useEffect(() => {
    if (clickPosition) {
      onClickPosition(clickPosition);
    }
  }, [clickPosition, onClickPosition]);

  const onContentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setClickPosition([event.clientX, event.clientY]);
  };

  return (
    <Container onClick={onContentClick}>
      {children}
      {clickPosition && <StyledClick $position={clickPosition} onAnimationEnd={() => setClickPosition(undefined)} />}
    </Container>
  );
};
