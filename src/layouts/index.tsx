import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import { graphql, StaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import React, { ReactNode } from 'react';
import Seo from '../components/Seo';
import MainWrapper from './MainWrapper';

const LayoutContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => (props.type === 'blogPost' ? '735px' : '1020px')};
  padding: 30px 0px 20px 0px;
  color: ${props => props.theme.fontColor};
  p,
  ul {
    font-weight: 500;
  }

  figcaption {
    font-size: 14px;
    font-style: italic;
    text-align: center;
  }

  twitter-widget {
    margin: 0 auto;
  }
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
      subtitle?: string;
      description?: string;
      type?: string;
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
        const { title, subtitle, description, type, date } = frontmatter;
        const headerProps = {
          postTitle: title,
          siteTitle: data.site.siteMetadata.author,
          sticky: true,
          tableOfContents,
        };

        return (
          <MainWrapper footer={true} header={true} headerProps={headerProps}>
            <Seo
              title={`${title} - ${data.site.siteMetadata.title}`}
              desc={subtitle || description}
              date={date}
              article={type === 'blogPost'}
            />
            <TitleSection>
              <div id="top">
                <h1 data-testid={`project-title-${title}`}>{title}</h1>
                <h2>{subtitle || description}</h2>
              </div>
            </TitleSection>
            {cover ? (
              <div
                style={{
                  margin: '0 auto',
                  maxHeight: '800px',
                  maxWidth: '1020px',
                }}
              >
                <Img
                  imgStyle={{
                    borderRadius: '4px',
                    maxHeight: '800px',
                    minHeight: '100px',
                  }}
                  fluid={cover.childImageSharp.fluid}
                />
              </div>
            ) : null}
            <LayoutContentWrapper type={type}>
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
        );
      }}
    />
  );
};

export default Layout;
