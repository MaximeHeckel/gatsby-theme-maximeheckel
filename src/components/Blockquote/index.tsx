import styled from '../../utils/styled';

const Blockquote = styled.blockquote`
  transition: ${props => props.theme.transitionTime}s;
  margin: 30px 0px;
  color: ${props => props.theme.fontColor};
  font-style: italic;
  position: relative;
  width: 100vw;
  left: calc(-50vw + 50%);
  padding-top: 40px;
  padding-bottom: 40px;
  background: ${props => props.theme.foregroundColor};
  & > p {
    max-width: 880px !important;
    padding-left: 50px;
    padding-bottom: 0;
    width: 100%;
    margin: 0 auto;
    font-size: 24px;
    line-height: 1.32;
    font-weight: 400;
  }
`;

export { Blockquote };
