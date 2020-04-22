import slugify from '@sindresorhus/slugify';
import { graphql, StaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import React from 'react';
import { LayoutContentTypeEnum } from '../@types/layoutContentType';
import Button from '../components/Button';
import MDX from '../components/MDX';
import ProgressBar, { TableOfContentType } from '../components/ProgressBar';
import Seo from '../components/Seo';
import Signature from '../components/Signature';
import Webmentions, { WebmentionCount } from '../components/Webmentions';
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
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const Layout: React.FC<ILayoutProps> = (props) => {
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
      render={(data) => {
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

        const childrenWithProps = React.Children.map(
          props.children,
          (child) => {
            return child && child.props.mdxType === 'section'
              ? React.cloneElement(child, {
                  id: child.props.children[0].props.id,
                })
              : child;
          }
        );

        const target = `${data.site.siteMetadata.url}/posts/${slug}/`;

        return (
          <MainWrapper footer={true} header={true} headerProps={headerProps}>
            <article className="h-entry">
              <Seo
                title={`${title} - ${data.site.siteMetadata.title}`}
                desc={subtitle || description}
                article={type === 'blogPost'}
                banner={SeoBanner}
                pathname={slug + '/'}
                date={date}
              />
              <Hero data-testid={type} type={type} id="top">
                <h1 className="p-name" data-testid={`project-title-${title}`}>
                  {title}
                </h1>
                <h3>{subtitle || description}</h3>
                {date || timeToRead ? (
                  <Flex justifyContent="space-between">
                    <Flex>
                      {date ? (
                        <p>
                          {MONTHS[parsedDate.getMonth()]} {parsedDate.getDate()}{' '}
                          {parsedDate.getFullYear()}
                        </p>
                      ) : null}
                      {timeToRead ? <p> - {timeToRead} min read - </p> : null}
                      {type === 'blogPost' ? (
                        <>
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
                          <time
                            className="hidden dt-published"
                            itemProp="datepublished"
                            dateTime={date}
                          >
                            {new Date(date).toISOString().replace('Z', '') +
                              '+01:00'}
                          </time>
                          <a
                            className="hidden u-url"
                            href={`${data.site.siteMetadata.url}/posts/${slug}`}
                          />
                          {description && (
                            <p className="hidden p-summary e-content">
                              {description}
                            </p>
                          )}
                        </>
                      ) : null}
                    </Flex>
                    <>
                      {type === 'blogPost' ? (
                        <WebmentionCount target={target} />
                      ) : null}
                    </>
                  </Flex>
                ) : null}
              </Hero>
              {cover ? (
                <ImgWrapper>
                  <Img
                    className="u-photo"
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
                {childrenWithProps}
              </MDX>
              {/* <Webmentions
                target={`${data.site.siteMetadata.url}/posts/${slug}/`}
              /> */}
              {type === 'blogPost' ? (
                <Signature
                  title={title}
                  url={`${data.site.siteMetadata.url}/posts/${slug}`}
                />
              ) : null}
            </article>
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

  margin: 0 auto 50px auto;
  max-width: ${(props) => (props.type === 'blogPost' ? '700px' : '1020px')};
  align-items: center;
  color: ${(props) => props.theme.fontColor};
  padding-top: 200px;

  p {
    color: #8a8a90;
    font-size: 16px;
    font-weight: 500;
  }
`;

const Flex = styled.div<{ justifyContent?: string }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${(p) => p.justifyContent || 'flex-start'};

  p {
    margin-bottom: 0px;
    margin-right: 5px;
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
