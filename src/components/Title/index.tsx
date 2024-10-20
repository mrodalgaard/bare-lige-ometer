import { AppContext } from 'contexts/AppContext';
import { useContext } from 'react';
import styled from 'styled-components';
import { APP_TITLE, METER_COLORS } from 'util/constants';
import { theme } from 'util/theme';

const Header = styled.h1`
  font-size: 80px;
  text-align: center;
  margin-bottom: 10px;
`;

const HeaderLink = styled.a`
  text-decoration: none;
  color: ${({ color }) => color};
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
    <header>
      <Header>
        <HeaderLink color={color} href="/">
          {APP_TITLE}
        </HeaderLink>
      </Header>
    </header>
  );
};
