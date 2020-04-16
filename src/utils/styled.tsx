import styled, { CreateStyled } from '@emotion/styled';
import theme from '../theme';

type Theme = typeof theme.light;

export default styled as CreateStyled<Theme>;
