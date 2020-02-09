import styled, { CreateStyled } from '@emotion/styled';

type Theme = {
  backgroundColor: string;
  borderColor: string;
  boxShadow: string;
  colors: {
    black: string;
    blue: string;
    gray: string;
    pink: string;
    prism: {
      token: string;
      // tslint:disable-next-line:object-literal-sort-keys
      languageJavascript: string;
      javascript: string;
      background: string;
      comment: string;
      string: string;
      var: string;
      number: string;
      constant: string;
      plain: string;
      doctype: string;
      tag: string;
      keyword: string;
      boolean: string;
      function: string;
      parameter: string;
      className: string;
      attrName: string;
      attrValue: string;
      interpolation: string;
      punctuation: string;
      ['maybe-class-name']: string;
      property: string;
      propertyAccess: string;
      namespace: string;
      highlight: string;
      highlightBorder: string;
      dom: string;
      operator: string;
    };
    white: string;
  };
  fontColor: string;
  overlayBackground: string;
  transitionTime: number;
};

export default styled as CreateStyled<Theme>;
