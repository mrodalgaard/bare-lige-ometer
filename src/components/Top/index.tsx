import { CornerBanner } from 'components/CornerBanner';
import { ModeButton } from 'components/ModeButton';
import { ShareButton } from 'components/ShareButton';
import styled from 'styled-components';

const Space = styled.span`
  flex: 1;
`;

const Content = styled.div`
  display: flex;
  width: 100%;

  // Click through top bar
  pointer-events: none;
  & > *:not(${Space}) {
    pointer-events: auto;
  }

  // Move content below up on large displays
  ${({ theme }) => theme.mediaQueries.md} {
    position: absolute;
  }
`;

export const Top = () => {
  return (
    <Content>
      <ModeButton />
      <ShareButton />
      <Space />
      <CornerBanner />
    </Content>
  );
};
