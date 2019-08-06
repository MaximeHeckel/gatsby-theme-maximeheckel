const white = '#FFFFFF';
const black = '#161617'; // For background color
const blackFont = '#2B2D3E'; // For font color
const gray = '#F8F8F9';

const theme = {
  backgroundColor: white,
  boxShadow: '0 11px 22px -10px rgba(0, 24, 40, 0.25)',
  colors: {
    black,
    blackFont,
    blue: '#196FD8',
    gray,
    pink: '#FED5D7',
    white,
  },
  fontColor: blackFont,
  transitionTime: 0.5,
};

export type Theme = typeof theme;
export default theme;
