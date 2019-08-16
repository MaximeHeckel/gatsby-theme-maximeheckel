import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import { graphql, StaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import React, { ReactNode } from 'react';
import ProgressBar from '../components/ProgressBar';
import Seo from '../components/Seo';
import MainWrapper from './MainWrapper';

const LayoutContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => (props.type === 'blogPost' ? '700px' : '1020px')};
  padding: 30px 0px 20px 0px;
  color: ${props => props.theme.fontColor};

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
  max-width: ${props => (props.type === 'blogPost' ? '700px' : '1020px')};
  display: flex;
  align-items: center;
  color: ${props => props.theme.fontColor};
  padding: 200px 0px 50px 0px;

  p {
    color: #73737d;
  }
`;

interface ILayoutProps {
  pageContext: {
    frontmatter: {
      title: string;
      subtitle?: string;
      description?: string;
      type?: string;
      date?: string;
    };
    tableOfContents?: {
      items: Array<{ url: string; title: string }>;
    };
    timeToRead: number;
    cover: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
  children: ReactNode;
}

const TwitterPopUpBox = styled('div')`
  position: fixed;
  height: 400px;
  width: 400px;
  background: ${props => props.theme.backgroundColor};
  box-shadow: ${props => props.theme.boxShadow};
  padding: 15px;
`;

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
        const {
          frontmatter,
          cover,
          tableOfContents,
          timeToRead,
        } = props.pageContext;
        const { title, subtitle, description, type, date } = frontmatter;
        const headerProps = {
          postTitle: title,
          siteTitle: data.site.siteMetadata.author,
          sticky: true,
        };
        const progressBarTarget = React.createRef();
        const parsedDate = new Date(Date.parse(date));

        return (
          <MainWrapper footer={true} header={true} headerProps={headerProps}>
            <Seo
              title={`${title} - ${data.site.siteMetadata.title}`}
              desc={subtitle || description}
              date={date}
              article={type === 'blogPost'}
            />
            <TitleSection type={type}>
              <div id="top">
                <h1 data-testid={`project-title-${title}`}>{title}</h1>
                <h2>{subtitle || description}</h2>
                {date || timeToRead ? (
                  <p>
                    {date ? parsedDate.toDateString() : null} -{' '}
                    {timeToRead ? `${timeToRead} min read` : null}
                  </p>
                ) : null}
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
            <ProgressBar
              tableOfContents={tableOfContents}
              target={progressBarTarget}
            />
            <div ref={progressBarTarget}>
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
            </div>
          </MainWrapper>
        );
      }}
    />
  );
};

export default Layout;
