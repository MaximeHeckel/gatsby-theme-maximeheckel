import slugify from '@sindresorhus/slugify';
import { FluidObject } from 'gatsby-image';
import React from 'react';
import { MONTHS } from '../constants';
import Layout, { LayoutChildrenProps } from '../layouts';
import Hero from '../components/Hero';
import Flex from '../components/Flex';
import MDX from '../components/MDX';
import ProgressBar, { TableOfContentType } from '../components/ProgressBar';
import Seo from '../components/Seo';
import { WebmentionCount } from '../components/Webmentions';
import Signature from '../components/Signature';
import sectionize from '../utils/sectionize';

interface BlogPostProps {
  pageContext: {
    frontmatter: {
      title: string;
      subtitle?: string;
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

  site: any;
}

const BlogPost: React.FC<BlogPostProps> = (props) => {
  const { pageContext } = props;
  const { frontmatter, cover, tableOfContents, timeToRead } = pageContext;
  const { date, slug, subtitle, title } = frontmatter;

  const childrenWithProps = sectionize(
    props.children as React.ReactElement<any>[]
  );

  const headerProps = {
    title,
    sticky: true,
    collapsableOnScroll: true,
  };

  return (
    <Layout footer={true} header={true} headerProps={headerProps}>
      {(layoutProps: LayoutChildrenProps) => {
        const { site } = layoutProps;
        const progressBarTarget = React.createRef<HTMLDivElement>();
        const parsedDate = new Date(Date.parse(date));
        const SeoBanner = `/opengraph-images/${slugify(title)}.png`;
        const postUrl = `${site.siteMetadata.url}/posts/${slug}/`;
        return (
          <article className="h-entry">
            <Seo
              title={`${title} - ${site.siteMetadata.title}`}
              desc={subtitle}
              article={true}
              banner={SeoBanner}
              pathname={slug + '/'}
              date={date}
            />
            <Hero id="top">
              <Hero.Title
                className="p-name"
                data-testid={`project-title-${title}`}
              >
                {title}
              </Hero.Title>
              {subtitle ? <Hero.Subtitle>{subtitle}</Hero.Subtitle> : null}
              <Hero.Info>
                <Flex wrap="wrap">
                  {date ? (
                    <p>
                      {MONTHS[parsedDate.getMonth()]} {parsedDate.getDate()}{' '}
                      {parsedDate.getFullYear()}
                    </p>
                  ) : null}
                  {timeToRead ? <p> / {timeToRead} min read / </p> : null}
                  <WebmentionCount target={postUrl} />
                </Flex>
              </Hero.Info>
              {cover ? (
                <Hero.Img
                  className="u-photo"
                  imgStyle={{
                    borderRadius: '4px',
                    margin: '0 auto',
                    maxHeight: '800px',
                    minHeight: '100px',
                  }}
                  fluid={cover.childImageSharp.fluid}
                />
              ) : null}
            </Hero>
            <ProgressBar
              tableOfContents={tableOfContents}
              target={progressBarTarget}
            />
            <MDX ref={progressBarTarget}>{childrenWithProps}</MDX>
            <Signature title={title} url={postUrl} />
            <time
              className="hidden dt-published"
              itemProp="datepublished"
              dateTime={date}
            >
              {new Date(date).toISOString().replace('Z', '') + '+01:00'}
            </time>
            <a
              className="hidden u-url"
              href={`${site.siteMetadata.url}/posts/${slug}`}
            />
            {subtitle && (
              <p className="hidden p-summary e-content">{subtitle}</p>
            )}
          </article>
        );
      }}
    </Layout>
  );
};

export default BlogPost;
