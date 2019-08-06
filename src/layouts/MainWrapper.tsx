import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

const LayoutWrapper = styled.div`
  transition: ${props => props.theme.transitionTime}s;
  background: ${props => props.theme.backgroundColor};
`;

const Layout = styled.div`
  @media (max-width: 700px) {
    padding: 0px 30px 20px 30px;
  }
  margin: 0 auto;
  max-width: 1020px;
  padding: 0px 70px 20px 70px;
  color: ${props => props.theme.fontColor};
`;

interface IMainWrapperProps {
  children: ReactNode;
}

const MainWrapper = ({ children, ...rest }: IMainWrapperProps) => (
  <LayoutWrapper {...rest}>
    <Layout>{children}</Layout>
  </LayoutWrapper>
);

export default MainWrapper;
