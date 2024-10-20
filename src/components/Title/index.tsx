import { AppContext } from 'contexts/AppContext';
import { useContext } from 'react';
import styled from 'styled-components';
import { APP_TITLE, METER_COLORS } from 'util/constants';
import { theme } from 'util/theme';

const Content = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: 0.5em;
`;

const H1 = styled.h1`
  font-size: clamp(2rem, 5vw + 1rem, 8rem);
  margin-bottom: 0;
`;

const HeaderLink = styled.a`
  color: ${({ color }) => color};
  text-decoration: none;
`;

const SubtitleLink = styled.a`
  color: ${({ theme }) => theme.colors.success};
  font-size: clamp(0.5rem, 1vw + 0.2rem, 1rem);
  margin-top: -6px;
`;

const getMeterColor = (percentage: number | undefined | null): string => {
  if (percentage === undefined || percentage === null) {
    return theme.colors.header;
  }
  const index = Math.floor(METER_COLORS.length * (percentage / 100));
  return METER_COLORS[Math.min(index, METER_COLORS.length - 1)];
};

export const Title = () => {
  const { value } = useContext(AppContext);

  const color = getMeterColor(value);

  return (
    <Content>
      <Header>
        <H1>
          <HeaderLink color={color} href="/">
            {APP_TITLE}
          </HeaderLink>
        </H1>
        <SubtitleLink href="https://hinative.com/questions/18846371">What is 'bare lige'?</SubtitleLink>
      </Header>
    </Content>
  );
};
