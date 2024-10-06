import styled from 'styled-components';
import { APP_TITLE } from 'util/constants';

const Header = styled.h1`
  font-size: 80px;
  color: ${({ theme }) => theme.colors.header};
  text-align: center;
  margin-bottom: 10px;
`;

export const Title = () => {
  return (
    <header>
      <Header>{APP_TITLE}</Header>
    </header>
  );
};
