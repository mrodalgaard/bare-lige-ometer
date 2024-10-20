import { MouseEvent, ReactNode, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useDebouncedCallback } from 'use-debounce';

const wiggleKeyframes = keyframes`
  0% {
    transform: rotateZ(3deg);
  }
  15% {
    transform: rotateZ(-10deg);
  }
  20% {
    transform: rotateZ(7deg);
  }
  25% {
    transform: rotateZ(-8deg);
  }
  30% {
    transform: rotateZ(5deg);
  }
  35% {
    transform: rotateZ(-2deg);
  }
  40%,
  100% {
    transform: rotateZ(0);
  }
`;

const StyledButton = styled.button`
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  background: transparent;
  cursor: pointer;

  &:hover {
    svg {
      color: ${({ theme }) => theme.colors.success};
      transition: color 0.5s ease;

      @media (prefers-reduced-motion: no-preference) {
        animation: 1.5s ease-in ${wiggleKeyframes};
      }
    }
  }

  &:active {
    scale: 1.1;
  }
`;

const fadeDownKeyframes = keyframes`
  0% {
    opacity: 0;
    display: none;
    margin-top: -14px;
  }
  100% {
    opacity: 1;
    display: block;
    margin-top: 0;
  }
`;

const ClickedLabel = styled.p<{ $clicked?: boolean }>`
  display: none;
  margin: 0;
  font-size: 14px;

  @media (prefers-reduced-motion: no-preference) {
    display: block;

    ${({ $clicked }) => {
      switch ($clicked) {
        case true:
          return css`
            animation: 0.3s ease forwards ${fadeDownKeyframes};
          `;
        case false:
          return css`
            animation: 0.3s ease reverse forwards ${fadeDownKeyframes};
          `;
        default:
          return css`
            display: none;
          `;
      }
    }}
  }

  /* @media (prefers-reduced-motion: reduce) {
    display: none;
  } */
`;

export const Button = ({
  clickedText,
  debounce = 3000,
  onClick,
  children,
}: {
  clickedText?: string;
  debounce?: number;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  children: ReactNode;
}) => {
  const [clicked, setClicked] = useState<boolean>();

  const debouncedClick = useDebouncedCallback(() => {
    setClicked(false);
  }, debounce);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setClicked(true);
    debouncedClick.callback();
    onClick?.(event);
  };

  return (
    <StyledButton onClick={handleClick}>
      {children}
      <ClickedLabel $clicked={clicked} key={clicked?.toString()}>
        {clickedText}
      </ClickedLabel>
    </StyledButton>
  );
};
