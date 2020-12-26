import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Footer from '../components/Footer';
import { DefaultHeader, MainHeaderProps } from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import 'plyr/dist/plyr.css';

interface LayoutProps {
  footer?: boolean;
  header?: boolean;
  headerProps?: MainHeaderProps;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          author
          title
          url
        }
      }
    }
  `);

  const { header, footer, headerProps, ...rest } = props;
  const { site } = data;

  const theme = useTheme();

  React.useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const Plyr = require('plyr');
      Array.from(document.querySelectorAll('#videoplayer-maximeheckel')).map(
        (p) => new Plyr(p)
      );
    }
  }, []);

  return (
    <Wrapper data-testid={theme.dark ? 'darkmode' : 'lightmode'} {...rest}>
      {header ? (
        <DefaultHeader
          title={site.title}
          themeSwitcher={true}
          {...headerProps}
        />
      ) : null}
      <Content>
        {(props.children as React.ReactElement<any>) &&
          // @ts-ignore TODO: Need to figure out if there's a better way to handle children in gatsby layout
          props.children({ ...props, site })}
      </Content>
      {footer ? <Footer /> : null}
    </Wrapper>
  );
};

export { Layout };

const Wrapper = styled.div`
  transition: 0.5s;
  background: var(--maximeheckel-colors-body);
`;

const Content = styled.div`
  @media (max-width: 700px) {
    padding: 0px 20px 0px 20px;
  }
  margin: 0 auto;
  max-width: 1020px;
  padding: 0px 70px 0px 70px;
  color: var(--maximeheckel-colors-typeface-0);
`;
