import styled from '@emotion/styled';

const Blockquote = styled.blockquote`
  transition: ${props => props.theme.transitionTime}s;
  margin: 15px auto 50px;
  color: ${props => props.theme.fontColor};
  font-style: italic;

  & > p {
    max-width: 880px !important;
    padding-left: 50px;
    padding-bottom: 0;
    width: 100%;
    margin: 0 auto;
    font-size: 24px;
    line-height: 1.32;
    font-weight: bold;
  }
`;

export { Blockquote };
