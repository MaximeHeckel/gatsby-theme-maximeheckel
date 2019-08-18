import styled from '@emotion/styled';

const LightDarkSwitcher = styled('div')`
  cursor: pointer;
  position: relative;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  ${p =>
    p.isDark
      ? `background: ${p.theme.fontColor}`
      : `box-shadow: inset 8px -8px 0 0 ${p.theme.fontColor}`};

  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: box-shadow 0.3s ease 0s, transform 0.3s ease 0.1s;
  overflow: ${p => (p.isDark ? 'visible' : 'hidden')};
  &::before {
    content: '';
    position: absolute;
    right: -9px;
    top: -9px;
    height: 22px;
    width: 22px;
    border: 2px solid ${p => p.theme.backgroundColor};
    border-radius: 50%;
    transform: translate(${p => (p.isDark ? '14px, -14px' : '0, 0')});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.35s ease;
  }
  &::after {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -18px 0 ${p => p.theme.colors.white},
      0 18px 0 ${p => p.theme.colors.white},
      18px 0 0 ${p => p.theme.colors.white},
      -18px 0 0 ${p => p.theme.colors.white},
      13px 13px 0 ${p => p.theme.colors.white},
      -13px 13px 0 ${p => p.theme.colors.white},
      13px -13px 0 ${p => p.theme.colors.white},
      -13px -13px 0 ${p => p.theme.colors.white};
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;
  }
`;

export default LightDarkSwitcher;
