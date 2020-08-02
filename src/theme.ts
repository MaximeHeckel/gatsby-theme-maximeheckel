const theme = {
  light: {
    backgroundColor: 'var(--maximeheckel-colors-body-0, #FFFFFF)',
    borderColor: '#f5f5f9',
    boxShadow: '0 0px 12px -6px rgba(0, 24, 40, 0.25)',
    colors: {
      black: '#000000',
      blue: 'var(--maximeheckel-colors-brand, #336ef5)',
      red: '#FF515A',
      gray: '#767679',
      pink: '#FED5D7',
      prism: {
        background: `rgba(41, 44, 52, 1)`,
        highlight: `rgba(255,255,255,0.07)`,
        highlightBorder: '#196FD8',
      },
      white: '#FFFFFF',
    },
    fontColor: 'var(--maximeheckel-colors-typeface-0, #2B2D3E)',
    bodyColor: 'var(--maximeheckel-colors-typeface-1, #4a4a4c)',
    foregroundColor:
      'var(--maximeheckel-colors-body-1, rgba(217, 230, 247, 0.55))',
    overlayBackground:
      'var(--maximeheckel-colors-body-2, rgba(236, 236, 236, 0.8))',
    transitionTime: 0.5,
  },

  dark: {
    backgroundColor: 'var(--maximeheckel-colors-body-0, #1b1e21)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: 'rgba(0,0,0,0.2) 0px 20px 40px',
    colors: {
      black: '#000000',
      blue: 'var(--maximeheckel-colors-brand, #5184f9)',
      red: '#FF515A',
      gray: '#8a8a90',
      pink: '#FED5D7',
      prism: {
        background: `rgba(15, 17, 27, 1)`,
        highlight: `rgba(255,255,255,0.07)`,
        highlightBorder: '#3c83da',
      },
      white: '#FFFFFF',
    },
    fontColor: 'var(--maximeheckel-colors-typeface-0, #FFFFFF)',
    bodyColor: 'var(--maximeheckel-colors-typeface-1, #c4c5c9)',
    foregroundColor: 'var(--maximeheckel-colors-body-1, rgba(9, 14, 21, 0.6))',
    overlayBackground: 'var(--maximeheckel-colors-body-2, rgba(0,0,0,0.40))',
    transitionTime: 0.5,
  },
};

export default theme;
