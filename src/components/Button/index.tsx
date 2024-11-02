import { MouseEvent, ReactNode, useState } from 'react';
import styled, { css, DefaultTheme, keyframes } from 'styled-components';
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

  // Hover color transition and wiggle animation
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

const fadeDownKeyframes = (props: { theme: DefaultTheme }) => keyframes`
  0% {
    opacity: 0;
    display: none;
    margin-top: -${props.theme.spacing(2)};
  }
  100% {
    opacity: 1;
    display: block;
    margin-top: ${props.theme.spacing(0)};
  }
`;

const ClickedLabel = styled.p<{ $clicked?: boolean }>`
  display: none;
  margin: 0;
  ${({ theme }) => theme.typography('body')};

  @media (prefers-reduced-motion: no-preference) {
    display: block;

    // Fade down and fade up animation depending on clicked state
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

  // Click callback and debounced click state
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
