import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import { Theme } from '../../theme_light';

const Title = styled.h1`
  color: ${(props: { theme: Theme }) => props.theme.fontColor};
  font-size: 36px;
  margin-bottom: 25px;
  font-weight: 500;
`;

export default withTheme(Title);
