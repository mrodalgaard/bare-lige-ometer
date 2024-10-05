import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderGauge = styled.div`
  background: ${({ theme }) => theme.colors.success};
  border-top-left-radius: 64px;
  border-top-right-radius: 64px;
  display: inline-block;
  width: 128px;
  height: 64px;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    background: ${({ theme }) => theme.colors.background};
    border-radius: 4px;
    position: absolute;
    left: 60px;
    top: 10px;
    width: 8px;
    height: 52px;
    transform-origin: 50% 100%;
    animation: loader-gauge 1000ms infinite;
  }

  &::after {
    content: '';
    background: ${({ theme }) => theme.colors.background};
    border-radius: 16px;
    position: absolute;
    left: 52px;
    top: 52px;
    width: 25px;
    height: 25px;
  }

  @keyframes loader-gauge {
    0% {
      transform: rotate(-80deg);
    }
    50% {
      transform: rotate(80deg);
    }
    100% {
      transform: rotate(-80deg);
    }
  }
`;

export const Loader = () => {
  return (
    <Container>
      <LoaderGauge />
    </Container>
  );
};
