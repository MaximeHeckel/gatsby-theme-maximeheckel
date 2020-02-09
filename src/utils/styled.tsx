import styled, { CreateStyled } from '@emotion/styled';
import theme from '../theme_light';

export type Theme = typeof theme;

export default styled as CreateStyled<Theme>;
