const white = '#FFFFFF';
const gray = '#F8F8F9';

const theme = {
  backgroundColor: '#202326',
  borderColor: '#000000',
  boxShadow: '0 0px 12px -6px rgba(0,0,0,0.94)',
  colors: {
    blue: '#3c83da',
    gray,
    pink: '#FED5D7',
    prism: {
      token: `#fff`,
      // tslint:disable-next-line:object-literal-sort-keys
      languageJavascript: `#e8696b`,
      javascript: `#e8696b`,
      background: `#0F111B`,
      comment: `#5e6a76`,
      string: `#a8e2a8`,
      var: `#b3bac5`,
      number: `#e4854d`,
      constant: `#b3bac5`,
      plain: `#fff`,
      doctype: `#e8696b`,
      tag: `#e8696b`,
      keyword: `#d49fd4`,
      boolean: `#ff5874`,
      function: `#5F8DC3`,
      parameter: `#F9965D`,
      className: `#ffcf74`,
      attrName: `#bf87ba`,
      attrValue: `#a8e2a8`,
      interpolation: `#fff`,
      punctuation: `#5FA8AA`,
      ['maybe-class-name']: `#fff`,
      property: `#80cbc4`,
      propertyAccess: `#fff`,
      namespace: `#b2ccd6`,
      highlight: `rgba(255,255,255,0.07)`,
      highlightBorder: `#e1bde2`,
      dom: `#5F8DC3`,
      operator: `#5FA8AA`,
    },
    white,
  },
  fontColor: white,
  overlayBackground: 'rgba(0,0,0,0.80)',
  transitionTime: 0.5,
};

export default theme;
