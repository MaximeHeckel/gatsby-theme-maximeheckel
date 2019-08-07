import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import { graphql, StaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import React, { ReactNode } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SEO from '../components/Seo';
import Title from '../components/Title';
import { useTheme } from '../context/ThemeContext';
import MainWrapper from './MainWrapper';

const LayoutContentWrapper = styled.div`
  @media (max-width: 700px) {
    padding: 0 0px 20px 0px;
  }
  margin: 0 auto;
  max-width: 1020px;
  padding: 0px 0px 20px 0px;
  color: ${props => props.theme.fontColor};
`;

const TitleSection = styled.div`
  @media (max-width: 700px) {
    padding: 200px 0px 50px 0px;

    h2 {
      line-height: 34px;
    }
  }

  margin: 0 auto;
  max-width: 1020px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.fontColor};
  padding: 200px 0px 50px 0px;
`;

interface ILayoutProps {
  pageContext: {
    frontmatter: {
      title: string;
      subtitle: string;
    };
    tableOfContents?: {
      items: Array<{ url: string; title: string }>;
    };
    cover: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
  children: ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const theme = useTheme();

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              author
            }
          }
        }
      `}
      render={data => {
        const { frontmatter, cover, tableOfContents } = props.pageContext;
        const { title, subtitle } = frontmatter;

        return (
          <React.Fragment>
            <SEO title={`${title} - ${data.site.siteMetadata.title}`} />
            <Header
              postTitle={title}
              themeSwitcher={theme}
              sticky={true}
              siteTitle={data.site.siteMetadata.author}
              tableOfContents={tableOfContents}
            />
            <MainWrapper>
              <TitleSection>
                <div id="top">
                  <Title data-testid={`project-title-${title}`}>{title}</Title>
                  <h2>{subtitle}</h2>
                </div>
              </TitleSection>
              <div
                style={{
                  margin: '0 auto',
                  maxHeight: '600px',
                  maxWidth: '1020px',
                }}
              >
                <Img
                  imgStyle={{
                    borderRadius: '4px',
                    maxHeight: '600px',
                    minHeight: '100px',
                  }}
                  fluid={cover.childImageSharp.fluid}
                />
              </div>
              <LayoutContentWrapper>
                <MDXProvider
                  components={{
                    a: (aProps: any) => (
                      <a {...aProps} style={{ color: 'inherit' }} />
                    ),
                  }}
                >
                  {props.children}
                </MDXProvider>
              </LayoutContentWrapper>
            </MainWrapper>
            <Footer />
          </React.Fragment>
        );
      }}
    />
  );
};

export default Layout;
