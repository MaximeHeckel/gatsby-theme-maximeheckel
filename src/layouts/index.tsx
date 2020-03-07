import slugify from '@sindresorhus/slugify';
import { graphql, StaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import React, { ReactNode } from 'react';
import { LayoutContentTypeEnum } from '../@types/layoutContentType';
import Button from '../components/Button';
import MDX from '../components/MDX';
import ProgressBar, { TableOfContentType } from '../components/ProgressBar';
import Seo from '../components/Seo';
import Signature from '../components/Signature';
import styled from '../utils/styled';
import MainWrapper from './MainWrapper';

interface ILayoutProps {
  pageContext: {
    frontmatter: {
      title: string;
      subtitle?: string;
      description?: string;
      type?: LayoutContentTypeEnum;
      date: string;
      slug: string;
    };
    tableOfContents?: TableOfContentType;
    timeToRead: number;
    cover: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
  children: ReactNode;
}

const Layout: React.FC<ILayoutProps> = props => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              author
              url
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
        const { date, description, slug, subtitle, type, title } = frontmatter;
        const headerProps = {
          postTitle: title,
          siteTitle: data.site.siteMetadata.author,
          sticky: true,
        };

        const progressBarTarget = React.createRef<HTMLDivElement>();
        const parsedDate = new Date(Date.parse(date));
        const text = `${title} by @MaximeHeckel ${data.site.siteMetadata.url}/posts/${slug}`;
        const SeoBanner =
          type === 'blogPost'
            ? `/opengraph-images/${slugify(title)}.png`
            : cover
            ? cover.childImageSharp.fluid.src
            : '';

        return (
          <MainWrapper footer={true} header={true} headerProps={headerProps}>
            <Seo
              title={`${title} - ${data.site.siteMetadata.title}`}
              desc={subtitle || description}
              article={type === 'blogPost'}
              banner={SeoBanner}
              pathname={slug + '/'}
            />
            <Hero data-testid={type} type={type} id="top">
              <h1 data-testid={`project-title-${title}`}>{title}</h1>
              <h3>{subtitle || description}</h3>
              {date || timeToRead ? (
                <p>
                  {date ? parsedDate.toDateString() : null} -{' '}
                  {timeToRead ? `${timeToRead} min read` : null} -{' '}
                  {type === 'blogPost' ? (
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURI(
                        text
                      )}`}
                      style={{ textDecoration: `none` }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button secondary={true}>Share on Twitter</Button>
                    </a>
                  ) : null}
                </p>
              ) : null}
            </Hero>
            {cover ? (
              <ImgWrapper>
                <Img
                  imgStyle={{
                    borderRadius: '4px',
                    margin: '0 auto',
                    maxHeight: '800px',
                    minHeight: '100px',
                  }}
                  fluid={cover.childImageSharp.fluid}
                />
              </ImgWrapper>
            ) : null}
            <ProgressBar
              tableOfContents={tableOfContents}
              target={progressBarTarget}
            />
            <MDX ref={progressBarTarget} type={type}>
              {props.children}
            </MDX>
            {type === 'blogPost' ? (
              <Signature
                title={title}
                url={`${data.site.siteMetadata.url}/posts/${slug}`}
              />
            ) : null}
          </MainWrapper>
        );
      }}
    />
  );
};

export default Layout;

type HeroType = {
  type?: LayoutContentTypeEnum;
};

const Hero = styled.div<HeroType>`
  @media (max-width: 700px) {
    padding: 200px 0px 30px 0px;

    h2 {
      line-height: 34px;
    }
  }

  margin: 0 auto;
  max-width: ${props => (props.type === 'blogPost' ? '700px' : '1020px')};
  align-items: center;
  color: ${props => props.theme.fontColor};
  padding-top: 200px;

  p {
    color: #73737d;
    font-size: 16px;
    font-weight: 500;
  }
`;

const ImgWrapper = styled.div`
  @media (max-width: 700px) {
    position: relative;
    left: calc(-50vw + 50%);
    position: a;
    width: 100vw;
  }
  margin-bottom: 30px;
`;
