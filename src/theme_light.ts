const white = '#FFFFFF';
const black = '#2B2D3E';
const gray = '#F8F8F9';

const theme = {
  backgroundColor: white,
  borderColor: '#f5f5f9',
  boxShadow: '0 11px 22px -10px rgba(0, 24, 40, 0.25)',
  colors: {
    blue: '#196FD8',
    gray,
    pink: '#FED5D7',
    white,
  },
  fontColor: black,
  transitionTime: 0.5,
};

export type Theme = typeof theme;
export default theme;
