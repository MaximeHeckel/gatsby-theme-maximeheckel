import styled from '@emotion/styled';
import React, { ReactNode } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

const LayoutWrapper = styled.div`
  transition: ${props => props.theme.transitionTime}s;
  background: ${props => props.theme.backgroundColor};
`;

const Layout = styled.div`
  @media (max-width: 700px) {
    padding: 0px 30px 0px 30px;
  }
  margin: 0 auto;
  max-width: 1020px;
  padding: 0px 70px 0px 70px;
  color: ${props => props.theme.fontColor};
`;

interface IMainWrapperProps {
  children: ReactNode;
  footer?: boolean;
  header?: boolean;
  headerProps?: {
    links?: JSX.Element[] | JSX.Element;
    postTitle?: string;
    siteTitle?: string;
    sticky?: boolean;
    tableOfContents?: {
      items: Array<{ url: string; title: string }>;
    };
  };
}

const MainWrapper = ({
  children,
  footer,
  header,
  headerProps,
  ...rest
}: IMainWrapperProps) => {
  const theme = useTheme();
  return (
    <LayoutWrapper
      data-testid={theme.dark ? 'darkmode' : 'lightmode'}
      {...rest}
    >
      <Layout>
        {header ? <Header themeSwitcher={theme} {...headerProps} /> : null}
        {children}
        {footer ? <Footer /> : null}
      </Layout>
    </LayoutWrapper>
  );
};

export default MainWrapper;
