import { AppContext } from 'contexts/AppContext';
import { useMeterColor } from 'hooks/useMeterColor';
import { useContext } from 'react';
import styled from 'styled-components';
import { APP_TITLE } from 'util/constants';

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const H1 = styled.h1`
  font-size: clamp(2rem, 5vw + 1rem, 8rem);
  margin-bottom: 0;
`;

const HeaderLink = styled.a`
  color: ${({ color }) => color};
  text-decoration: none;
  transition: color 1s ease;
`;

const SubtitleLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: clamp(0.5rem, 1vw + 0.2rem, 1rem);
  margin-top: -${({ theme }) => theme.spacing(1)};
`;

export const Title = () => {
  const { value } = useContext(AppContext);

  const color = useMeterColor(value);

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
