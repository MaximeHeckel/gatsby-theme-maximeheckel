const prismLight = {
  plain: {
    color: '#403f53',
    backgroundColor: '#F6FBFF',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgba(239, 83, 80, 0.56)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: 'rgb(72, 118, 214)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(152, 159, 177)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'builtin', 'char', 'constant', 'url'],
      style: {
        color: 'rgb(72, 118, 214)',
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'rgb(201, 103, 101)',
      },
    },
    {
      types: ['number'],
      style: {
        color: 'rgb(170, 9, 130)',
      },
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ['punctuation'],
      style: {
        color: 'rgb(153, 76, 195)',
      },
    },
    {
      types: ['function', 'selector', 'doctype'],
      style: {
        color: 'rgb(153, 76, 195)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(17, 17, 17)',
      },
    },
    {
      types: ['tag'],
      style: {
        color: 'rgb(153, 76, 195)',
      },
    },
    {
      types: ['operator', 'property', 'keyword', 'namespace'],
      style: {
        color: 'rgb(12, 150, 155)',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: 'rgb(188, 84, 84)',
      },
    },
  ],
};

const prismDark = {
  plain: {
    color: '#d6deeb',
    backgroundColor: '#282c34',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgba(239, 83, 80, 0.56)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: 'rgb(173, 219, 103)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(99, 119, 119)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'url'],
      style: {
        color: 'rgb(173, 219, 103)',
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'rgb(214, 222, 235)',
      },
    },
    {
      types: ['number'],
      style: {
        color: 'rgb(247, 140, 108)',
      },
    },
    {
      types: ['builtin', 'char', 'constant', 'function'],
      style: {
        color: 'rgb(130, 170, 255)',
      },
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ['punctuation'],
      style: {
        color: 'rgb(199, 146, 234)',
      },
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: 'rgb(199, 146, 234)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(255, 203, 139)',
      },
    },
    {
      types: ['tag', 'operator', 'keyword'],
      style: {
        color: 'rgb(127, 219, 202)',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: 'rgb(255, 88, 116)',
      },
    },
    {
      types: ['property'],
      style: {
        color: 'rgb(128, 203, 196)',
      },
    },
    {
      types: ['namespace'],
      style: {
        color: 'rgb(178, 204, 214)',
      },
    },
  ],
};

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
        highlight: `rgba(111,126,150,0.07)`,
        highlightBorder: '#336ef5',
        ...prismLight,
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
    backgroundColor: 'var(--maximeheckel-colors-body-0, #141516)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: 'rgba(0,0,0,0.2) 0px 20px 40px',
    colors: {
      black: '#000000',
      blue: 'var(--maximeheckel-colors-brand, #5184f9)',
      red: '#FF515A',
      gray: '#8a8a90',
      pink: '#FED5D7',
      prism: {
        highlight: `rgba(255,255,255,0.07)`,
        highlightBorder: '#3c83da',
        ...prismDark,
      },
      white: '#FFFFFF',
    },
    fontColor: 'var(--maximeheckel-colors-typeface-0, #FEFEFE)',
    bodyColor: 'var(--maximeheckel-colors-typeface-1, #c4c5c9)',
    foregroundColor: 'var(--maximeheckel-colors-body-1, rgba(9, 14, 21, 0.6))',
    overlayBackground: 'var(--maximeheckel-colors-body-2, rgba(0,0,0,0.40))',
    transitionTime: 0.5,
  },
};

export default theme;
