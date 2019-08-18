import styled from '@emotion/styled';
import { withTheme } from 'emotion-theming';
import React from 'react';
import Logo from '../Logo';

const HR = styled.hr`
  background: ${props => props.theme.fontColor};
`;

const FooterBlock = styled.div`
  background: ${props => props.theme.backgroundColor};
  transition: ${props => props.theme.transitionTime}s;
  height: 130px;
  width: 100%;
`;

const FooterWrapper = styled.div`
  @media (max-width: 700px) {
    padding-left: 30px;
    padding-right: 30px;
  }

  padding-top: 30px;
  padding-left: 70px;
  padding-right: 70px;
  max-width: 1020px;
  margin-top: 30px;
  color: ${props => props.theme.fontColor};
  margin: 0 auto;
  a {
    color: inherit;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = () => (
  <FooterBlock data-testid="footer">
    <FooterWrapper>
      <HR />
      <FooterContent>
        <div>© {new Date().getFullYear()} Maxime Heckel. Made in SF.</div>
        <Logo alt="Maxime Heckel's logo" inverted={true} size={50} />
      </FooterContent>
    </FooterWrapper>
  </FooterBlock>
);

export default withTheme(Footer);
