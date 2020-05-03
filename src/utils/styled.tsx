import styled, { CreateStyled } from '@emotion/styled';
import theme from '../theme';

export type Theme = typeof theme.light;

export default styled as CreateStyled<Theme>;
